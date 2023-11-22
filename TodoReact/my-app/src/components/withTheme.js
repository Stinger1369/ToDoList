import React, { useState, useEffect } from 'react';
import './style/dark.css';

const withTheme = (WrappedComponent) => {
  return (props) => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
      document.body.className = theme;
    }, [theme]);

    const toggleTheme = () => {
      setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return <WrappedComponent theme={theme} toggleTheme={toggleTheme} {...props} />;
  };
};

export default withTheme;
