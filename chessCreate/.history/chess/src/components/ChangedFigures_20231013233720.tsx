import React, {FC} from 'react'
import { Figure, FigureName } from '../modules/figures/Figure';

interface ChangeFiguresProp {
    array: Array<Figure | null>
    pawn: Figure
}

const ChangeFigures:FC<ChangeFiguresProp> = ({array, pawn}) => {
    function getFigure(figure: Figure){
        if(figure.figureName === FigureName.QUEEN){
            
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