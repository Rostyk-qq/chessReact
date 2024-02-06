import React, {useState, useEffect} from 'react';
import './App.css';
import { Board } from './modules/Board';


function App() {
  const [instance, setInstance] = useState<Board | null>(null)

  function restart(){
    const board = new Board();
    board.initCells();
    setInstance(board);
  }

  return (
    <div className="app">
      Board
    </div>
  );
}

export default App;
