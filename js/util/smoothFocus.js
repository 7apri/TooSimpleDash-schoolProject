function centerInViewport(el, behavior = 'smooth', offsetY = 0) {
  const r = el.getBoundingClientRect();
  const target = window.scrollY + r.top + r.height / 2 - window.innerHeight / 2 - offsetY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const top = Math.max(0, Math.min(target, max));
  window.scrollTo({ top, behavior });
}

export function scrollToBounds(top = false) {
    const targetScroll = top ? 0 : document.documentElement.scrollHeight;
    console.log('Scrolling to:', targetScroll);
    window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
    });
}

export default () =>{
    const widgets = [...document.querySelectorAll('.widget')];
    let activeWidget = 0;

    widgets.forEach(widget => {
      if (!widget.hasAttribute('tabindex')) widget.setAttribute('tabindex', '0');
    });
    
    
    const focusInnerWidget = index => {
      activeWidget = index;
      const widget = widgets[activeWidget];
    
      const focusables = widget.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      focusables.forEach(el => el.tabIndex = 0);
    
      (focusables[0] || widget).focus({ preventScroll: true });
      let isFirst = index === 0
      isFirst || index === widgets.length -1 ? scrollToBounds(isFirst) : centerInViewport(widget);

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
    
    widgets.forEach(( widget,index )=> {

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

    widgets[activeWidget].focus({ preventScroll: true })

    let lastScrollDirection = 0; // 0=no scroll, 1=down, -1=up 
    let isScrolling;

    window.addEventListener('wheel', (e) => {
      window.clearTimeout(isScrolling);
      isScrolling = setTimeout(() => {
        widgets[activeWidget].classList.remove('focused');
        
        if (lastScrollDirection === 1) {
          activeWidget = (activeWidget + 1) % widgets.length;
        } else if (lastScrollDirection === -1) {
          activeWidget = (activeWidget - 1 + widgets.length) % widgets.length;
        }
        let index = activeWidget
        let isFirst = index === 0
        isFirst || index === widgets.length -1 ? scrollToBounds(isFirst) : centerInViewport(widgets[activeWidget]);
      }, 100);
      if (e.deltaY > 0) {
        lastScrollDirection = 1;
      } else if (e.deltaY < 0) {
        lastScrollDirection = -1;
      }
    });
};