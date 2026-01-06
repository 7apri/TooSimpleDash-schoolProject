import { activeGrid } from "../widgetCalendar/grid.js";
import { createTask } from "./taskList.js";

const STORAGE_KEY = 'tasks';

const getAllTasks = () => JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}

const addTask = (dateStr, taskContent) =>{
    const all = getAllTasks();
    
    if (!all[dateStr]) all[dateStr] = [];

    const newTask = {
        id: Date.now(),
        content: taskContent,
        completed: false
    };

    createTask(newTask,dateStr);
    
    all[dateStr].unshift(newTask);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    
    activeGrid.updateSelectedDay();
    return newTask;
}

const getTasksByDate = (dateStr) => {
        const all = getAllTasks();
        return all[dateStr] || [];
}

const toggleTask= (dateStr, taskId) => {
    const all = getAllTasks();
    if (!all[dateStr]) return;


    all[dateStr] = all[dateStr].map(task => {
        return task.id === taskId ? { ...task, completed: !task.completed } : task;
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));

    activeGrid.updateSelectedDay();
}

const removeTask = (dateStr, taskId) => {
    const all = getAllTasks();
    if (!all[dateStr]) return;
    
    all[dateStr] = all[dateStr].filter(task => task.id !== taskId);
    
    if (all[dateStr].length === 0) {
        delete all[dateStr];
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    
    activeGrid.updateSelectedDay()
}

export {getAllTasks, addTask, getTasksByDate, toggleTask, removeTask};