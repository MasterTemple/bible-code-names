import QRCode from 'qrcode'
import {
  type Action,
  type Team,
  boardUrl,
  charsFor,
  LONG_WORD,
  escapeHtml,
  formatCode,
  generateGame,
  loadJson,
  newCode,
  replay,
  saveJson,
  spymasterHomeUrl,
  spymasterUrl,
} from './game'
import { APP_NAME, RULES_HTML } from './content'
import { categoryNames, openStartDialog } from './start'

const teamName = (t: Team) => (t === 'red' ? 'Red' : 'Blue')

export function renderBoard(root: HTMLElement, code: string, opts: { showQr: boolean; navigate: (url: string) => void }) {
  const game = generateGame(code)
  const storeKey = `scripture-spies:board:${code}`
  let actions = loadJson<Action[]>(storeKey, [])

  root.innerHTML = `
    <div class="board-page">
      <header class="topbar">
        <div class="brand">
          <h1>${APP_NAME}</h1>
          <button class="code-chip" data-act="qr" title="Show spymaster QR code">Game <b>${formatCode(code)}</b></button>
        </div>
        <div class="scoreline">
          <div class="score red"><span class="n" data-score="red"></span><span class="label">Red</span></div>
          <div class="turn" data-turn></div>
          <div class="score blue"><span class="n" data-score="blue"></span><span class="label">Blue</span></div>
        </div>
        <div class="actions">
          <button class="btn primary" data-act="qr">Spymaster QR</button>
          <button class="btn" data-act="end">End turn</button>
          <button class="btn" data-act="undo">Undo</button>
          <button class="btn" data-act="new">New game</button>
          <button class="btn icon" data-act="rules" aria-label="How to play">?</button>
        </div>
      </header>
      <main class="grid board" data-grid>
        ${game.words
          .map(
            (w, i) => `
          <button class="card k-${game.colors[i]}${charsFor(w) > LONG_WORD ? ' long' : ''}" data-i="${i}" style="--chars:${charsFor(w)}">
            <span class="word">${escapeHtml(w)}</span>
          </button>`,
          )
          .join('')}
      </main>
      <div class="winner-banner" data-winner hidden>
        <div class="winner-text" data-winner-text></div>
        <div class="winner-actions">
          <button class="btn primary" data-act="new">New game</button>
          <button class="btn" data-act="undo">Undo last guess</button>
        </div>
      </div>
    </div>

    <dialog class="modal" data-dialog="qr">
      <form method="dialog" class="modal-close"><button aria-label="Close">×</button></form>
      <h2>Spymasters, scan to see the key</h2>
      <p class="muted">Both spymasters scan this with their phones. Everyone else, look away!</p>
      <div class="qr-wrap"><canvas data-qr></canvas></div>
      <div class="code-big">${formatCode(code)}</div>
      <p class="muted small">${escapeHtml(categoryNames(game.categories))}</p>
      ${
        /^(localhost|127\.|\[::1\])/.test(location.hostname)
          ? `<p class="error small">This board is open on localhost, so phones can't reach this link. Open the board using your computer's network address instead (see the "Network" URL from <code>npm run dev</code>).</p>`
          : ''
      }
      <p class="muted small">Or open <a href="${spymasterHomeUrl()}" target="_blank" rel="noopener">${escapeHtml(spymasterHomeUrl())}</a> and enter the code above.</p>
      <div class="modal-actions">
        <button class="btn" data-act="copy">Copy spymaster link</button>
        <form method="dialog"><button class="btn primary">Start playing</button></form>
      </div>
    </dialog>

    <dialog class="modal" data-dialog="rules">
      <form method="dialog" class="modal-close"><button aria-label="Close">×</button></form>
      ${RULES_HTML}
    </dialog>
  `

  const $ = <T extends Element>(sel: string) => root.querySelector<T>(sel)!
  const cards = [...root.querySelectorAll<HTMLButtonElement>('.card')]
  const grid = $<HTMLElement>('[data-grid]')
  const qrDialog = $<HTMLDialogElement>('[data-dialog="qr"]')
  const rulesDialog = $<HTMLDialogElement>('[data-dialog="rules"]')
  const spyLink = spymasterUrl(code)

  QRCode.toCanvas($<HTMLCanvasElement>('[data-qr]'), spyLink, {
    width: 300,
    margin: 1,
    errorCorrectionLevel: 'M',
    color: { dark: '#1a1410', light: '#fffaf0' },
  }).catch(() => {})

  function update() {
    const state = replay(game, actions)
    cards.forEach((card, i) => {
      const shown = state.revealed.has(i)
      card.classList.toggle('revealed', shown)
      card.classList.toggle('fatal', state.assassinAt === i)
      card.disabled = shown || !!state.winner
      card.setAttribute('aria-label', shown ? `${game.words[i]}: ${game.colors[i]}` : game.words[i])
    })
    for (const t of ['red', 'blue'] as const) {
      $<HTMLElement>(`[data-score="${t}"]`).textContent = String(state.remaining[t])
    }
    const turnEl = $<HTMLElement>('[data-turn]')
    turnEl.className = `turn ${state.winner ?? state.turn}`
    turnEl.textContent = state.winner ? `${teamName(state.winner)} wins!` : `${teamName(state.turn)}'s turn`
    document.body.dataset.turn = state.winner ?? state.turn

    grid.classList.toggle('over', !!state.winner)
    const banner = $<HTMLElement>('[data-winner]')
    banner.hidden = !state.winner
    if (state.winner) {
      banner.className = `winner-banner ${state.winner}`
      $<HTMLElement>('[data-winner-text]').textContent =
        state.assassinAt !== null
          ? `The serpent struck! ${teamName(state.winner)} team wins.`
          : `${teamName(state.winner)} team found all their agents!`
    }
    root.querySelectorAll<HTMLButtonElement>('[data-act="undo"]').forEach((b) => (b.disabled = actions.length === 0))
    $<HTMLButtonElement>('[data-act="end"]').disabled = !!state.winner
  }

  function commit(next: Action[]) {
    actions = next
    saveJson(storeKey, actions)
    update()
  }

  grid.addEventListener('click', (e) => {
    const card = (e.target as Element).closest<HTMLButtonElement>('.card')
    if (!card || card.disabled) return
    commit([...actions, { t: 'reveal', i: Number(card.dataset.i) }])
  })

  root.addEventListener('click', async (e) => {
    const btn = (e.target as Element).closest<HTMLElement>('[data-act]')
    if (!btn) return
    switch (btn.dataset.act) {
      case 'qr':
        qrDialog.showModal()
        break
      case 'rules':
        rulesDialog.showModal()
        break
      case 'end':
        commit([...actions, { t: 'end' }])
        break
      case 'undo':
        commit(actions.slice(0, -1))
        break
      case 'new': {
        openStartDialog({
          dismissable: true,
          replacing: actions.length > 0 && !replay(game, actions).winner,
          onStart: (categories) => opts.navigate(boardUrl(newCode(categories))),
        })
        break
      }
      case 'copy':
        try {
          await navigator.clipboard.writeText(spyLink)
          btn.textContent = 'Copied!'
        } catch {
          prompt('Copy this link:', spyLink)
        }
        break
    }
  })

  update()
  if (opts.showQr) qrDialog.showModal()
}
