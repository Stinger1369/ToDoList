// Create a "close" button and append it to each list item
var addTask = document.querySelector('.addTask');
var taskList = document.querySelector('.taskList');
var task = document.querySelector('#task');
var submit = document.querySelector('button[type="submit"]');
var close = document.createElement('span');
var closeText = document.createTextNode('X');
close.appendChild(closeText);
close.classList.add('close');
addTask.appendChild(close);
submit.addEventListener('click', function(){
    var taskValue = task.value;
    var taskItem = document.createElement('li');
    var taskItemText = document.createTextNode(taskValue);
    taskItem.appendChild(taskItemText);
    taskList.appendChild(taskItem);
    task.value = '';
    task.focus();
    taskItem.appendChild(close);
    close.addEventListener('click', function(){
        taskList.removeChild(taskItem);
    })
})
// delete taskItem
var taskItem = document.querySelectorAll('li');
for(var i = 0; i < taskItem.length; i++){
    taskItem[i].addEventListener('click', function(){
        this.classList.toggle('checked');
    })
}


