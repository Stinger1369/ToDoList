import React, { useState, useEffect } from 'react';
import Task from './Task';
import FilterOptions from './FilterOptions';
import AddTaskForm from './AddTaskForm';
import EditTaskModal from './EditTaskModal';
import SearchBar from './SearchBar';
import Modal from './Modal';

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FaMoon, FaSun } from 'react-icons/fa';



const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCompleted, setShowCompleted] = useState(true);
  const [showUncompleted, setShowUncompleted] = useState(true);
  

  const [theme, setTheme] = useState('light');
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    console.log(`Changement du thème en : ${newTheme}`); 
    setTheme(newTheme);
  };

  
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      fetchTasksFromAPI();
    }
  }, []);
 
  const fetchTasksFromAPI = () => {
    fetch('https://dummyjson.com/todos?limit=10&skip=10')
      .then(res => res.json())
      .then(data => {
        console.log("Données récupérées de l'API :", data.todos);
        const apiTasks = data.todos.map(apiTask => ({
          id: 'task-' + apiTask.id,
          value: apiTask.todo,
          completed: apiTask.completed,
          // Ajoutez ici les champs de date si disponibles dans l'API
        }));
        setTasks(apiTasks);
        saveTasksToLocalStorage(apiTasks);
      })
      .catch(err => console.error(err));
  };
  console.log(tasks);

  const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };




  
 const handleFilterChange = (filterOption) => {
    setFilter(filterOption);
  };
// console.log(tasks);
  const getFilteredTasks = () => {
    return tasks
      .filter(task => {
        if (!showCompleted && task.completed) return false;
        if (!showUncompleted && !task.completed) return false;
        return task.value.toLowerCase().includes(searchTerm.toLowerCase());
      });
  };


  const handleSearchTermChange = (term) => {
    setSearchTerm(term);
  };

  const handleAddTask = (taskValue) => {
    const newTask = {
      id: 'task-' + new Date().getTime(),
      value: taskValue,
      completed: false,
      createdAt: new Date().toISOString(), 
      lastModified: new Date().toISOString() 
    };
  

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);

    // Sauvegardez dans localStorage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };


  const handleEditTask = (task) => {
    setEditingTask(task); // Définir la tâche à éditer
  };
  const handleSaveTask = (editedTask) => {
    const updatedTasks = tasks.map(task => 
      task.id === editedTask.id ? { ...editedTask, lastModified: new Date().toISOString() } : task
    );
    setTasks(updatedTasks);
    setEditingTask(null); // Fermer le modal après la sauvegarde
  
    // Sauvegardez dans localStorage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };
  
  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  
    // Sauvegardez dans localStorage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleCloseModal = () => {
    setEditingTask(null);
  };
  return (
    <div>
     <button className='BasicButton' onClick={toggleTheme}>
      {theme === 'light' ? <FaMoon /> : <FaSun />}
     </button>
     {/* <button onClick={toggleTheme}>
      {theme === 'light' ? <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun} />}
     </button> */}
      <SearchBar onSearch={handleSearchTermChange} />
      <AddTaskForm onAddTask={handleAddTask} />
      <FilterOptions 
        onShowCompletedChange={setShowCompleted} 
        onShowUncompletedChange={setShowUncompleted}
        showCompleted={showCompleted}
        showUncompleted={showUncompleted} 
      />
      <ul className="taskList">
        {getFilteredTasks().map(task => (
          <Task 
            key={task.id} 
            taskData={task} 
            onDelete={handleDeleteTask}
            onEdit={handleEditTask} 
          />
        ))}
      </ul>

      {editingTask && (
      <Modal isOpen={editingTask !== null} onClose={handleCloseModal}>
        <EditTaskModal 
          task={editingTask} 
          onSave={handleSaveTask} 
          onClose={handleCloseModal} 
        />
      </Modal>
    )}
    </div>
  );
};

export default TaskList;