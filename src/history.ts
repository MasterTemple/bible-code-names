import {
  type Action,
  boardStoreKey,
  boardUrl,
  escapeHtml,
  formatCode,
  generateGame,
  isValidCode,
  loadJson,
  replay,
  saveJson,
  spyStoreKey,
  spymasterUrl,
} from './game'
import { describeSettings } from './words'

export type Role = 'board' | 'spymaster'

export interface PastGame {
  code: string
  role: Role
  lastSeen: number
}

const HISTORY_KEY = 'bible-code-names:history'
const MAX_GAMES = 30

export function pastGames(): PastGame[] {
  return loadJson<PastGame[]>(HISTORY_KEY, []).filter((g) => isValidCode(g.code))
}

/** Moves the game to the top of this device's history. */
export function recordVisit(code: string, role: Role): void {
  const rest = pastGames().filter((g) => !(g.code === code && g.role === role))
  saveJson(HISTORY_KEY, [{ code, role, lastSeen: Date.now() }, ...rest].slice(0, MAX_GAMES))
}

function forget(code: string, role: Role): void {
  saveJson(HISTORY_KEY, pastGames().filter((g) => !(g.code === code && g.role === role)))
  try {
    localStorage.removeItem(role === 'board' ? boardStoreKey(code) : spyStoreKey(code))
  } catch {
    // Storage unavailable; nothing to clean up.
  }
}

function status(game: PastGame): string {
  if (game.role === 'spymaster') return 'Spymaster key'
  const g = generateGame(game.code)
  const actions = loadJson<Action[]>(boardStoreKey(game.code), [])
  const state = replay(g, actions)
  if (state.winner) return `${state.winner === 'red' ? 'Red' : 'Blue'} won`
  if (!actions.length) return 'Not started'
  return `In progress · Red ${state.remaining.red} left, Blue ${state.remaining.blue} left`
}

function settingsOf(code: string) {
  const { categories, difficulties } = generateGame(code)
  return [categories, difficulties] as const
}

const relative = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' })
function ago(time: number): string {
  const minutes = Math.round((time - Date.now()) / 60000)
  if (minutes > -1) return 'just now'
  if (minutes > -60) return relative.format(minutes, 'minute')
  const hours = Math.round(minutes / 60)
  if (hours > -24) return relative.format(hours, 'hour')
  return relative.format(Math.round(hours / 24), 'day')
}

export function openHistoryDialog(navigate: (url: string) => void): void {
  const dialog = document.createElement('dialog')
  dialog.className = 'modal transient history-modal'
  document.body.append(dialog)

  function render() {
    const games = pastGames()
    dialog.innerHTML = `
      <form method="dialog" class="modal-close"><button aria-label="Close">×</button></form>
      <h2>Previous games</h2>
      <p class="muted small">Saved on this device only.</p>
      ${
        games.length
          ? `<ul class="history">
          ${games
            .map(
              (g, i) => `
            <li>
              <button class="history-open" data-open="${i}">
                <span class="history-top">
                  <b class="history-code">${formatCode(g.code)}</b>
                  <span class="role ${g.role}">${g.role === 'board' ? 'Board' : 'Spymaster'}</span>
                  <span class="muted small history-when">${ago(g.lastSeen)}</span>
                </span>
                <span class="history-status">${escapeHtml(status(g))}</span>
                <span class="muted small">${escapeHtml(describeSettings(...settingsOf(g.code), 2))}</span>
              </button>
              <button class="history-forget" data-forget="${i}" aria-label="Remove ${formatCode(g.code)} from history">×</button>
            </li>`,
            )
            .join('')}
        </ul>`
          : `<p class="muted">No previous games on this device yet.</p>`
      }
      <div class="modal-actions">
        ${games.length ? `<button class="btn" data-clear>Clear all</button>` : ''}
        <form method="dialog"><button class="btn primary">Done</button></form>
      </div>
    `
  }

  dialog.addEventListener('click', (e) => {
    const target = (e.target as Element).closest<HTMLElement>('[data-open], [data-forget], [data-clear]')
    if (!target) return
    const games = pastGames()
    if (target.dataset.open) {
      const g = games[Number(target.dataset.open)]
      navigate(g.role === 'board' ? boardUrl(g.code) : spymasterUrl(g.code))
    } else if (target.dataset.forget) {
      const g = games[Number(target.dataset.forget)]
      forget(g.code, g.role)
      render()
    } else if (confirm('Remove all previous games from this device?')) {
      games.forEach((g) => forget(g.code, g.role))
      render()
    }
  })
  dialog.addEventListener('close', () => dialog.remove())

  render()
  dialog.showModal()
}
