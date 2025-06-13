import React, { useState, useEffect } from 'react';
import './App.css';
import Game from './components/Game';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Persist dark mode preference
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  return (
    <div className="App">
      <button
        onClick={() => setDarkMode((prev) => !prev)}
        style={{ margin: '1rem' }}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <h1>Tic-Tac-Toe Game</h1>
      <Game />
    </div>
  );
}

export default App;
