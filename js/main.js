import { getSystemTheme, applyTheme , applyThemeFromButton } from "./util/theme.js"

// GET THA THEME
document.addEventListener('DOMContentLoaded', () => applyTheme(getSystemTheme()));

document.querySelector('.mode-btn')?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  applyThemeFromButton(current === 'light' ? 'dark' : 'light');
});

function centerInViewport(el, behavior = 'smooth', offsetY = 0) {
  const r = el.getBoundingClientRect();
  const target = window.scrollY + r.top + r.height / 2 - window.innerHeight / 2 - offsetY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const top = Math.max(0, Math.min(target, max));
  window.scrollTo({ top, behavior });
}

const widgets = [...document.querySelectorAll('.widget')];
let activeWidget = 1;

widgets.forEach(w => {
  if (!w.hasAttribute('tabindex')) w.setAttribute('tabindex', '0');
});


const focusInnerWidget = index => {
  activeWidget = index;
  const widget = widgets[activeWidget];

  const focusables = widget.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  focusables.forEach(el => el.tabIndex = 0);

  (focusables[0] || widget).focus({ preventScroll: true });
  centerInViewport(widget);
};

const unFocusInnerWidget = () => {
  if (activeWidget === null) return;

  const focusables = widgets[activeWidget].querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  focusables.forEach(el => el.tabIndex = -1);

  widgets[activeWidget].focus();
  activeWidget = null;
};

widgets.forEach(widget => {
  widget.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target === widget) {
      e.preventDefault();
      focusInnerWidget(widgets.indexOf(widget));
    }

    if (e.key === 'Escape' && activeWidget !== null) {
      unFocusInnerWidget();
    }
  });

  widget.addEventListener('focusin', () => {
    centerInViewport(widget)
    widget.classList.add('focused')
  });
  widget.addEventListener('focusout', e => {
      if (!widget.contains(e.relatedTarget)) widget.classList.remove('focused');
    });
});

console.log("HI I EXIST")
widgets[activeWidget].focus({ preventScroll: true })