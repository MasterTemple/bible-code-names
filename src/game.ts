import { CATEGORIES, wordsFor } from './words'

export type Team = 'red' | 'blue'
export type CardColor = Team | 'neutral' | 'assassin'

export interface Game {
  code: string
  categories: number[]
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

// A game code is SEED_LENGTH random characters followed by the selected
// categories as a bitmask, 5 bits per character. The mask uses as few
// characters as it needs (at least MIN_MASK_LENGTH), so codes made before
// later categories were added keep working. 32 symbols, no 0/O/1/I, so codes
// are easy to read aloud and type.
const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
const SEED_LENGTH = 5
const MIN_MASK_LENGTH = 2
const MAX_MASK_LENGTH = Math.ceil(CATEGORIES.length / 5)

export const BOARD_SIZE = 25

export function newCode(categories: readonly number[]): string {
  const bytes = crypto.getRandomValues(new Uint8Array(SEED_LENGTH))
  const seed = Array.from(bytes, (b) => CODE_ALPHABET[b % CODE_ALPHABET.length]).join('')
  const mask = categories.reduce((m, i) => m | (1 << i), 0)
  const length = Math.max(MIN_MASK_LENGTH, Math.ceil((Math.max(...categories) + 1) / 5))
  let maskChars = ''
  for (let i = 0; i < length; i++) maskChars = CODE_ALPHABET[(mask >> (5 * i)) & 31] + maskChars
  return seed + maskChars
}

export function normalizeCode(raw: string): string {
  return raw.toUpperCase().replace(/[^A-Z0-9]/g, '')
}

/** Category indices encoded in a code, or null if the code isn't a playable game. */
export function parseCategories(code: string): number[] | null {
  const maskLength = code.length - SEED_LENGTH
  if (maskLength < MIN_MASK_LENGTH || maskLength > MAX_MASK_LENGTH) return null
  if (![...code].every((c) => CODE_ALPHABET.includes(c))) return null
  let mask = 0
  for (const c of code.slice(SEED_LENGTH)) mask = mask * 32 + CODE_ALPHABET.indexOf(c)
  const categories = CATEGORIES.map((_, i) => i).filter((i) => mask & (1 << i))
  if (mask >> CATEGORIES.length || wordsFor(categories).length < BOARD_SIZE) return null
  return categories
}

export function isValidCode(code: string): boolean {
  return parseCategories(code) !== null
}

/** Display form, e.g. HXK7P-4G or HXK7P-B4G. */
export function formatCode(code: string): string {
  return `${code.slice(0, SEED_LENGTH)}-${code.slice(SEED_LENGTH)}`
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

/** Expects a code that passed isValidCode. */
export function generateGame(code: string): Game {
  const categories = parseCategories(code) ?? []
  const rand = mulberry32(seedFrom(`scripture-spies:${code}`))
  const words = shuffle(wordsFor(categories), rand).slice(0, BOARD_SIZE)
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
  return { code, categories, words, colors, starting }
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

export const boardStoreKey = (code: string) => `scripture-spies:board:${code}`
export const spyStoreKey = (code: string) => `scripture-spies:spy:${code}`

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

/** Words longer than this break at their soft hyphen on small screens instead of shrinking. */
export const LONG_WORD = 10

/** Font sizing hint: the longest single word on the card. */
export function charsFor(word: string): number {
  return Math.max(4, ...word.replaceAll('\u00ad', '').split(' ').map((w) => w.length))
}

export function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)
}
