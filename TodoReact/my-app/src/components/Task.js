import React from 'react';
import './style/Task.css';
import { format } from 'date-fns';



const Task = ({ taskData, onDelete, onEdit }) => {
    const handleDelete = () => {
      onDelete(taskData.id);
    };
  
    const handleEdit = () => {
      onEdit(taskData);
    };
    const formattedCreationDate = taskData.createdAt ? format(new Date(taskData.createdAt), 'dd/MM/yyyy HH:mm') : 'Date inconnue';
    const formattedModificationDate = taskData.lastModified ? format(new Date(taskData.lastModified), 'dd/MM/yyyy HH:mm') : 'Date inconnue';

    return (
        <li className={`taskItem ${taskData.completed ? 'completed' : 'uncompleted'}`}>
          {taskData.value}
          <div>
          <div>Créé le : {formattedCreationDate}</div>
          <div>Modifié le : {formattedModificationDate}</div>
            <button className="taskButton" onClick={handleEdit}>Edit</button>
            <button className="taskButton" onClick={handleDelete}>Delete</button>
          </div>
        </li>
      );
    };
    
    export default Task;
  