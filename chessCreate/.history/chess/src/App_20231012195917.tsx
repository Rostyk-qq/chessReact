import React, {useState, useEffect} from 'react';
import './App.css';
import { Board } from './modules/Board';
import BoardComponent from './components/BoardComponent';
import DeletedFigures from './components/DeleteFigures';

function App() {
  const [instance, setInstance] = useState<Board>(new Board())

  function restart(){
    const board = new Board();
    board.initCells();
    board.initFigures();
    setInstance(board);
  }

  useEffect(() => {
    restart()
  }, [])

  return (
    <div className="app">
      <BoardComponent board={instance} setBoard={setInstance} />
      </>
    </div>
  );
}

export default App;
