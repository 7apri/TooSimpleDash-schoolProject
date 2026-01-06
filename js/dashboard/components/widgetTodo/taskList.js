import { removeTask, toggleTask,getAllTasks } from "./task.js";
const taskList = document.getElementById('taskList');

const setup = () =>{
    const dateInput = document.getElementById('dateInputTodo');

    taskList.addEventListener('click', (e) => {
        const taskItem = e.target.closest('.task');
        if (!taskItem) return;

        const taskId = Number(taskItem.dataset.id);

        if (e.target.closest('.remove-task-btn')) {
            const getValidNeighbor = (item, direction) => {
                let neighbor = direction === 'prev' ? item.previousElementSibling : item.nextElementSibling;
                while (neighbor && neighbor.classList.contains('removing')) {
                    neighbor = direction === 'prev' ? neighbor.previousElementSibling : neighbor.nextElementSibling;
                }
                return neighbor;
            };

            const prevTask = getValidNeighbor(taskItem, 'prev');
            const nextTask = getValidNeighbor(taskItem, 'next');

            if (prevTask) {
                prevTask.querySelector('.remove-task-btn')?.focus();
            } else if (nextTask) {
                nextTask.querySelector('.remove-task-btn')?.focus();
            } else {
                document.getElementById('addInput').focus();
            }

            taskItem.classList.add('removing');
            removeTask(dateInput.value, taskId);

            taskItem.addEventListener('transitionend', () => {
                taskItem.remove();
            }, { once: true });
        }

        if (e.target.classList.contains('taskCheck')) {
            taskItem.classList.toggle('completed');
            toggleTask(dateInput.value, taskId);
        }
    });
    renderList(dateInput.value);
}

const renderList = (dateStr) =>{
    const tasks = (getAllTasks())[dateStr];

    let finalHtml = ["",""];

    if( tasks ){
        tasks.forEach( task => {
            const isCompleted = task.completed;
            const labelId = "task-" + task.id;
            finalHtml [isCompleted ? 1 : 0]+=
            `
                <li class="task flex jc-space-between ali-center ${isCompleted ? 'completed' : ''}" data-id="${task.id}">
                    <div class="flex ali-center">
                        <input type="checkbox" id="${labelId}" class="taskCheck border-highlight" ${isCompleted? 'checked' : ''}/>
                        <label class="taskContent" for="${labelId}" >${task.content}</label>
                    </div>
                    <button class="remove-task-btn icon-container border-highlight" aria-label="Odtranit úkol ${task.content}}" type="button">
                        <svg class="icon" aria-hidden="true">
                            <use href="./assets/iconBundle.svg#cross"></use>
                        </svg>
                    </button>
                </li>
            `
        });
    }

    taskList.innerHTML = finalHtml.join("");
}

const createTask = (taskObj,dateStr) =>{
    const taskEl = document.createElement('li');
    taskEl.className = `task flex jc-space-between ali-center just-added ${taskObj.completed ? 'completed' : ''}`;
    taskEl.dataset.id = taskObj.id;
    taskEl.dataset.date = dateStr;

    const labelId = "task-" + taskObj.id;
    taskEl.innerHTML = `
        <div class="flex ali-center">
            <input type="checkbox" id="${labelId}" class="taskCheck border-highlight" ${taskObj.completed ? 'checked' : ''}/>
            <label class="taskContent" for="${labelId}" >${taskObj.content}</label>
        </div>
        <button class="remove-task-btn icon-container border-highlight" aria-label='Odtranit úkol "${taskObj.content}"' type="button">
             <svg class="icon" aria-hidden="true">
                <use href="./assets/iconBundle.svg#cross"></use>
            </svg>
        </button>
    `;

    taskList.prepend(taskEl);
};

export { renderList,createTask }; 
export default setup;