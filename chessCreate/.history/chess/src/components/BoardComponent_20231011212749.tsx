import React,{FC, useState} from 'react';
import { Board } from '../modules/Board';
import CellComponent from './CellComponent';


interface BoardProps {
    board: Board
}

const BoardComponent:FC<BoardProps> = ({board}) => {
    const [clicked, setClicked] = useState<Cell>()
    const click = () => {

    }
    return (
        <div className='board'>
            {board.cells.map((row, id) => 
                <React.Fragment key={id}>
                    {row.map(element => 
                        <CellComponent key={element.id} cell={element} />
                    )}
                </React.Fragment>
            )}
        </div>
    )
}
export default BoardComponent