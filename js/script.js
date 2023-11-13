var taskList = document.querySelector('.taskList');
var task = document.querySelector('#task');
var submit = document.querySelector('button[type="submit"]');

submit.addEventListener('click', function(){
    var taskValue = task.value;
    var taskItem = document.createElement('li');
    var taskItemText = document.createTextNode(taskValue);
    taskItem.appendChild(taskItemText);

    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete';
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);

    task.value = '';
    task.focus();

    deleteButton.addEventListener('click', function() {
        taskList.removeChild(taskItem);
    });
});
