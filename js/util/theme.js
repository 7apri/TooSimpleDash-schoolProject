const THEME_KEY = 'theme';
let metaEL = document.querySelector('meta[name="theme-color"]');
const root = document.documentElement;

function updateThemeButton(btn, theme) {
  if (!btn) return;
  const next = theme === 'light' ? 'dark' : 'light';
  btn.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
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