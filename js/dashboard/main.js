import setupTheme from "../util/theme.js";
import setUpWeather from "./components/widgetWeather/component.js"
import setUpTodo from "./components/widgetTodo/component.js"
import setUpCalendar from "./components/widgetCalendar/component.js"

setupTheme();
setUpWeather();
setUpTodo();
setUpCalendar();

const allOpen = document.getElementById('open-all');
if(allOpen){
  allOpen.addEventListener('click',(e) =>{
    e.currentTarget.setAttribute('aria-expanded',e.currentTarget.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
    document.getElementById('shortcuts').classList.toggle('open');
    document.getElementById('settings').classList.toggle('open');
  });
}

 