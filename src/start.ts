import { BOARD_SIZE, boardUrl, escapeHtml, loadJson, newCode, saveJson } from './game'
import { openHistoryDialog, pastGames } from './history'
import { ALL_DIFFICULTIES, CATEGORIES, DIFFICULTIES, type Difficulty, GROUPS, wordsFor } from './words'
import { APP_NAME } from './content'
import { refreshThemeButtons, THEME_BUTTON } from './theme'

const PREF_KEY = 'bible-code-names:categories'
const DIFFICULTY_PREF_KEY = 'bible-code-names:difficulties'

function savedSelection(): Set<number> {
  const ids = loadJson<string[] | null>(PREF_KEY, null)
  const picked = CATEGORIES.map((c, i) => ((ids ? ids.includes(c.id) : c.default) ? i : -1)).filter((i) => i >= 0)
  return new Set(picked.length ? picked : CATEGORIES.map((_, i) => i))
}

function savedDifficulties(): Set<Difficulty> {
  const saved = loadJson<Difficulty[]>(DIFFICULTY_PREF_KEY, []).filter((d) => ALL_DIFFICULTIES.includes(d))
  return new Set(saved.length ? saved : DIFFICULTIES.filter((d) => d.default).map((d) => d.id))
}

export interface StartOptions {
  /** False on the landing page, where there is no board to go back to. */
  dismissable: boolean
  /** Show a note that starting will replace the game in progress. */
  replacing: boolean
  navigate: (url: string) => void
}

export function openStartDialog(opts: StartOptions): void {
  const selected = savedSelection()
  const levels = savedDifficulties()
  const dialog = document.createElement('dialog')
  dialog.className = 'modal transient start-modal'
  dialog.innerHTML = `
    <div class="modal-theme">${THEME_BUTTON}</div>
    ${opts.dismissable ? `<form method="dialog" class="modal-close"><button aria-label="Close">×</button></form>` : ''}
    <h2>${opts.dismissable ? 'New game' : APP_NAME}</h2>
    <p class="muted">Pick how hard the words are and which topics they come from. A few related topics work best: with too many, the words have little in common, so clues that link them get hard to find and the game stops hanging together.</p>
    <div class="levels" role="group" aria-label="Difficulty">
      ${DIFFICULTIES.map(
        (d) => `
        <label class="level-chip ${d.id}">
          <input type="checkbox" value="${d.id}" ${levels.has(d.id) ? 'checked' : ''} />
          <span class="level-body">
            <span class="level-name">${d.name} <span class="cat-count" data-level-count="${d.id}"></span></span>
            <span class="level-hint">${d.hint}</span>
          </span>
        </label>`,
      ).join('')}
    </div>
    <div class="cat-toolbar">
      <span class="cat-total" data-total></span>
      <button type="button" class="btn small" data-pick="all">Select all</button>
      <button type="button" class="btn small" data-pick="none">Clear</button>
    </div>
    ${GROUPS.map(
      (g) => `
      <section class="cat-group">
        <div class="cat-group-head">
          <span class="group-name">${g.name}</span>
          <button type="button" class="btn small" data-pick="all" data-group-pick="${g.id}">Select all</button>
          <button type="button" class="btn small" data-pick="none" data-group-pick="${g.id}">Clear</button>
        </div>
        <div class="cat-grid">
          ${CATEGORIES.map((c, i) =>
            c.group !== g.id
              ? ''
              : `
            <label class="cat">
              <input type="checkbox" value="${i}" ${selected.has(i) ? 'checked' : ''} />
              <span class="cat-body">
                <span class="cat-name">${escapeHtml(c.name)} <span class="cat-count" data-cat-count="${i}"></span></span>
                <span class="cat-sample" data-cat-sample="${i}"></span>
              </span>
            </label>`,
          ).join('')}
        </div>
      </section>`,
    ).join('')}
    <p class="error small" data-too-few hidden></p>
    ${opts.replacing ? `<p class="muted small">Starting a new game replaces the one in progress.</p>` : ''}
    <div class="modal-actions">
      ${pastGames().length ? `<button type="button" class="btn" data-history>Previous games</button><span class="spacer"></span>` : ''}
      ${opts.dismissable ? `<form method="dialog"><button class="btn">Cancel</button></form>` : ''}
      <button type="button" class="btn primary" data-start autofocus>Start game</button>
    </div>
  `
  document.body.append(dialog)

  const boxes = [...dialog.querySelectorAll<HTMLInputElement>('.cat input')]
  const levelBoxes = [...dialog.querySelectorAll<HTMLInputElement>('.level-chip input')]
  const startBtn = dialog.querySelector<HTMLButtonElement>('[data-start]')!
  const picked = () => boxes.filter((b) => b.checked).map((b) => Number(b.value))
  const pickedLevels = () => levelBoxes.filter((b) => b.checked).map((b) => b.value as Difficulty)
  /** Topic checkboxes in one section, or all of them when no section is given. */
  const groupBoxes = (group?: string) => (group ? boxes.filter((b) => CATEGORIES[Number(b.value)].group === group) : boxes)
  const setText = (sel: string, text: string) => (dialog.querySelector(sel)!.textContent = text)

  function update() {
    const categories = picked()
    const difficulties = pickedLevels()
    const count = wordsFor(categories, difficulties).length

    for (const d of ALL_DIFFICULTIES) setText(`[data-level-count="${d}"]`, String(wordsFor(categories, [d]).length))
    CATEGORIES.forEach((_, i) => {
      const words = wordsFor([i], difficulties)
      setText(`[data-cat-count="${i}"]`, String(words.length))
      setText(`[data-cat-sample="${i}"]`, words.length ? `${words.slice(0, 4).join(', ')}…` : 'No words at this difficulty')
      boxes.find((b) => Number(b.value) === i)!.closest('.cat')!.classList.toggle('empty', !words.length)
    })

    setText('[data-total]', `${count} words`)
    const tooFew = dialog.querySelector<HTMLElement>('[data-too-few]')!
    tooFew.hidden = count >= BOARD_SIZE
    tooFew.textContent = difficulties.length
      ? `Pick topics with at least ${BOARD_SIZE} words between them at this difficulty.`
      : 'Pick at least one difficulty.'
    startBtn.disabled = count < BOARD_SIZE
    // Disable whichever bulk button would be a no-op for its section (or the whole list).
    dialog.querySelectorAll<HTMLButtonElement>('[data-pick]').forEach((btn) => {
      const group = groupBoxes(btn.dataset.groupPick)
      btn.disabled = btn.dataset.pick === 'all' ? group.every((b) => b.checked) : !group.some((b) => b.checked)
    })
  }

  dialog.addEventListener('change', update)
  dialog.querySelectorAll<HTMLButtonElement>('[data-pick]').forEach((btn) =>
    btn.addEventListener('click', () => {
      groupBoxes(btn.dataset.groupPick).forEach((b) => (b.checked = btn.dataset.pick === 'all'))
      update()
    }),
  )
  startBtn.addEventListener('click', () => {
    const categories = picked()
    const difficulties = pickedLevels()
    saveJson(PREF_KEY, categories.map((i) => CATEGORIES[i].id))
    saveJson(DIFFICULTY_PREF_KEY, difficulties)
    dialog.close()
    opts.navigate(boardUrl(newCode(categories, difficulties)))
  })
  dialog.querySelector('[data-history]')?.addEventListener('click', () => openHistoryDialog(opts.navigate))
  if (!opts.dismissable) dialog.addEventListener('cancel', (e) => e.preventDefault())
  dialog.addEventListener('close', () => dialog.remove())

  update()
  dialog.showModal()
  refreshThemeButtons()
}

/** Shown when there's no game in the URL yet: the brand behind a start dialog. */
export function renderLanding(root: HTMLElement, navigate: (url: string) => void): void {
  root.innerHTML = `
    <div class="landing">
      <h1>${APP_NAME}</h1>
      <p class="muted">A biblical word game for two teams</p>
      <div class="landing-actions">
        <button class="btn primary" data-open>Set up a game</button>
        ${pastGames().length ? `<button class="btn" data-history>Previous games</button>` : ''}
      </div>
    </div>
  `
  const open = () => openStartDialog({ dismissable: false, replacing: false, navigate })
  root.querySelector('[data-history]')?.addEventListener('click', () => openHistoryDialog(navigate))
  root.querySelector('[data-open]')!.addEventListener('click', open)
  open()
}
