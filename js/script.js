document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);

var taskList = document.querySelector('.taskList');
var task = document.querySelector('#task');
var submit = document.querySelector('button[type="submit"]');

submit.addEventListener('click', function() {
    var taskValue = task.value;
    addTaskToList(taskValue);
    saveTasksToLocalStorage();
});

function getCurrentDateString() {
    var currentDate = new Date();
    return currentDate.toLocaleDateString() + ' ' + currentDate.toLocaleTimeString();
}

function saveTasksToLocalStorage() {
    var tasks = [];
    document.querySelectorAll('.task-input').forEach(function(taskInput) {
        tasks.push(taskInput.value);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log('Saved to localStorage:', localStorage.getItem('tasks'));
}

function loadTasksFromLocalStorage() {
    var tasks = JSON.parse(localStorage.getItem('tasks'));
    console.log('Loaded from localStorage:', tasks);

    if (tasks) {
        tasks.forEach(function(taskText) {
            addTaskToList(taskText);
        });
    }
}

function addTaskToList(taskValue) {
    var taskItem = document.createElement('li');

    var taskInput = document.createElement('input');
    taskInput.type = 'text';
    taskInput.value = taskValue;
    taskInput.readOnly = true;
    taskInput.className = 'task-input';
    taskItem.appendChild(taskInput);

    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete';
    taskItem.appendChild(deleteButton);
    deleteButton.addEventListener('click', function() {
        taskList.removeChild(taskItem);
        saveTasksToLocalStorage();
    });

    var editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit';
    taskItem.appendChild(editButton);
    editButton.addEventListener('click', function() {
        if (taskInput.readOnly) {
            taskInput.readOnly = false;
            taskInput.focus();
        } else {
            taskInput.readOnly = true;
            dateElement.textContent = getCurrentDateString(); 
            saveTasksToLocalStorage();
        }
    });

    taskInput.addEventListener('blur', function() {
        taskInput.readOnly = true;
        dateElement.textContent = getCurrentDateString(); 
        saveTasksToLocalStorage();
    });

    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            taskInput.readOnly = true;
            taskInput.blur(); 
            dateElement.textContent = getCurrentDateString();
            saveTasksToLocalStorage();
        }
    });

    var dateElement = document.createElement('span');
    dateElement.textContent = getCurrentDateString();
    dateElement.className = 'task-date';
    taskItem.appendChild(dateElement);

    taskList.appendChild(taskItem);
    task.value = '';
    task.focus();
}
