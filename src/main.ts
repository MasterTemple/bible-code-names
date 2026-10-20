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

window.addEventListener('popstate', () => route())
initTheme()
route()
