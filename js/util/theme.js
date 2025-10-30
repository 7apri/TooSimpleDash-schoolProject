const THEME_KEY = 'theme';

function updateThemeButton(btn, theme) {
  if (!btn) return;
  const next = theme === 'light' ? 'dark' : 'light';
  btn.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');

  const img = btn.querySelector('img');
  if (img) {
    const iconByNextMode = {
      light: './assets/Icons/lightbulb-solid-full.svg',
      dark: './assets/Icons/moon-regular-full.svg'
    };
    img.src = iconByNextMode[next] || img.src;
    img.alt = `switch to ${next} mode`;
  }
}

export function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === 'light') root.setAttribute('data-theme', 'light');
  else root.removeAttribute('data-theme'); // default = dark

  localStorage.setItem(THEME_KEY, theme);
  updateThemeButton(document.querySelector('.mode-btn'), theme);
}

export function applyThemeFromButton(theme, btn = document.querySelector('.mode-btn')) {
  applyTheme(theme);
  updateThemeButton(btn, theme);
}

export function getSystemTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

