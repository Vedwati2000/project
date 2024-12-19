
const taskTitleInput = document.querySelector('input[placeholder="title..."]');
const taskDescInput = document.querySelector('input[placeholder="description..."]');
const taskDateInput = document.getElementById('blank');
const addTaskButton = document.querySelector('.btn');
const container = document.querySelector('.container');


let tasks = [];


function addTask() {
    const title = taskTitleInput.value.trim();
    const description = taskDescInput.value.trim();
    const date = taskDateInput.value;

    // Validate inputs
    if (!title || !description || !date) {
        alert("Please fill in all fields!");
        return;
    }

    // Create a task object
    const task = {
        id: Date.now(), // Unique ID
        title,
        description,
        date,
    };

    // Add task to the array
    tasks.push(task);

    // Clear input fields
    taskTitleInput.value = "";
    taskDescInput.value = "";
    taskDateInput.value = "";

    // Update task list
    renderTasks();
}

// Function to render tasks
function renderTasks() {
    // Remove any existing task list
    const existingTaskList = document.querySelector('.task-list');
    if (existingTaskList) {
        existingTaskList.remove();
    }

    // Create a new task list container
    const taskList = document.createElement('div');
    taskList.classList.add('task-list');

    // Iterate over tasks and add them to the list
    tasks.forEach((task) => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        taskItem.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p><strong>Date:</strong> ${task.date}</p>
            <button class="delete-btn" data-id="${task.id}">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });

    // Add the task list to the container
    container.appendChild(taskList);

    // Add event listeners for delete buttons
    document.querySelectorAll('.delete-btn').forEach((button) => {
        button.addEventListener('click', deleteTask);
    });
}

// Function to delete a task
function deleteTask(event) {
    const taskId = parseInt(event.target.getAttribute('data-id'), 10);

    // Remove the task from the array
    tasks = tasks.filter((task) => task.id !== taskId);

    // Update task list
    renderTasks();
}

// Add event listener to the "Add Task" button
addTaskButton.addEventListener('click', addTask);
