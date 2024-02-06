import React, {FC} from 'react'
import { Figure, FigureName } from '../modules/figures/Figure';
import { Queen } from '../modules/figures/Queen';

interface ChangeFiguresProp {
    array: Array<Figure | null>
    pawn: Figure
}

const ChangeFigures:FC<ChangeFiguresProp> = ({array, pawn}) => {
    function getFigure(figure: Figure){
        if(figure.figureName === FigureName.QUEEN){
           const q = new Queen(figure.color, figure.cell.board.getCell(figure.cell.y, figure.cell.x))
        }
    }
    return (
        <div className='figures__container'>
            {array.map(figuresForChange => (
                figuresForChange?.logo && <img onClick={() => getFigure(figuresForChange)} src={figuresForChange?.logo} />
            ))}
        </div>
    )
}
export default ChangeFigures;