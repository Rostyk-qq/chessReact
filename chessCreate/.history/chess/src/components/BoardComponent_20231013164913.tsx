import React,{FC, useState, useEffect} from 'react';
import { Board } from '../modules/Board';
import CellComponent from './CellComponent';
import { Cell } from '../modules/Cell';
import { Player } from '../modules/Player';
import { FigureName } from '../modules/figures/Figure';

interface BoardProps {
    board: Board,
    setBoard: (board: Board) => void
    change: () => void
    currentColor: Player | null
}

interface XY {
    x: number
    y: number
}

const BoardComponent:FC<BoardProps> = ({board, setBoard, change, currentColor}) => {
    const [clicked, setClicked] = useState<Cell | null>(null)
    const [whiteKing, setWhiteKing] = useState<XY>({x});

    const click = (cell: Cell) => {
        if(clicked && cell !== clicked && clicked.figure?.canMove(cell)){
            clicked.moveFigure(cell);

            if(cell.figure?.figureName === FigureName.KING){

            }

            setClicked(null)
            change()
        }
        else{
            if(currentColor?.color === cell.figure?.color){
                setClicked(cell)
            }
        }
    }
    useEffect(() => {
        refresh()
    }, [clicked])

    const refresh = () => {
         board.doRefreshFigures(clicked)
         createNewInstance()
    } 
    const createNewInstance = () => {
        const newBoard = board.createNewInstance();
        setBoard(newBoard)
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