var taskList = document.querySelector('.taskList');
var task = document.querySelector('#task');
var submit = document.querySelector('button[type="submit"]');

submit.addEventListener('click', function() {
    var taskValue = task.value;
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

    var editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit';
    taskItem.appendChild(editButton);

    var dateElement = document.createElement('span');
    dateElement.textContent = getCurrentDateString();
    dateElement.className = 'task-date';
    taskItem.appendChild(dateElement);

    taskList.appendChild(taskItem);
    task.value = '';
    task.focus();

    deleteButton.addEventListener('click', function() {
        taskList.removeChild(taskItem);
    });

    editButton.addEventListener('click', function() {
        if (taskInput.readOnly) {
            taskInput.readOnly = false;
            taskInput.focus();
        } else {
            taskInput.readOnly = true;
            dateElement.textContent = getCurrentDateString(); 
        }
    });

    taskInput.addEventListener('blur', function() {
        taskInput.readOnly = true;
        dateElement.textContent = getCurrentDateString(); 
    });

    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            taskInput.readOnly = true;
            taskInput.blur(); 
            dateElement.textContent = getCurrentDateString();
        }
    });
});

function getCurrentDateString() {
    var currentDate = new Date();
    return currentDate.toLocaleDateString() + ' ' + currentDate.toLocaleTimeString();
}
