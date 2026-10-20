import { WORDS } from './words'

export type Team = 'red' | 'blue'
export type CardColor = Team | 'neutral' | 'assassin'

export interface Game {
  code: string
  words: string[]
  colors: CardColor[]
  starting: Team
}

export type Action = { t: 'reveal'; i: number } | { t: 'end' }

export interface GameState {
  revealed: Set<number>
  turn: Team
  winner: Team | null
  remaining: Record<Team, number>
  /** Index of the card that ended the game by assassin, if any. */
  assassinAt: number | null
}

// No 0/O/1/I so codes are easy to read aloud and type.
const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
const CODE_LENGTH = 5

export const BOARD_SIZE = 25

export function newCode(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(CODE_LENGTH))
  return Array.from(bytes, (b) => CODE_ALPHABET[b % CODE_ALPHABET.length]).join('')
}

export function normalizeCode(raw: string): string {
  return raw.toUpperCase().replace(/[^A-Z0-9]/g, '')
}

export function isValidCode(code: string): boolean {
  return code.length === CODE_LENGTH && [...code].every((c) => CODE_ALPHABET.includes(c))
}

// xmur3 string hash -> 32-bit seed, then mulberry32 PRNG. Small, fast and
// identical on every browser, which is what lets two devices agree on a board.
function seedFrom(str: string): number {
  let h = 1779033703 ^ str.length
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353)
    h = (h << 13) | (h >>> 19)
  }
  h = Math.imul(h ^ (h >>> 16), 2246822507)
  h = Math.imul(h ^ (h >>> 13), 3266489909)
  return (h ^= h >>> 16) >>> 0
}

function mulberry32(seed: number): () => number {
  let a = seed
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function shuffle<T>(items: T[], rand: () => number): T[] {
  const a = items.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function other(team: Team): Team {
  return team === 'red' ? 'blue' : 'red'
}

export function generateGame(code: string): Game {
  const rand = mulberry32(seedFrom(`scripture-spies:${code}`))
  const words = shuffle([...WORDS], rand).slice(0, BOARD_SIZE)
  const starting: Team = rand() < 0.5 ? 'red' : 'blue'
  const colors = shuffle<CardColor>(
    [
      ...Array<CardColor>(9).fill(starting),
      ...Array<CardColor>(8).fill(other(starting)),
      ...Array<CardColor>(7).fill('neutral'),
      'assassin',
    ],
    rand,
  )
  return { code, words, colors, starting }
}

export function countColor(game: Game, color: CardColor): number {
  return game.colors.filter((c) => c === color).length
}

/** Rebuilds the game state from the action log, so undo is just "drop the last action". */
export function replay(game: Game, actions: Action[]): GameState {
  const revealed = new Set<number>()
  const remaining = { red: countColor(game, 'red'), blue: countColor(game, 'blue') }
  let turn = game.starting
  let winner: Team | null = null
  let assassinAt: number | null = null

  for (const action of actions) {
    if (winner) break
    if (action.t === 'end') {
      turn = other(turn)
      continue
    }
    if (revealed.has(action.i)) continue
    revealed.add(action.i)
    const color = game.colors[action.i]
    if (color === 'assassin') {
      winner = other(turn)
      assassinAt = action.i
    } else if (color === 'neutral') {
      turn = other(turn)
    } else {
      remaining[color]--
      if (remaining[color] === 0) winner = color
      else if (color !== turn) turn = other(turn)
    }
  }
  return { revealed, turn, winner, remaining, assassinAt }
}

function pageUrl(params: Record<string, string>): string {
  const url = new URL(location.href)
  url.search = new URLSearchParams(params).toString()
  url.hash = ''
  return url.toString()
}

export const boardUrl = (code: string) => pageUrl({ game: code })
export const spymasterUrl = (code: string) => pageUrl({ game: code, role: 'spymaster' })
export const spymasterHomeUrl = () => pageUrl({ role: 'spymaster' })

export function loadJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function saveJson(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Private mode or storage full: the game still works, it just won't survive a refresh.
  }
}

/** Font sizing hint: the longest single word on the card. */
export function charsFor(word: string): number {
  return Math.max(4, ...word.split(' ').map((w) => w.length))
}

export function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)
}
