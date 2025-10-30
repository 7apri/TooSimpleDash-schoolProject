const widgets = [...document.querySelectorAll('.widget')];
let activeWidget = 1; // start with first widget

const focusWidget = index => {
  activeWidget = index;

  const focusables = widgets[activeWidget].querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  focusables.forEach(el => el.tabIndex = 0);

  if (focusables.length > 0) focusables[0].focus();
  else widgets[activeWidget].focus();
};

const unFocusWidget = () => {
  if (activeWidget === null) return;

  const focusables = widgets[activeWidget].querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  focusables.forEach(el => el.tabIndex = -1);

  widgets[activeWidget].focus();
  activeWidget = null;
};

// Keyboard Enter/Escape & focus classes
widgets.forEach(widget => {
  widget.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target === widget) {
      e.preventDefault();
      focusWidget(widgets.indexOf(widget));
    }

    if (e.key === 'Escape' && activeWidget !== null) {
      unFocusWidget();
    }
  });

  widget.addEventListener('focusin', () => widget.classList.add('focused'));
  widget.addEventListener('focusout', () => widget.classList.remove('focused'));
});

// Wheel navigation
window.addEventListener('wheel', e => {
  if (activeWidget === null) return;

  if (e.deltaY > 0) focusWidget(Math.min(activeWidget + 1, widgets.length - 1));
  else if (e.deltaY < 0) focusWidget(Math.max(activeWidget - 1, 0));
});

// Touch navigation
let startY = 0;
window.addEventListener('touchstart', e => (startY = e.touches[0].clientY));
window.addEventListener('touchend', e => {
  if (activeWidget === null) return;

  const endY = e.changedTouches[0].clientY;
  const deltaY = endY - startY;

  if (deltaY > 50) focusWidget(Math.max(activeWidget - 1, 0));
  else if (deltaY < -50) focusWidget(Math.min(activeWidget + 1, widgets.length - 1));
});

// Focus initial widget
focusWidget(activeWidget);
