import React,{FC} from 'react';
import { Board } from '../modules/Board';
import CellComponent from './CellComponent';

interface BoardProps {
    board: Board
}

const BoardComponent:FC<BoardProps> = ({board}) => {
    return (
        <div className='board'>
            {board.cells.map(row => 
                <>
                    {row.map(element => 
                        <React.Fragment key={element.id} >
                            <CellComponent/>
                        </React.Fragment>
                    )}
                </>    
            )}
        </div>
    )
}
export default BoardComponent