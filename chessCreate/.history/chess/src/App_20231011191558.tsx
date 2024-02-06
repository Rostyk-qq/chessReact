import React, {useState, useEffect} from 'react';
import './App.css';
import { Board } from './modules/Board';

function App() {
  const [instance, setInstance] = useState<Board | null>(null)

  function restart(){
    
  }

  return (
    <div className="app">

    </div>
  );
}

export default App;
