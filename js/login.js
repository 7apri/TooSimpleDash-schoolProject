import { getSystemTheme, applyTheme , applyThemeFromButton } from "./util/theme.js"

// GET THA THEME
document.addEventListener('DOMContentLoaded', () => applyTheme(getSystemTheme()));

document.querySelector('.mode-btn')?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  applyThemeFromButton(current === 'light' ? 'dark' : 'light');
});

// Pass vis
document.querySelector(".pass-visibility").addEventListener("click", e =>{
  const passwordInput = document.querySelector("#password");
  const isPasswordVisible = passwordInput.type === 'text';
  passwordInput.type = isPasswordVisible ? 'password' : 'text';
  e.currentTarget.querySelector('img').src =!isPasswordVisible ?
    './assets/Icons/eye-slash-solid-full.svg' : './assets/Icons/eye-solid-full.svg';
  e.currentTarget.querySelector('img').alt = isPasswordVisible ? 'Hide password' : 'Show password';
})