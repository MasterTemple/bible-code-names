import {
  charsFor,
  LONG_WORD,
  countColor,
  escapeHtml,
  formatCode,
  generateGame,
  isValidCode,
  loadJson,
  normalizeCode,
  saveJson,
  spyStoreKey,
  spymasterUrl,
} from './game'
import { APP_NAME } from './content'
import { describeSettings } from './words'
import { openHistoryDialog, pastGames, recordVisit } from './history'
import { THEME_BUTTON } from './theme'

export function renderSpymaster(root: HTMLElement, code: string | null, navigate: (url: string) => void) {
  if (!code) {
    renderJoin(root, navigate)
    return
  }

  const game = generateGame(code)
  const storeKey = spyStoreKey(code)
  recordVisit(code, 'spymaster')
  let marked = new Set(loadJson<number[]>(storeKey, []))
  const starting = game.starting === 'red' ? 'Red' : 'Blue'

  root.innerHTML = `
    <div class="spy-page key-${game.starting}">
      <header class="spy-header">
        <div>
          <div class="eyebrow">${APP_NAME} · Spymaster key</div>
          <div class="spy-code">${formatCode(code)}</div>
        </div>
        <div class="starts ${game.starting}">${starting} goes first</div>
      </header>
      <div class="spy-counts">
        <span class="pill red"><b data-left="red"></b> red left</span>
        <span class="pill blue"><b data-left="blue"></b> blue left</span>
        <button class="btn small" data-act="hide" aria-pressed="false">Hide key</button>
        ${THEME_BUTTON}
      </div>
      <main class="grid spy" data-grid>
        ${game.words
          .map(
            (w, i) => `
          <button class="card k-${game.colors[i]}${charsFor(w) > LONG_WORD ? ' long' : ''}" data-i="${i}" style="--chars:${charsFor(w)}">
            <span class="word">${escapeHtml(w)}</span>
          </button>`,
          )
          .join('')}
      </main>
      <p class="muted small center">${escapeHtml(describeSettings(game.categories, game.difficulties))}</p>
      <p class="muted small center">Tap a card once it's been guessed to cross it off. This only changes your phone.</p>
      <footer class="spy-footer">
        <form class="join-inline" data-join>
          <input name="code" placeholder="New code" maxlength="12" autocomplete="off" autocapitalize="characters" spellcheck="false" />
          <button class="btn">Switch game</button>
        </form>
        <button class="btn" data-act="clear">Clear marks</button>
        <button class="btn" data-history>Previous games</button>
      </footer>
    </div>
  `

  const cards = [...root.querySelectorAll<HTMLButtonElement>('.card')]
  const grid = root.querySelector<HTMLElement>('[data-grid]')!

  function update() {
    cards.forEach((card, i) => card.classList.toggle('marked', marked.has(i)))
    for (const t of ['red', 'blue'] as const) {
      const left = countColor(game, t) - [...marked].filter((i) => game.colors[i] === t).length
      root.querySelector(`[data-left="${t}"]`)!.textContent = String(left)
    }
    saveJson(storeKey, [...marked])
  }

  grid.addEventListener('click', (e) => {
    const card = (e.target as Element).closest<HTMLButtonElement>('.card')
    if (!card) return
    const i = Number(card.dataset.i)
    if (marked.has(i)) marked.delete(i)
    else marked.add(i)
    update()
  })

  root.querySelector('[data-act="clear"]')!.addEventListener('click', () => {
    marked = new Set()
    update()
  })

  const hideBtn = root.querySelector<HTMLButtonElement>('[data-act="hide"]')!
  hideBtn.addEventListener('click', () => {
    const hidden = grid.classList.toggle('hidden-key')
    hideBtn.setAttribute('aria-pressed', String(hidden))
    hideBtn.textContent = hidden ? 'Show key' : 'Hide key'
  })

  bindJoinForm(root.querySelector<HTMLFormElement>('[data-join]')!, navigate)
  root.querySelector('[data-history]')!.addEventListener('click', () => openHistoryDialog(navigate))
  update()
  keepAwake()
}

function renderJoin(root: HTMLElement, navigate: (url: string) => void) {
  root.innerHTML = `
    <div class="join-page">
      <div class="corner">${THEME_BUTTON}</div>
      <div class="join-card">
        <div class="eyebrow">${APP_NAME}</div>
        <h1>Spymaster</h1>
        <p class="muted">Enter the game code shown on the main board.</p>
        <form data-join class="join-form">
          <input name="code" placeholder="ABCDE-FG" maxlength="12" autocomplete="off" autocapitalize="characters" spellcheck="false" autofocus />
          <button class="btn primary">Show key</button>
        </form>
        <p class="error" data-error hidden>That code doesn't look right. Check the board and try again.</p>
        ${pastGames().length ? `<p><button class="btn" data-history>Previous games</button></p>` : ''}
        <p class="muted small"><a href="${escapeHtml(location.pathname)}">Or start a new board on this device</a></p>
      </div>
    </div>
  `
  bindJoinForm(root.querySelector<HTMLFormElement>('[data-join]')!, navigate)
  root.querySelector('[data-history]')?.addEventListener('click', () => openHistoryDialog(navigate))
}

function bindJoinForm(form: HTMLFormElement, navigate: (url: string) => void) {
  const input = form.querySelector<HTMLInputElement>('input')!
  input.addEventListener('input', () => {
    const code = normalizeCode(input.value)
    input.value = code.length > 5 ? formatCode(code) : code
  })
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const code = normalizeCode(input.value)
    const error = document.querySelector<HTMLElement>('[data-error]')
    if (!isValidCode(code)) {
      if (error) error.hidden = false
      input.select()
      return
    }
    navigate(spymasterUrl(code))
  })
}

// Keep the spymaster's phone from sleeping mid-round, where supported.
let wakeLock: { release(): Promise<void> } | null = null
async function keepAwake() {
  const nav = navigator as Navigator & { wakeLock?: { request(type: 'screen'): Promise<{ release(): Promise<void> }> } }
  if (!nav.wakeLock || wakeLock) return
  try {
    wakeLock = await nav.wakeLock.request('screen')
    document.addEventListener('visibilitychange', async () => {
      if (document.visibilityState === 'visible') wakeLock = await nav.wakeLock!.request('screen').catch(() => null)
    })
  } catch {
    // Not allowed (e.g. battery saver); harmless.
  }
}
