import { capitalize } from "../../../util/misc.js";
import { activeGrid } from "./grid.js";

const monthEl = document.getElementById('monthDisplayCalendar');
const yearEl = document.getElementById('yearDisplayCalendar');

let holdTimer = null;

const changeCalendarDateSelectorDate = (month, year) => {

    const date = new Date(year, month - 1, 1);

    monthEl.textContent = capitalize(new Intl.DateTimeFormat('default', { month: 'long' }).format(date));
    yearEl.textContent = year;
};

const step = (direction) => {
    let [year , month, day] = activeGrid.fullDateArray;

    const dateObj = new Date(year, month - 1, 1);
    dateObj.setMonth(dateObj.getMonth() + direction);

    year = dateObj.getFullYear();
    month = dateObj.getMonth() + 1;

    activeGrid.fullDateArray = [year , month, day];
};

const startHolding = (e, direction) => {
    e.preventDefault();
    
    step(direction);
    
    holdTimer = setInterval(() => step(direction), 150);
};

const stopHolding = () => {
    clearInterval(holdTimer);
    holdTimer = null;
};

const attachHoldEvents = (el, direction) => {
    const start = (e) => startHolding(e, direction);
    
    el.addEventListener('mousedown', start);
    el.addEventListener('touchstart', start, {passive: false});
    
    ['mouseup', 'mouseleave', 'touchend', 'touchcancel'].forEach(evt => {
        el.addEventListener(evt, stopHolding);
    });

    el.addEventListener('keydown', (e) =>{
            if (e.key === 'Enter' || e.key === ' ' && !e.repeat) {
                e.preventDefault();
                start(e)
            }
    });
    el.addEventListener('keyup', (e) =>{
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            stopHolding(e)
        }
    });
};

const setupDateSelect = () =>{
    attachHoldEvents(document.getElementById('prevMonthCalendar'), -1);
    attachHoldEvents(document.getElementById('nextMonthCalendar'), 1);
};

export{ changeCalendarDateSelectorDate };
export default setupDateSelect;
