const THEME_KEY = 'theme';
<<<<<<< HEAD
=======
let metaEL = document.querySelector('meta[name="theme-color"]');
const root = document.documentElement;
>>>>>>> f49c7b5 (did some offline mining)

function updateThemeButton(btn, theme) {
  if (!btn) return;
  const next = theme === 'light' ? 'dark' : 'light';
  btn.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
<<<<<<< HEAD

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

=======
  btn.setAttribute('aria-label',next === "light" ? "Přepnout na světlý režim" : "Přepnout na tmavý režim" )

  const img = btn.querySelector('use');
  if (img) {
    const iconByNextMode = {
      light: './assets/iconBundle.svg#ligtMode',
      dark: './assets/iconBundle.svg#darkMode'
    };
    iconByNextMode[next] && img.setAttribute('href',iconByNextMode[next]);
  }
}

function rgbToHex(rgb) {
    const colors = rgb.match(/\d+/g).map(Number);
    return "#" + colors.map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }).join("");
}
function updateMetaTheme() {
    if( !metaEL ) metaEL = document.querySelector('meta[name="theme-color"]');
    metaEL.setAttribute('content', rgbToHex(getComputedStyle(root).getPropertyValue('--bg-color').trim()));
}

function applyTheme(theme, btn) {
  if (theme === 'light') root.setAttribute('data-theme', 'light');
  else root.removeAttribute('data-theme');
  
  localStorage.setItem(THEME_KEY, theme);

  if (btn) updateThemeButton(btn, theme);
  updateMetaTheme();
}

function setupThemeBtn() {
  const modeBtn = document.querySelector('.mode-btn');
  if(modeBtn){
    updateThemeButton(modeBtn,root.getAttribute('data-theme'));
    modeBtn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      applyTheme(current === 'light' ? 'dark' : 'light', modeBtn);
    });
  } else{
    console.warn("No mode button found (.mode-btn)");
  }
}

export default function setupTheme(){
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setupThemeBtn();
    });
  } else {
    setupThemeBtn();
  }
}
>>>>>>> f49c7b5 (did some offline mining)
