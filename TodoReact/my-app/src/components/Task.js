import React from 'react';
import './style/Task.css';


const Task = ({ taskData, onDelete, onEdit }) => {
    const handleDelete = () => {
      onDelete(taskData.id);
    };
  
    const handleEdit = () => {
      onEdit(taskData);
    };
  
    return (
        <li className={`taskItem ${taskData.completed ? 'completed' : 'uncompleted'}`}>
          {taskData.value}
          <div>
            <button className="taskButton" onClick={handleEdit}>Edit</button>
            <button className="taskButton" onClick={handleDelete}>Delete</button>
          </div>
        </li>
      );
    };
    
    export default Task;
  