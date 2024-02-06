import React, {useState, useEffect} from 'react';
import './App.css';
import { Board } from './modules/Board';
import BoardComponent from './components/BoardComponent';
import DeletedFigures from './components/DeleteFigures';
import { Player } from './modules/Player';

function App() {
  const [instance, setInstance] = useState<Board>(new Board())
  const [whiteColor, setWhiteColor] = useState<Player>()


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
      <div className='container__figures'>
          <DeletedFigures deletedFigures={instance.deletedBlackFigures} title={'Чорні фігури'} />
          <DeletedFigures deletedFigures={instance.deletedWhiteFigures} title={'Білі фігури'}/>
      </div>
    </div>
  );
}

export default App;
