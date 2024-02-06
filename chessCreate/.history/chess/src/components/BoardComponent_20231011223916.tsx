import React,{FC, useState, useEffect} from 'react';
import { Board } from '../modules/Board';
import CellComponent from './CellComponent';
import { Cell } from '../modules/Cell';

interface BoardProps {
    board: Board
}

const BoardComponent:FC<BoardProps> = ({board}) => {
    const [clicked, setClicked] = useState<Cell | null>()

    const click = (cell: Cell) => {
        if(clicked && cell !== clicked && clicked.figure?.canMove(cell)){
            cell.moveFigure(clicked);
            setClicked(null)
        }
        else{
            setClicked(cell)
        }
    }
    useEffect(() => {

    }, [clicked])
    const refresh = () => {
         board.doRefreshFigures(clicked)
    } 
    const createNewInstance = () => {
        const newBoard = board.createNewInstance();
setClicked
    }
    return (
        <div className='board'>
            {board.cells.map((row, id) => 
                <React.Fragment key={id}>
                    {row.map(element => 
                        <CellComponent click={click} selected={element.x === clicked?.x && element.y === clicked?.y} key={element.id} cell={element} />
                    )}
                </React.Fragment>
            )}
        </div>
    )
}
export default BoardComponent