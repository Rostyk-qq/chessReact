import React,{FC} from 'react';
import { Board } from '../modules/Board';

interface BoardProps {
    board: Board
}

const BoardComponent:FC<BoardProps> = ({board}) => {
    return (
        <div className='board'>
            {board.cells.}
        </div>
    )
}
export default BoardComponent