import cssnano from 'cssnano';
import purgecss from '@fullhuman/postcss-purgecss';

const purgecssPlugin = purgecss.default || purgecss;

export default {
  plugins: [
    purgecssPlugin({
      content: ['./index.html', './login.html', './src/**/*.js'],
      safelist: [
        'open', 'cold', 'removing', 'inactive', 'active-week', 
        'first', 'last', 'selected', 'weather-forecast', 
        'forecast-start', 'forecast-end', "calendar-day",
        "day-btn", "day-num", "active", "weather-week-btn", 
        "right", "left","weather-info-week-list-item","weather-info-week-day",
        "weather-info-week-image","weather-info-week-temp",'remove-task-btn',
        'border-highlight','taskCheck','taskContent','task','completed','hasTasks'
      ],
      greedy: [/data-theme$/],
    }),
    cssnano({
      preset: 'default',
    }),
  ],
};