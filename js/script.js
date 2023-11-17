const user =["Select an user","Bilel","Briac","Adrien"];
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
<<<<<<< Updated upstream
    var localTasks = JSON.parse(localStorage.getItem('tasks')) || [];
=======
    var localTasks = JSON.parse(localStorage.getItem('tasks')) || []; // Charger les tâches depuis le local storage
>>>>>>> Stashed changes

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




<<<<<<< Updated upstream
var taskList = document.querySelector('.taskList');
var task = document.querySelector('#task');
var submit = document.querySelector('button[type="submit"]');
=======
var taskList = document.querySelector('.taskList'); // Sélectionner la liste de tâches
var task = document.querySelector('#task'); // Sélectionner la zone de texte
var submit = document.querySelector('button[type="submit"]'); // Sélectionner le bouton de soumission
>>>>>>> Stashed changes

submit.addEventListener('click', function() {
    var taskValue = task.value;
    addTaskToList(taskValue, false); // false pour non complétée par défaut
    saveTasksToLocalStorage();
    filterTasks(); // Appliquer le filtrage après l'ajout
});

<<<<<<< Updated upstream
function attachFilterEventHandlers() {
    document.getElementById('showCompleted').addEventListener('change', filterTasks);
    document.getElementById('showUncompleted').addEventListener('change', filterTasks);
=======
function attachFilterEventHandlers() { // Fonction pour attacher les gestionnaires d'événements aux cases à cocher
    document.getElementById('showCompleted').addEventListener('change', filterTasks); // Ajouter un gestionnaire d'événements pour le changement de la case à cocher
    document.getElementById('showUncompleted').addEventListener('change', filterTasks); // Ajouter un gestionnaire d'événements pour le changement de la case à cocher
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
            value: taskItem.querySelector('.task-input').value,
            completed: taskItem.classList.contains('completed'),
            assignedUser: assignedUser
=======
            value: taskItem.querySelector('.task-input').value, // Enregistrement de la valeur de la tâche
            completed: taskItem.classList.contains('completed'), // Enregistrement de l'état de la tâche
            assignedUser: assignedUser // Enregistrement de l'utilisateur assigné
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
=======
    var taskItem = document.createElement('li'); // Créer un élément de tâche
    taskItem.setAttribute('draggable', true); // Ajouter l'attribut draggable
    taskItem.className = completed ? 'completed' : 'uncompleted'; // Ajouter la classe CSS
    taskItem.id = taskId; // Ajouter l'ID de tâche
    taskItem.setAttribute('draggable', true); // Ajouter l'attribut draggable
    var taskInput = document.createElement('input'); // Créer un élément d'entrée
    taskInput.type = 'text'; // Ajouter le type de texte
    taskInput.value = taskValue; // Ajouter la valeur de la tâche
    taskInput.readOnly = true; // Ajouter l'attribut readonly
    taskInput.className = 'task-input'; // Ajouter la classe CSS
    taskItem.appendChild(taskInput); // Ajouter l'élément d'entrée à l'élément de tâche
    taskList.addEventListener('dragstart', function(event) { // Ajouter un gestionnaire d'événements pour le glisser-déposer
        event.dataTransfer.setData('text/plain', event.target.id); // Définir l'ID de l'élément glissé
        saveTasksToLocalStorage(); // Sauvegarder les tâches dans le local storage
>>>>>>> Stashed changes

    });
    

<<<<<<< Updated upstream
    taskList.addEventListener('dragover', function(event) {
        event.preventDefault();
        saveTasksToLocalStorage();

    });
    taskList.addEventListener('drop', function(event) {
        event.preventDefault();
        const id = event.dataTransfer.getData('text/plain');
        const draggableElement = document.getElementById(id);
=======
    taskList.addEventListener('dragover', function(event) { // Ajouter un gestionnaire d'événements pour le glisser-déposer
        event.preventDefault(); // Empêcher le comportement par défaut
        saveTasksToLocalStorage(); // Sauvegarder les tâches dans le local storage

    });
    taskList.addEventListener('drop', function(event) { // Ajouter un gestionnaire d'événements pour le glisser-déposer
        event.preventDefault(); // Empêcher le comportement par défaut
        const id = event.dataTransfer.getData('text/plain'); // Récupérer l'ID de l'élément glissé
        const draggableElement = document.getElementById(id); // Récupérer l'élément glissé
>>>>>>> Stashed changes
        const dropzone = event.target.closest('.taskList li'); // S'assurer que la zone de dépôt est un élément de tâche
        if (dropzone) {
            taskList.insertBefore(draggableElement, dropzone.nextSibling); // Insère avant l'élément suivant
<<<<<<< Updated upstream
            saveTasksToLocalStorage();
=======
            saveTasksToLocalStorage(); // Sauvegarder les tâches dans le local storage
>>>>>>> Stashed changes

        }

    });

<<<<<<< Updated upstream
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete';
    taskItem.appendChild(deleteButton);
    deleteButton.addEventListener('click', function() {
        taskList.removeChild(taskItem);
        saveTasksToLocalStorage();
=======
    var deleteButton = document.createElement('button'); // Créer un élément de bouton pour la suppression
    deleteButton.textContent = 'Delete'; // Ajouter le texte du bouton de suppression
    deleteButton.className = 'delete'; // Ajouter la classe CSS pour le bouton de suppression
    taskItem.appendChild(deleteButton);
    deleteButton.addEventListener('click', function() { // Ajouter un gestionnaire d'événements pour le clic sur le bouton de suppression
        taskList.removeChild(taskItem); // Supprimer l'élément de tâche
        saveTasksToLocalStorage(); // Sauvegarder les tâches dans le local storage

>>>>>>> Stashed changes
        console.log("delete item", taskItem)
        console.log("LocalStorage", localStorage['tasks'].length)
        console.log("LocalStorage", localStorage['tasks']) 


    });
<<<<<<< Updated upstream
    var editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit';
    taskItem.appendChild(editButton);
=======
    var editButton = document.createElement('button'); // Créer un élément de bouton pour l'édition
    editButton.textContent = 'Edit'; // Ajouter le texte du bouton d'édition
    editButton.className = 'edit'; // Ajouter la classe CSS pour le bouton d'édition
    taskItem.appendChild(editButton); // Ajouter le bouton d'édition à l'élément de tâche
>>>>>>> Stashed changes

    editButton.addEventListener('click', function() {
        modal.style.display = "block";
        editTitle.value = taskInput.value;
        editCompletedCheckbox.checked = taskItem.classList.contains('completed'); 
        currentEditTask = taskItem; 
    });
    taskList.appendChild(taskItem);

    task.value = ''; // Effacer la valeur de la zone de texte
    task.focus(); // Focus sur la zone de texte
    var userSelect = document.createElement('select'); // Créer un élément de sélection
    userSelect.className = 'user-select'; // Ajouter une classe
    user.forEach(userName => { // Ajouter les options
        var option = document.createElement('option'); // Créer un élément d'option
        option.value = userName; // Ajouter la valeur
        option.textContent = userName;
        userSelect.appendChild(option);
               
    });
    
<<<<<<< Updated upstream
    taskItem.appendChild(userSelect);
=======
    taskItem.appendChild(userSelect); // Ajouter l'élément de sélection à l'élément de tâche 
>>>>>>> Stashed changes
  
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
<<<<<<< Updated upstream
    if (assignedUser) {
        userSelect.value = assignedUser;
        taskItem.setAttribute('data-assigned-user', assignedUser);
=======
    if (assignedUser) { // Si l'utilisateur assigné est disponible 
        userSelect.value = assignedUser; // Définir l'utilisateur assigné comme valeur de la sélection
        taskItem.setAttribute('data-assigned-user', assignedUser); // Définir l'utilisateur assigné comme attribut de l'élément de tâche  
>>>>>>> Stashed changes

    }
}

<<<<<<< Updated upstream
function filterTasks() {
    var showCompleted = document.getElementById('showCompleted').checked;
    var showUncompleted = document.getElementById('showUncompleted').checked;
=======
function filterTasks() { // Fonction pour filtrer les tâches 
    var showCompleted = document.getElementById('showCompleted').checked; // Récupérer l'état de la case à cocher 
    var showUncompleted = document.getElementById('showUncompleted').checked; // Récupérer l'état de la case à cocher 
>>>>>>> Stashed changes

    var completedCount = 0;
    var uncompletedCount = 0;
    var undefinedCount = 0;

<<<<<<< Updated upstream
    document.querySelectorAll('.taskList li').forEach(task => {
        var isCompleted = task.classList.contains('completed');
        if (isCompleted && !showCompleted || !isCompleted && !showUncompleted) {
            task.style.display = 'none';
=======
    document.querySelectorAll('.taskList li').forEach(task => { // Parcourir les éléments de tâche 
        var isCompleted = task.classList.contains('completed'); // Vérifier si la tâche est complétée ou non  
        if (isCompleted && !showCompleted || !isCompleted && !showUncompleted) { // Si la tâche est complétée et que la case à cocher n'est pas cochée ou si la tâche n'est pas complétée et que la case à cocher n'est pas cochée 
            task.style.display = 'none'; // Masquer la tâche 
>>>>>>> Stashed changes
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




<<<<<<< Updated upstream
var modal = document.getElementById("editModal");
var span = document.getElementsByClassName("close")[0];
var saveButton = document.getElementById("saveTaskChanges");
var editTitle = document.getElementById("editTaskTitle");
var editContent = document.getElementById("editTaskContent");
var currentEditTask;
=======
var modal = document.getElementById("editModal"); // Récupérer le modal d'édition de tâche 
var span = document.getElementsByClassName("close")[0]; // Récupérer l'élément de fermeture du modal 
var saveButton = document.getElementById("saveTaskChanges"); // Récupérer le bouton de sauvegarde 
var editTitle = document.getElementById("editTaskTitle"); // Récupérer le titre de la tâche 
var editContent = document.getElementById("editTaskContent"); // Récupérer le contenu de la tâche
var currentEditTask; // Définir la tâche actuellement éditée  
>>>>>>> Stashed changes

span.onclick = function() {
    modal.style.display = "none";
};

<<<<<<< Updated upstream
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
=======
window.onclick = function(event) { // Ajouter un gestionnaire d'événements pour le clic sur l'élément de fermeture du modal 
    if (event.target == modal) { // Si l'élément de fermeture du modal est cliqué 
        modal.style.display = "none";// Masquer le modal d'édition de tâche 
>>>>>>> Stashed changes
    }
};
// recuperation des elements du modal
var editCompletedCheckbox = document.getElementById("editTaskCompleted"); 

// sauvagarde des modifications
<<<<<<< Updated upstream
saveButton.onclick = function() {
    currentEditTask.querySelector('.task-input').value = editTitle.value;
    if (editCompletedCheckbox.checked) {
        currentEditTask.classList.add('completed');
    } else {
        currentEditTask.classList.remove('completed');
    }
    modal.style.display = "none";
    saveTasksToLocalStorage();
=======
saveButton.onclick = function() { // Ajouter un gestionnaire d'événements pour le clic sur le bouton de sauvegarde 
    currentEditTask.querySelector('.task-input').value = editTitle.value; // Récupérer le titre de la tâche 
    if (editCompletedCheckbox.checked) { // Si la case à cocher est cochée 
        currentEditTask.classList.add('completed'); // Ajouter la classe CSS pour la tâche complétée 
    } else {
        currentEditTask.classList.remove('completed'); // Supprimer la classe CSS pour la tâche complétée 
    }
    modal.style.display = "none"; // Masquer le modal d'édition de tâche 
    saveTasksToLocalStorage(); // Sauvegarder les tâches dans le local storage 
>>>>>>> Stashed changes

   
};


searchButton.addEventListener('click', function() {
    filterTasksByTitle(searchInput.value.toLowerCase());
});

<<<<<<< Updated upstream
function filterTasksByTitle(searchText) {
    document.querySelectorAll('.taskList li').forEach(taskItem => {
        var taskTitle = taskItem.querySelector('.task-input').value.toLowerCase();
         //console.log(taskTitle);
        if (taskTitle.includes(searchText)) {
            taskItem.style.display = '';
        } else {
            taskItem.style.display = 'none';
=======
function filterTasksByTitle(searchText) { // Fonction pour filtrer les tâches par titre 
    document.querySelectorAll('.taskList li').forEach(taskItem => { // Parcourir les éléments de tâche 
        var taskTitle = taskItem.querySelector('.task-input').value.toLowerCase(); // Récupérer le titre de la tâche 
        //console.log(taskTitle);
        if (taskTitle.includes(searchText)) { // Si le titre de la tâche contient le texte de recherche
            taskItem.style.display = ''; // Afficher la tâche 
        } else {
            taskItem.style.display = 'none'; // Masquer la tâche 
>>>>>>> Stashed changes
        }
    });
}



