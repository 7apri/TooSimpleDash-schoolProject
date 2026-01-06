import { addTask } from "./task.js";

const setup = () =>{
    const dateInputEl = document.getElementById("dateInputTodo");
    const taskInputEl = document.getElementById("addInput");

    const addTaskFromInput = () => {
        if(taskInputEl.value.trim() === "") return;
        addTask(dateInputEl.value || new Date().toISOString().split('T')[0],taskInputEl.value);
        taskInputEl.value = "";
    };

    taskInputEl.parentElement.addEventListener('submit',(e)=>{
        e.preventDefault();
        addTaskFromInput();
    });
};

export default setup;