import React from 'react';
import TaskList from './components/TaskList';
import BarNav from './components/BarNav';
import withTheme from './components/withTheme';
import './App.css';

const App = ({ theme, toggleTheme }) => {
  return (
    <div className="App">
      <button className='HOCButon' onClick={toggleTheme}>
        {theme === 'light' ? '🌙 Mode Sombre' : '☀️ Mode Clair'}
      </button>
      <BarNav />
      <h1>ToDo List</h1>
      <TaskList />
    </div>
  );
}

export default withTheme(App); 
