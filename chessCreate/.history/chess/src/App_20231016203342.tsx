import React, {useState, useEffect} from 'react';
import './App.css';
import { Board } from './modules/Board';
import BoardComponent from './components/BoardComponent';
import DeletedFigures from './components/DeletedFigures';
import { Player } from './modules/Player';
import { Color } from './modules/Color';

function App() {
  const [instance, setInstance] = useState<Board>(new Board())
  const [whiteColor, setWhiteColor] = useState<Player>(new Player(Color.WHITE))
  const [blackColor, setBlackColor] = useState<Player>(new Player(Color.BLACK))
  const [currentColor, setCurrentColor] = useState<Player | null>(null)  

  function restart(){
    const board = new Board();
    board.initCells();
    board.initFigures();
    setInstance(board);
  }

  useEffect(() => {
    restart()
    setCurrentColor(whiteColor)
  }, [])

  function changeColor(){
      setCurrentColor(currentColor === whiteColor ? blackColor : whiteColor)
  }
  return (
    
  );
}

export default App;
