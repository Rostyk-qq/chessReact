import React, {useState, useEffect} from 'react';
import './App.css';
import { Board } from './modules/Board';
import BoardComponent from './components/BoardComponent';

function App() {
  const [instance, setInstance] = useState<Board | null>(null)

  function restart(){
    const board = new Board();
    board.initCells();
    setInstance(board);
  }

  useEffect(() => {
    restart()
  }, [])
  return (
    <div className="app">
      BoardComponent
    </div>
  );
}

export default App;
