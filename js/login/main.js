import setupTheme from "../util/theme.js"

setupTheme();

const passwordInput = document.querySelector("#password");

document.querySelector(".pass-visibility").addEventListener("click", e =>{  
  const isPasswordVisible = passwordInput.type === 'text';
  passwordInput.type = isPasswordVisible ? 'password' : 'text';
  
  e.currentTarget.setAttribute('aria-label', isPasswordVisible ? 'Schovat heslo' : 'Zobrazit heslo');
  e.currentTarget.querySelector('use').setAttribute('href',!isPasswordVisible ? './assets/iconBundle.svg#eye-slash' : './assets/iconBundle.svg#eye');
})