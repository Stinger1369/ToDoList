import React from 'react';
import TaskList from './components/TaskList';
import './App.css';
import BarNav from './components/BarNav';


function App() {
  return (
    <div className="App">
      <BarNav />
      <h1>ToDo List</h1>
      <TaskList />
    </div>
  );
}

export default App;
