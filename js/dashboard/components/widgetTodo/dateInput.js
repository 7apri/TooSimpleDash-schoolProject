import { activeGrid } from "../widgetCalendar/grid.js";
import { renderList } from "./taskList.js";

const domReady = new Promise(resolve => {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", resolve);
    } else {
        resolve();
    }
});

const dateInputEl = document.getElementById('dateInputTodo');

const changeDateInputContent = (dateString) => {
    dateInputEl.value = dateString;
    renderList(dateInputEl.value);
};

const setup = async () =>{

    let holdTimer = null;
    let velocity = 1;

    const step = (direction) => {
        const date = new Date(dateInputEl.value);
        
        const jump = Math.trunc(velocity) * direction;
        date.setDate(date.getDate() + jump);
        
        changeDateInputContent(date.toISOString().split('T')[0]);
        activeGrid.fullDateString = dateInputEl.value;

        if (velocity < 30) velocity *= 1.1;
    };

    const startHolding = (e, direction) => {
        e.preventDefault();
        velocity = 1;
        
        step(direction); 
        
        holdTimer = setInterval(() => step(direction), 100);
    };

    const stopHolding = () => {
        clearInterval(holdTimer);
        holdTimer = null;
        velocity = 1;
    };

    const attachHoldEvents = (el, direction) => {
        const start = (e) => startHolding(e, direction);
        
        el.addEventListener('mousedown', start);
        el.addEventListener('touchstart', start, {passive: false});
        
        ['mouseup', 'mouseleave', 'touchend', 'touchcancel'].forEach(evt => {
            el.addEventListener(evt, stopHolding);
        });
        
        el.addEventListener('keydown', (e) =>{
            if (e.key === 'Enter' ||  e.key === ' ' && !e.repeat) {
                e.preventDefault();
                start(e)
            }
        });
        el.addEventListener('keyup', (e) =>{
            if (e.key === 'Enter' ||  e.key === ' ') {
                e.preventDefault();
                stopHolding(e)
            }
        });
    };

    attachHoldEvents(document.getElementById('prevDayTodo'), -1);
    attachHoldEvents(document.getElementById('nextDayTodo'), 1);

    await domReady;

    dateInputEl.addEventListener('change', (e) => {
        renderList(e.currentTarget.value);
        activeGrid.fullDateString = dateInputEl.value;
    });

    changeDateInputContent(new Date().toISOString().split('T')[0]);
    activeGrid.fullDateString = dateInputEl.value;
}

export{changeDateInputContent};
export default setup;