const user =["Chouse Use","Bilel","Briac","Adrien"];
function loadUsers() {
    user.forEach(userName => {
        //addTaskToList(userName, false); 
    });
}


document.addEventListener('DOMContentLoaded', function() {
    loadTasksFromLocalStorage();
    loadUsers(); 
    if (!localStorage.getItem('tasks') || JSON.parse(localStorage.getItem('tasks')).length === 0) {
        fetchTasksFromAPI();
    }
    attachFilterEventHandlers();
});

function fetchTasksFromAPI() {
    // Charger d'abord les tâches depuis le local storage
    var localTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    fetch('https://dummyjson.com/todos?limit=3&skip=10')
        .then(res => res.json())
        .then(data => {
            data.todos.forEach(apiTask => {
                // Construire l'ID de tâche basé sur l'ID de l'API
                var taskId = 'task-' + apiTask.id;

                // Vérifier si la tâche est déjà présente dans le local storage
                var taskExists = localTasks.some(localTask => localTask.id === taskId);

                if (!taskExists) {
                    // Ajouter la tâche si elle n'existe pas déjà
                    addTaskToList(apiTask.todo, apiTask.completed, null, taskId);
                }
            });
            console.log('Loaded from API:', data);
        })
        .catch(err => console.error(err));
}




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
        var assignedUser = taskItem.getAttribute('data-assigned-user');
        tasks.push({ 
            id: taskItem.id, // Enregistrement de l'ID de la tâche
            value: taskItem.querySelector('.task-input').value,
            completed: taskItem.classList.contains('completed'),
            assignedUser: assignedUser
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    var tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(function(taskObj) {
            addTaskToList(taskObj.value, taskObj.completed, taskObj.assignedUser, taskObj.id);
        });
    }
}
function getUniqueTaskId() {
    return 'task-' + new Date().getTime();
}
function addTaskToList(taskValue, completed, assignedUser = null, taskId = null) {
    if (!taskId) {
        taskId = getUniqueTaskId(); // Générer un nouvel ID uniquement si nécessaire
    }
    var taskItem = document.createElement('li');
    taskItem.setAttribute('draggable', true);
    taskItem.className = completed ? 'completed' : 'uncompleted';
    taskItem.id = taskId;
    taskItem.setAttribute('draggable', true);
    var taskInput = document.createElement('input');
    taskInput.type = 'text';
    taskInput.value = taskValue;
    taskInput.readOnly = true;
    taskInput.className = 'task-input';
    taskItem.appendChild(taskInput);
    taskList.addEventListener('dragstart', function(event) {
        event.dataTransfer.setData('text/plain', event.target.id);
        saveTasksToLocalStorage();

    });
    

    taskList.addEventListener('dragover', function(event) {
        event.preventDefault();
        saveTasksToLocalStorage();

    });
    taskList.addEventListener('drop', function(event) {
        event.preventDefault();
        const id = event.dataTransfer.getData('text/plain');
        const draggableElement = document.getElementById(id);
        const dropzone = event.target.closest('.taskList li'); // S'assurer que la zone de dépôt est un élément de tâche
        if (dropzone) {
            taskList.insertBefore(draggableElement, dropzone.nextSibling); // Insère avant l'élément suivant
            saveTasksToLocalStorage();

        }

    });

    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete';
    taskItem.appendChild(deleteButton);
    deleteButton.addEventListener('click', function() {
        taskList.removeChild(taskItem);
        saveTasksToLocalStorage();
        console.log("delete item", taskItem)
        console.log("LocalStorage", localStorage['tasks'].length)
        console.log("LocalStorage", localStorage['tasks']) 


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

    task.value = '';// Effacer la valeur de la zone de texte
    task.focus();// Focus sur la zone de texte
    var userSelect = document.createElement('select');// Créer un élément de sélection
    userSelect.className = 'user-select';// Ajouter une classe
    user.forEach(userName => {// Ajouter les options
        var option = document.createElement('option');// Créer un élément d'option
        option.value = userName;// Ajouter la valeur
        option.textContent = userName;
        userSelect.appendChild(option);
               
    });
    
    taskItem.appendChild(userSelect);
  
    var okButton = document.createElement('button');
    okButton.textContent = 'OK';
    okButton.className = 'ok-button';

    // Ajout du bouton OK à l'élément de tâche
    taskItem.appendChild(okButton);
    userSelect.addEventListener('change', function(event) {
        var selectedUser = event.target.value;
        taskItem.setAttribute('data-assigned-user', selectedUser); 
        console.log("Utilisateur sélectionné pour la tâche '" + taskValue + "': " + selectedUser); // Affichez l'utilisateur actuellement sélectionné

    });

    okButton.addEventListener('click', function() {
        var assignedUser = taskItem.getAttribute('data-assigned-user');
        console.log("Tâche '" + taskValue + "' validée et assignée à " + assignedUser); // Affichez le message lors du clic sur OK


        saveTasksToLocalStorage(); 
    });

    // Restaurez l'utilisateur assigné si disponible
    if (assignedUser) {
        userSelect.value = assignedUser;
        taskItem.setAttribute('data-assigned-user', assignedUser);

    }
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
// recuperation des elements du modal
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

    // Mise à jour de la liste de tâches sans recharger la page
    //loadTasksFromLocalStorage();
};


searchButton.addEventListener('click', function() {
    filterTasksByTitle(searchInput.value.toLowerCase());
});

function filterTasksByTitle(searchText) {
    document.querySelectorAll('.taskList li').forEach(taskItem => {
        var taskTitle = taskItem.querySelector('.task-input').value.toLowerCase();
         //console.log(taskTitle);
        if (taskTitle.includes(searchText)) {
            taskItem.style.display = '';
        } else {
            taskItem.style.display = 'none';
        }
    });
}



