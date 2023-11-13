document.addEventListener('DOMContentLoaded', function() {
    loadTasksFromLocalStorage();
    fetchTasksFromAPI();
    attachFilterEventHandlers();
});

var taskList = document.querySelector('.taskList');
var task = document.querySelector('#task');
var submit = document.querySelector('button[type="submit"]');

submit.addEventListener('click', function() {
    var taskValue = task.value;
    addTaskToList(taskValue, false); // false pour non complétée par défaut
    saveTasksToLocalStorage();
    filterTasks(); // Appliquer le filtrage après l'ajout
});

function attachFilterEventHandlers() {
    document.getElementById('showCompleted').addEventListener('change', filterTasks);
    document.getElementById('showUncompleted').addEventListener('change', filterTasks);
}

function getCurrentDateString() {
    var currentDate = new Date();
    return currentDate.toLocaleDateString() + ' ' + currentDate.toLocaleTimeString();
}

function saveTasksToLocalStorage() {
    var tasks = [];
    document.querySelectorAll('.taskList li').forEach(function(taskItem) {
        tasks.push({ 
            value: taskItem.firstChild.value, 
            completed: taskItem.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    //console.log('Saved to localStorage:', localStorage.getItem('tasks'));
}

function loadTasksFromLocalStorage() {
    var tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(function(taskObj) {
            addTaskToList(taskObj.value, taskObj.completed);
        });
    }
    filterTasks(); // Appliquer le filtrage après le chargement
}

function addTaskToList(taskValue, completed) {
    var taskItem = document.createElement('li');
    taskItem.className = completed ? 'completed' : 'uncompleted';

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
        editCompletedCheckbox.checked = taskItem.classList.contains('completed'); 
        currentEditTask = taskItem; 
    });

    taskList.appendChild(taskItem);
    task.value = '';
    task.focus();
}

function filterTasks() {
    var showCompleted = document.getElementById('showCompleted').checked;
    var showUncompleted = document.getElementById('showUncompleted').checked;

    var completedCount = 0;
    var uncompletedCount = 0;
    var undefinedCount = 0;

    document.querySelectorAll('.taskList li').forEach(task => {
        var isCompleted = task.classList.contains('completed');
        if (isCompleted && !showCompleted || !isCompleted && !showUncompleted) {
            task.style.display = 'none';
        } else {
            task.style.display = '';
        }

       
        if (isCompleted) {
            completedCount++;
        } else if (task.textContent.trim() === "") { 
            undefinedCount++;
        } else {
            uncompletedCount++;
        }
    });

    // Afficher les compteurs dans la console
    console.log("Tâches complétées:", completedCount);
    console.log("Tâches non complétées:", uncompletedCount);
    console.log("Tâches non définies:", undefinedCount);
}
function fetchTasksFromAPI() {
    fetch('https://dummyjson.com/todos?limit=300&skip=0')
        .then(res => res.json())
        .then(data => {
            data.todos.forEach(task => {
                addTaskToList(task.todo, task.completed);
            });
            console.log('Loaded from API:', data);
        })
        .catch(err => console.error(err));
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

var editCompletedCheckbox = document.getElementById("editTaskCompleted"); 

// sauvagarde des modifications
saveButton.onclick = function() {
    currentEditTask.querySelector('.task-input').value = editTitle.value;
    if (editCompletedCheckbox.checked) {
        currentEditTask.classList.add('completed');
    } else {
        currentEditTask.classList.remove('completed');
    }
    modal.style.display = "none";
    saveTasksToLocalStorage();

    // Actualiser la page
    location.reload();
};