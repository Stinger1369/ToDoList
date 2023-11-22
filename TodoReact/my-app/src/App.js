import React from 'react';
import TaskList from './components/TaskList';
import BarNav from './components/BarNav';
import withTheme from './components/withTheme';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Brightness7Icon from '@mui/icons-material/Brightness7'; 
import NightsStayIcon from '@mui/icons-material/NightsStay';


import Modal from './components/Modal';



const App = ({ theme, toggleTheme }) => {
  const muiTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  return (
    <ThemeProvider theme={muiTheme}>
      <div className="App">      
        <Button className='HOCButon' variant="contained" onClick={toggleTheme} startIcon={theme === 'light' ? <NightsStayIcon /> : <Brightness7Icon />}>
          {theme === 'light' ? 'Mode Sombre' : 'Mode Clair'}
        </Button>
        <BarNav />
        <h1>ToDo List</h1>
        <TaskList />
        <Modal />
      </div>
    </ThemeProvider>
  );
}

export default withTheme(App);
