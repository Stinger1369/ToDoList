import React, { useState } from 'react';
import './style/AddTaskForm.css';

const AddTaskForm = ({ onAddTask }) => {
    const [newTask, setNewTask] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (newTask.trim() !== '') {
        onAddTask(newTask);
        setNewTask('');
      }
    };
  
    return (
        <form onSubmit={handleSubmit} className="addTaskForm">
          <input 
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
            className="addTaskInput"
          />
          <button type="submit" className="addTaskButton">Add Task</button>
        </form>
      );
    };
    
    export default AddTaskForm;
  
