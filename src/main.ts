import './style.css'
import { renderBoard } from './board'
import { renderSpymaster } from './spymaster'
import { boardUrl, isValidCode, newCode, normalizeCode } from './game'

const app = document.getElementById('app')!

function navigate(url: string) {
  history.pushState(null, '', url)
  route(true)
}

function route(fresh = false) {
  const params = new URLSearchParams(location.search)
  const code = normalizeCode(params.get('game') ?? '')
  delete document.body.dataset.turn

  if (params.get('role') === 'spymaster') {
    document.body.dataset.view = 'spymaster'
    renderSpymaster(app, isValidCode(code) ? code : null, navigate)
    return
  }

  document.body.dataset.view = 'board'
  if (isValidCode(code)) {
    renderBoard(app, code, { showQr: fresh, navigate })
  } else {
    history.replaceState(null, '', boardUrl(newCode()))
    route(true)
  }
}

window.addEventListener('popstate', () => route())
route()
