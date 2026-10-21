// Light/dark theme. The preference is 'system', 'light' or 'dark'; the page
// always carries the resolved theme as <html data-theme="light|dark">.
// index.html applies it once before first paint to avoid a flash.

export type ThemePref = 'system' | 'light' | 'dark'

const THEME_KEY = 'bible-code-names:theme'
const ORDER: readonly ThemePref[] = ['system', 'light', 'dark']
const LABELS: Record<ThemePref, string> = { system: 'System theme', light: 'Light theme', dark: 'Dark theme' }
const systemDark = matchMedia('(prefers-color-scheme: dark)')

const ICONS: Record<ThemePref, string> = {
  system: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 3.5a8.5 8.5 0 0 1 0 17z" fill="currentColor"/></svg>`,
  light: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.5" fill="currentColor"/><g stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"/></g></svg>`,
  dark: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" fill="currentColor"/></svg>`,
}

function savedPreference(): ThemePref {
  try {
    const saved = localStorage.getItem(THEME_KEY) as ThemePref | null
    return saved && ORDER.includes(saved) ? saved : 'system'
  } catch {
    return 'system'
  }
}

let pref = savedPreference()

function apply(): void {
  const theme = pref === 'system' ? (systemDark.matches ? 'dark' : 'light') : pref
  const root = document.documentElement
  if (root.dataset.theme !== theme) {
    // Switch every color at once instead of letting each element's transition fade separately.
    root.classList.add('theme-switching')
    root.dataset.theme = theme
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove('theme-switching')))
  }
  // Keep the mobile browser chrome in step with the page background.
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', getComputedStyle(document.body).getPropertyValue('--bg').trim())
  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((btn) => {
    btn.innerHTML = ICONS[pref]
    btn.title = `${LABELS[pref]} (click to change)`
    btn.setAttribute('aria-label', btn.title)
  })
}

export function initTheme(): void {
  systemDark.addEventListener('change', apply)
  // One delegated listener covers toggle buttons in every view, including re-renders.
  document.addEventListener('click', (e) => {
    if (!(e.target as Element).closest('[data-theme-toggle]')) return
    pref = ORDER[(ORDER.indexOf(pref) + 1) % ORDER.length]
    try {
      localStorage.setItem(THEME_KEY, pref)
    } catch {
      // Storage unavailable: the choice lasts until the page reloads.
    }
    apply()
  })
  apply()
}

/** Call after rendering a view so its toggle shows the current icon. */
export const refreshThemeButtons = apply

export const THEME_BUTTON = `<button type="button" class="btn icon theme-toggle" data-theme-toggle></button>`
