/**
 * Theme Management Utility.
 * Handles light/dark mode switching, LocalStorage persistence, 
 * and synchronization with browser meta tags and CSS custom properties.
 * @module ThemeService
 */

/** @constant {string} Key for theme storage in LocalStorage */
const THEME_KEY = 'theme';

/** @type {HTMLMetaElement|null} Reference to the <meta name="theme-color"> tag */
let metaEL = document.querySelector('meta[name="theme-color"]');

/** @type {HTMLElement} The root <html> element of the document */
const root = document.documentElement;

/**
 * Updates the visual state and accessibility attributes of the theme toggle button.
 * @param {HTMLElement} btn - The button element to update.
 * @param {string|null} theme - The current theme ('light' or null/default for dark).
 */
function updateThemeButton(btn, theme) {
  if (!btn) return;
  const next = theme === 'light' ? 'dark' : 'light';
  
  // Update ARIA attributes for accessibility
  btn.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
  btn.setAttribute('aria-label', next === "light" ? "Přepnout na světlý režim" : "Přepnout na tmavý režim");

  const img = btn.querySelector('use');
  if (img) {
    const iconByNextMode = {
      light: './assets/iconBundle.svg#ligtMode',
      dark: './assets/iconBundle.svg#darkMode'
    };
    // Display the icon of the mode the user WILL switch to
    iconByNextMode[next] && img.setAttribute('href', iconByNextMode[next]);
  }
}

/**
 * Converts an RGB color string to a Hexadecimal string.
 * @param {string} rgb - The RGB string (e.g., "rgb(255, 255, 255)").
 * @returns {string} The hex color code (e.g., "#ffffff").
 */
function rgbToHex(rgb) {
    const colors = rgb.match(/\d+/g).map(Number);
    return "#" + colors.map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }).join("");
}

/**
 * Synchronizes the browser's theme-color meta tag with the current CSS background color.
 * This ensures the mobile browser toolbar matches the app's theme.
 */
function updateMetaTheme() {
    if (!metaEL) metaEL = document.querySelector('meta[name="theme-color"]');
    // Read the current computed background color variable from CSS
    const bgColor = getComputedStyle(root).getPropertyValue('--bg-color').trim();
    if (bgColor) {
        metaEL.setAttribute('content', bgColor[0] === 'r' ? rgbToHex(bgColor) : bgColor);
    }
}

/**
 * Applies a theme to the application and saves the preference.
 * @param {string} theme - The theme to apply ('light' or 'dark').
 * @param {HTMLElement} [btn] - Optional button to update.
 */
function applyTheme(theme, btn) {
  if (theme === 'light') {
      root.setAttribute('data-theme', theme);
  } else {
    root.removeAttribute('data-theme');
  }
  root.style.colorScheme = theme;
  localStorage.setItem(THEME_KEY, theme);

  if (btn) updateThemeButton(btn, theme);
  updateMetaTheme();
}

/**
 * Finds the theme button in the DOM and attaches the toggle event listener.
 */
function setupThemeBtn() {
  const modeBtn = document.querySelector('.mode-btn');
  if (modeBtn) {
    updateThemeButton(modeBtn, root.getAttribute('data-theme'));
    modeBtn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      applyTheme(current === 'light' ? 'dark' : 'light', modeBtn);
    });
  } else {
    console.warn("No mode button found (.mode-btn)");
  }
}

/**
 * Default export to initialize theme settings.
 * Ensures the setup runs after the DOM is ready.
 * @function setupTheme
 */
export default function setupTheme() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setupThemeBtn();
    });
  } else {
    setupThemeBtn();
  }
}