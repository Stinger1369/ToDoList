
document.addEventListener('DOMContentLoaded', function() {
    loadTasksFromLocalStorage();
    fetchTasksFromAPI();
});

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

function fetchTasksFromAPI() {
    fetch('https://dummyjson.com/todos?limit=30&skip=10')
        .then(res => res.json())
        .then(data => {
            data.todos.forEach(task => {
                addTaskToList(task.todo);
            });
        })
        .catch(err => console.error(err));
}
// console.log('Loaded from localStorage:', tasks);


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
        modal.style.display = "block";
        editTitle.value = taskInput.value;
        editContent.value = ""; // Ajoutez le contenu de la tâche si disponible
        currentEditTask = taskInput;
    });

    taskList.appendChild(taskItem);
    task.value = '';
    task.focus();
}

var modal = document.getElementById("editModal");
var span = document.getElementsByClassName("close")[0];
var saveButton = document.getElementById("saveTaskChanges");
var editTitle = document.getElementById("editTaskTitle");
var editContent = document.getElementById("editTaskContent");
var currentEditTask;

span.onclick = function() {
    modal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

saveButton.onclick = function() {
    currentEditTask.value = editTitle.value;
    // Mettez à jour le contenu de la tâche si nécessaire
    modal.style.display = "none";
    saveTasksToLocalStorage();
};