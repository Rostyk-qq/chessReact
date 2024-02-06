import React, {useState, useEffect} from 'react';
import './App.css';
import { Board } from './modules/Board';

function App() {
  const [instance, setInstance] = useState<Board | null>(null)


  return (
    <div className="app">

    </div>
  );
}

export default App;
