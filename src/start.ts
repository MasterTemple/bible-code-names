import { BOARD_SIZE, escapeHtml, loadJson, saveJson } from './game'
import { CATEGORIES, wordsFor } from './words'
import { APP_NAME } from './content'

const PREF_KEY = 'scripture-spies:categories'

function savedSelection(): Set<number> {
  const ids = loadJson<string[] | null>(PREF_KEY, null)
  const picked = CATEGORIES.map((c, i) => ((ids ? ids.includes(c.id) : c.default) ? i : -1)).filter((i) => i >= 0)
  return new Set(picked.length ? picked : CATEGORIES.map((_, i) => i))
}

export interface StartOptions {
  /** False on the landing page, where there is no board to go back to. */
  dismissable: boolean
  /** Show a note that starting will replace the game in progress. */
  replacing: boolean
  onStart: (categories: number[]) => void
}

export function openStartDialog(opts: StartOptions): void {
  const selected = savedSelection()
  const dialog = document.createElement('dialog')
  dialog.className = 'modal start-modal'
  dialog.innerHTML = `
    ${opts.dismissable ? `<form method="dialog" class="modal-close"><button aria-label="Close">×</button></form>` : ''}
    <h2>${opts.dismissable ? 'New game' : APP_NAME}</h2>
    <p class="muted">Choose where the words come from. Mix and match as many categories as you like.</p>
    <div class="cat-toolbar">
      <span class="cat-total" data-total></span>
      <button type="button" class="btn small" data-pick="all">Select all</button>
      <button type="button" class="btn small" data-pick="none">Clear</button>
    </div>
    <div class="cat-grid">
      ${CATEGORIES.map(
        (c, i) => `
        <label class="cat">
          <input type="checkbox" value="${i}" ${selected.has(i) ? 'checked' : ''} />
          <span class="cat-body">
            <span class="cat-name">${escapeHtml(c.name)} <span class="cat-count">${c.words.length}</span></span>
            <span class="cat-sample">${escapeHtml(c.words.slice(0, 4).join(', '))}…</span>
          </span>
        </label>`,
      ).join('')}
    </div>
    <p class="error small" data-too-few hidden>Pick categories with at least ${BOARD_SIZE} words between them.</p>
    ${opts.replacing ? `<p class="muted small">Starting a new game replaces the one in progress.</p>` : ''}
    <div class="modal-actions">
      ${opts.dismissable ? `<form method="dialog"><button class="btn">Cancel</button></form>` : ''}
      <button type="button" class="btn primary" data-start autofocus>Start game</button>
    </div>
  `
  document.body.append(dialog)

  const boxes = [...dialog.querySelectorAll<HTMLInputElement>('.cat input')]
  const startBtn = dialog.querySelector<HTMLButtonElement>('[data-start]')!
  const picked = () => boxes.filter((b) => b.checked).map((b) => Number(b.value))

  function update() {
    const count = wordsFor(picked()).length
    dialog.querySelector('[data-total]')!.textContent = `${count} words`
    dialog.querySelector<HTMLElement>('[data-too-few]')!.hidden = count >= BOARD_SIZE
    startBtn.disabled = count < BOARD_SIZE
  }

  dialog.addEventListener('change', update)
  dialog.querySelectorAll<HTMLButtonElement>('[data-pick]').forEach((btn) =>
    btn.addEventListener('click', () => {
      boxes.forEach((b) => (b.checked = btn.dataset.pick === 'all'))
      update()
    }),
  )
  startBtn.addEventListener('click', () => {
    const categories = picked()
    saveJson(PREF_KEY, categories.map((i) => CATEGORIES[i].id))
    dialog.close()
    opts.onStart(categories)
  })
  if (!opts.dismissable) dialog.addEventListener('cancel', (e) => e.preventDefault())
  dialog.addEventListener('close', () => dialog.remove())

  update()
  dialog.showModal()
}

/** Shown when there's no game in the URL yet: the brand behind a start dialog. */
export function renderLanding(root: HTMLElement, onStart: (categories: number[]) => void): void {
  root.innerHTML = `
    <div class="landing">
      <h1>${APP_NAME}</h1>
      <p class="muted">A biblical word game for two teams</p>
      <button class="btn primary" data-open>Set up a game</button>
    </div>
  `
  const open = () => openStartDialog({ dismissable: false, replacing: false, onStart })
  root.querySelector('[data-open]')!.addEventListener('click', open)
  open()
}

export function categoryNames(categories: readonly number[]): string {
  return categories.length === CATEGORIES.length ? 'All categories' : categories.map((i) => CATEGORIES[i].name).join(' · ')
}
