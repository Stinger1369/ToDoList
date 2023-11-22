const user =["Select an User","Bilel","Briac","Adrien"];
function loadUsers() {
    user.forEach(userName => {
        //addTaskToList(userName, false); 
    });
}

//  Attendre que le DOM soit entièrement chargé avant d'exécuter le code
document.addEventListener('DOMContentLoaded', function() { // Ajouter un gestionnaire d'événements pour le chargement du DOM 
    loadTasksFromLocalStorage(); // Charger les tâches depuis le local storage 
    loadUsers(); // Charger les utilisateurs depuis le local storage
    if (!localStorage.getItem('tasks') || JSON.parse(localStorage.getItem('tasks')).length === 0) { // Si le local storage est vide ou s'il n'y a pas de tâches dans le local storage
        fetchTasksFromAPI(); // Récupérer les tâches depuis l'API 
    }
    attachFilterEventHandlers(); // Attacher les gestionnaires d'événements aux cases à cocher 
});

// Récupérer les tâches depuis l'API
// ici on a encapsulé le code de la fonction fetchTasksFromAPI() dans une fonction pour la rendre réutilisable est surtut pour la structurer, controle de l'exécution 
function fetchTasksFromAPI() { // Fonction de récupération des tâches depuis l'API
    // Charger d'abord les tâches depuis le local storage
    var localTasks = JSON.parse(localStorage.getItem('tasks')) || [];// Charger les tâches depuis le local storage

    fetch('https://dummyjson.com/todos?limit=30&skip=10') // Récupérer les tâches depuis l'API
        .then(res => res.json()) // Convertir la réponse en JSON
        .then(data => {
            data.todos.forEach(apiTask => { // Parcourir les tâches de l'API
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
        .catch(err => console.error(err)); // Afficher les erreurs dans la console 
}




var taskList = document.querySelector('.taskList'); // Sélectionner la liste de tâches
var task = document.querySelector('#task'); // Sélectionner la zone de texte
var submit = document.querySelector('button[type="submit"]');// Sélectionner le bouton de soumission

submit.addEventListener('click', function() { // Ajouter un gestionnaire d'événements pour le clic sur le bouton de soumission
    var taskValue = task.value; // Récupérer la valeur de la zone de texte
    addTaskToList(taskValue, false); // false pour non complétée par défaut
    saveTasksToLocalStorage(); // Sauvegarder les tâches dans le local storage
    filterTasks(); // Appliquer le filtrage après l'ajout
});

function attachFilterEventHandlers() { // Fonction pour attacher les gestionnaires d'événements aux cases à cocher
    document.getElementById('showCompleted').addEventListener('change', filterTasks); // Ajouter un gestionnaire d'événements pour le changement de la case à cocher
    document.getElementById('showUncompleted').addEventListener('change', filterTasks);// Ajouter un gestionnaire d'événements pour le changement de la case à cocher
}

function getCurrentDateString() { // Fonction pour obtenir la date actuelle
    var currentDate = new Date(); // Créer une nouvelle instance de date
    return currentDate.toLocaleDateString() + ' ' + currentDate.toLocaleTimeString(); // Retourner la date et l'heure actuelles
}



// Pour apprendre plus sur le local Storage et des autres encore voici :https://grafikart.fr/tutoriels/javascript-local-storage-2077
function saveTasksToLocalStorage() { // Fonction pour sauvegarder les tâches dans le local storage
    var tasks = [];
    document.querySelectorAll('.taskList li').forEach(function(taskItem) { // Parcourir les éléments de tâche
        var assignedUser = taskItem.getAttribute('data-assigned-user'); // Récupérer l'utilisateur assigné
        tasks.push({ 
            id: taskItem.id, // Enregistrement de l'ID de la tâche
            value: taskItem.querySelector('.task-input').value, // Enregistrement de la valeur de la tâche
            completed: taskItem.classList.contains('completed'),// Enregistrement de l'état de la tâche
            assignedUser: assignedUser // Enregistrement de l'utilisateur assigné
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Enregistrement des tâches dans le local storage
}

function loadTasksFromLocalStorage() { // Fonction pour charger les tâches depuis le local storage
    while (taskList.firstChild) { // Supprimer les éléments de tâche existants
        taskList.removeChild(taskList.firstChild); // Supprimer le premier élément de tâche
    }

    var tasks = JSON.parse(localStorage.getItem('tasks'));// Charger les tâches depuis le local storage
    if (tasks) {
        tasks.forEach(function(taskObj) { // Parcourir les tâches
            addTaskToList(taskObj.value, taskObj.completed, taskObj.assignedUser, taskObj.id); // Ajouter la tâche à la liste
        });
    }
}


function getUniqueTaskId() { // Fonction pour générer un ID unique (Idée du Adrian)
    return 'task-' + new Date().getTime(); // Générer un ID unique basé sur la date actuelle
}
function addTaskToList(taskValue, completed, assignedUser = null, taskId = null) { // Fonction pour ajouter une tâche à la liste
    if (!taskId) {
        taskId = getUniqueTaskId(); // Générer un nouvel ID uniquement si nécessaire
    }
    var taskItem = document.createElement('li'); // Créer un élément de tâche
    taskItem.setAttribute('draggable', true); // Ajouter l'attribut draggable
    taskItem.className = completed ? 'completed' : 'uncompleted';// Ajouter la classe CSS
    taskItem.id = taskId;  // Ajouter l'ID de tâche
    taskItem.setAttribute('draggable', true); // Ajouter l'attribut draggable
    var taskInput = document.createElement('input');// Créer un élément d'entrée
    taskInput.type = 'text';// Ajouter le type de texte
    taskInput.value = taskValue;// Ajouter la valeur de la tâche
    taskInput.readOnly = true;// Ajouter l'attribut readonly
    taskInput.className = 'task-input';// Ajouter la classe CSS
    taskItem.appendChild(taskInput);// Ajouter l'élément d'entrée à l'élément de tâche
    taskList.addEventListener('dragstart', function(event) {// Ajouter un gestionnaire d'événements pour le glisser-déposer
        event.dataTransfer.setData('text/plain', event.target.id);// Définir l'ID de l'élément glissé
        saveTasksToLocalStorage(); // Sauvegarder les tâches dans le local storage

    });
    

    taskList.addEventListener('dragover', function(event) { // Ajouter un gestionnaire d'événements pour le glisser-déposer
        event.preventDefault();// Empêcher le comportement par défaut
        saveTasksToLocalStorage();// Sauvegarder les tâches dans le local storage

    });
    taskList.addEventListener('drop', function(event) {// Ajouter un gestionnaire d'événements pour le glisser-déposer
        event.preventDefault();// Empêcher le comportement par défaut
        const id = event.dataTransfer.getData('text/plain');// Récupérer l'ID de l'élément glissé
        const draggableElement = document.getElementById(id);// Récupérer l'élément glissé
        const dropzone = event.target.closest('.taskList li'); // S'assurer que la zone de dépôt est un élément de tâche
        if (dropzone) { // Si la zone de dépôt est un élément de tâche
            taskList.insertBefore(draggableElement, dropzone.nextSibling); // Insère avant l'élément suivant
            saveTasksToLocalStorage();// Sauvegarder les tâches dans le local storage

        }

    });

    var deleteButton = document.createElement('button');// Créer un élément de bouton pour la suppression
    deleteButton.textContent = 'Delete'; // Ajouter le texte du bouton de suppression
    deleteButton.className = 'delete'; // Ajouter la classe CSS pour le bouton de suppression
    taskItem.appendChild(deleteButton);
    deleteButton.addEventListener('click', function() { // Ajouter un gestionnaire d'événements pour le clic sur le bouton de suppression
        taskList.removeChild(taskItem); // Supprimer l'élément de tâche
        saveTasksToLocalStorage();// Sauvegarder les tâches dans le local storage

        console.log("delete item", taskItem)
        console.log("LocalStorage", localStorage['tasks'].length)
        console.log("LocalStorage", localStorage['tasks']) 


    });
    var editButton = document.createElement('button');// Créer un élément de bouton pour l'édition
    editButton.textContent = 'Edit'; // Ajouter le texte du bouton d'édition
    editButton.className = 'edit'; // Ajouter la classe CSS pour le bouton d'édition
    taskItem.appendChild(editButton); // Ajouter le bouton d'édition à l'élément de tâche

    editButton.addEventListener('click', function() { // Ajouter un gestionnaire d'événements pour le clic sur le bouton d'édition
        modal.style.display = "block"; // Afficher le modal d'édition de tâche 
        editTitle.value = taskInput.value; // Pré-remplir le titre de la tâche dans le modal d'édition
        editCompletedCheckbox.checked = taskItem.classList.contains('completed'); // Pré-remplir l'état de la tâche dans le modal d'édition 
        currentEditTask = taskItem;  // Définir la tâche actuellement éditée 
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
    
    taskItem.appendChild(userSelect);// Ajouter l'élément de sélection à l'élément de tâche 
  
    var okButton = document.createElement('button'); // Créer un bouton OK pour valider la tâche 
    okButton.textContent = 'OK'; // Ajouter le texte du bouton OK 
    okButton.className = 'ok-button'; // Ajouter la classe CSS pour le bouton OK

    // Ajout du bouton OK à l'élément de tâche
    taskItem.appendChild(okButton); // Ajouter le bouton OK à l'élément de tâche 
    userSelect.addEventListener('change', function(event) { // Ajouter un gestionnaire d'événements pour le changement de sélection d'utilisateur
        var selectedUser = event.target.value; // Récupérer l'utilisateur sélectionné 
        taskItem.setAttribute('data-assigned-user', selectedUser); // Définir l'utilisateur sélectionné comme attribut de l'élément de tâche 
        console.log("Utilisateur sélectionné pour la tâche '" + taskValue + "': " + selectedUser); // Affichez l'utilisateur actuellement sélectionné

    });

    okButton.addEventListener('click', function() { // Ajouter un gestionnaire d'événements pour le clic sur le bouton OK
        var assignedUser = taskItem.getAttribute('data-assigned-user'); // Récupérer l'utilisateur assigné 
        console.log("Tâche '" + taskValue + "' validée et assignée à " + assignedUser); // Affichez le message lors du clic sur OK


        saveTasksToLocalStorage(); // Sauvegarder les tâches dans le local storage
    });

    // Restaurez l'utilisateur assigné si disponible
    if (assignedUser) { // Si l'utilisateur assigné est disponible 
        userSelect.value = assignedUser; // Définir l'utilisateur assigné comme valeur de la sélection
        taskItem.setAttribute('data-assigned-user', assignedUser); //   Définir l'utilisateur assigné comme attribut de l'élément de tâche  

    }
}

function filterTasks() { // Fonction pour filtrer les tâches 
    var showCompleted = document.getElementById('showCompleted').checked; // Récupérer l'état de la case à cocher 
    var showUncompleted = document.getElementById('showUncompleted').checked;// Récupérer l'état de la case à cocher 

    var completedCount = 0;
    var uncompletedCount = 0;
    var undefinedCount = 0;

    document.querySelectorAll('.taskList li').forEach(task => {// Parcourir les éléments de tâche 
        var isCompleted = task.classList.contains('completed');// Vérifier si la tâche est complétée ou non  
        if (isCompleted && !showCompleted || !isCompleted && !showUncompleted) { // Si la tâche est complétée et que la case à cocher n'est pas cochée ou si la tâche n'est pas complétée et que la case à cocher n'est pas cochée 
            task.style.display = 'none';// Masquer la tâche 
        } else {
            task.style.display = ''; // Afficher la tâche
        }

       
        if (isCompleted) { // Si la tâche est complétée 
            completedCount++; // Incrémenter le compteur de tâches complétées
        } else if (task.textContent.trim() === "") { // Si la tâche n'est pas définie
            undefinedCount++; // Incrémenter le compteur de tâches non définies
        } else {
            uncompletedCount++; // Incrémenter le compteur de tâches non complétées
        }
    });

    // Afficher les compteurs dans la console
    console.log("Tâches complétées:", completedCount);
    console.log("Tâches non complétées:", uncompletedCount);
    console.log("Tâches non définies:", undefinedCount);
}




var modal = document.getElementById("editModal"); // Récupérer le modal d'édition de tâche 
var span = document.getElementsByClassName("close")[0]; // Récupérer l'élément de fermeture du modal 
var saveButton = document.getElementById("saveTaskChanges"); // Récupérer le bouton de sauvegarde 
var editTitle = document.getElementById("editTaskTitle");// Récupérer le titre de la tâche 
var editContent = document.getElementById("editTaskContent");// Récupérer le contenu de la tâche
var currentEditTask; // Définir la tâche actuellement éditée  

span.onclick = function() { // Ajouter un gestionnaire d'événements pour le clic sur l'élément de fermeture du modal
    modal.style.display = "none"; // Masquer le modal d'édition de tâche 
};

window.onclick = function(event) {// Ajouter un gestionnaire d'événements pour le clic sur l'élément de fermeture du modal 
    if (event.target == modal) { // Si l'élément de fermeture du modal est cliqué 
        modal.style.display = "none";// Masquer le modal d'édition de tâche 
    }
};
// recuperation des elements du modal
var editCompletedCheckbox = document.getElementById("editTaskCompleted"); 

// sauvagarde des modifications
saveButton.onclick = function() { // Ajouter un gestionnaire d'événements pour le clic sur le bouton de sauvegarde 
    currentEditTask.querySelector('.task-input').value = editTitle.value;// Récupérer le titre de la tâche 
    if (editCompletedCheckbox.checked) { // Si la case à cocher est cochée 
        currentEditTask.classList.add('completed');// Ajouter la classe CSS pour la tâche complétée 
    } else {
        currentEditTask.classList.remove('completed');// Supprimer la classe CSS pour la tâche complétée 
    }
    modal.style.display = "none";// Masquer le modal d'édition de tâche 
    saveTasksToLocalStorage();// Sauvegarder les tâches dans le local storage 

   
};


searchButton.addEventListener('click', function() { // Ajouter un gestionnaire d'événements pour le clic sur le bouton de recherche 
    filterTasksByTitle(searchInput.value.toLowerCase()); // Filtrer les tâches par titre 
});

function filterTasksByTitle(searchText) { // Fonction pour filtrer les tâches par titre 
    document.querySelectorAll('.taskList li').forEach(taskItem => { // Parcourir les éléments de tâche 
        var taskTitle = taskItem.querySelector('.task-input').value.toLowerCase();// Récupérer le titre de la tâche 
         //console.log(taskTitle);
        if (taskTitle.includes(searchText)) { // Si le titre de la tâche contient le texte de recherche
            taskItem.style.display = ''; // Afficher la tâche 
        } else {
            taskItem.style.display = 'none';// Masquer la tâche 
        }
    });
}



// le code dans une presetation  n'est pas trpo conseiller