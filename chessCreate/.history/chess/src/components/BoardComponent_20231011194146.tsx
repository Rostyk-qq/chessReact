import React,{FC} from 'react';
import { Board } from '../modules/Board';
import CellComponent from './CellComponent';

interface BoardProps {
    board: Board
}

const BoardComponent:FC<BoardProps> = ({board}) => {
    return (
        <div className='board'>
            {board.cells.map((row) => 
                <React.Fragment key={id}>
                    {row.map(element => 
                        <React.Fragment >
                            <CellComponent cell={element} />
                        </React.Fragment>
                    )}
                </>    
            )}
        </div>
    )
}
export default BoardComponent