import './style.css'
import { renderBoard } from './board'
import { renderSpymaster } from './spymaster'
import { boardUrl, isValidCode, newCode, normalizeCode } from './game'
import { renderLanding } from './start'

const app = document.getElementById('app')!

function navigate(url: string) {
  history.pushState(null, '', url)
  route(true)
}

function route(fresh = false) {
  const params = new URLSearchParams(location.search)
  const code = normalizeCode(params.get('game') ?? '')
  delete document.body.dataset.turn
  // A start dialog left open by back/forward navigation belongs to the old view.
  document.querySelectorAll<HTMLDialogElement>('dialog.start-modal').forEach((d) => d.close())

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
    renderLanding(app, (categories) => navigate(boardUrl(newCode(categories))))
  }
}

window.addEventListener('popstate', () => route())
route()
