import logo from './logo.svg';
import './App.css';
import GameComponent from './GameComponent';
import React, { useState, useEffect } from 'react';

function App() {
  const [parameter, setParameter] = useState(0);

  useEffect(() => {
    // Increment parameter every minute
    const intervalId = setInterval(() => {
      setParameter(prevParam => prevParam + 1);
    }, 60000); // 60000 ms = 1 minute

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  return (
    <GameComponent parameter={parameter % 2 == 0 ? "moon.ogg" : "zelda.ogg"}/> 
  );
}

export default App;
