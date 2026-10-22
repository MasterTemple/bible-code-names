import './style.css'
import { renderBoard } from './board'
import { renderSpymaster } from './spymaster'
import { isValidCode, normalizeCode } from './game'
import { renderLanding } from './start'
import { initTheme, refreshThemeButtons } from './theme'

const app = document.getElementById('app')!

function navigate(url: string) {
  history.pushState(null, '', url)
  route(true)
}

function route(fresh = false) {
  renderView(fresh)
  refreshThemeButtons()
}

function renderView(fresh: boolean) {
  const params = new URLSearchParams(location.search)
  const code = normalizeCode(params.get('game') ?? '')
  delete document.body.dataset.turn
  // Start/history dialogs live on <body>, so close them when the view changes.
  document.querySelectorAll<HTMLDialogElement>('dialog.transient').forEach((d) => d.close())

  if (params.get('role') === 'spymaster') {
    document.body.dataset.view = 'spymaster'
    renderSpymaster(app, isValidCode(code) ? code : null, navigate)
    return
  }

  document.body.dataset.view = 'board'
  if (isValidCode(code)) {
    renderBoard(app, code, { showQr: fresh, navigate })
  } else {
    if (params.has('game')) history.replaceState(null, '', location.pathname)
    renderLanding(app, navigate)
  }
}

// Clicking the backdrop closes a dialog, as Escape does, so dialogs that block
// Escape (the first start dialog) stay open. Both press and release must land
// outside, so dragging out of a text field doesn't close it.
let pressedOutside = false
const outsideDialog = (e: MouseEvent) => {
  const dialog = e.target
  if (!(dialog instanceof HTMLDialogElement) || !dialog.open) return null
  const r = dialog.getBoundingClientRect()
  const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom
  return inside ? null : dialog
}
document.addEventListener('pointerdown', (e) => (pressedOutside = outsideDialog(e) !== null))
document.addEventListener('click', (e) => {
  const dialog = outsideDialog(e)
  if (!dialog || !pressedOutside) return
  if (dialog.dispatchEvent(new Event('cancel', { cancelable: true }))) dialog.close()
})

window.addEventListener('popstate', () => route())
initTheme()
route()
