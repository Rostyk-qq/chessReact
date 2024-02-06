import React, {FC} from 'react'
import { Figure } from '../modules/figures/Figure';

interface ChangeFiguresProp {
    array: Array<Figure | null>
    pawn: Figure
}

const ChangeFigures:FC<ChangeFiguresProp> = ({array, pawn}) => {
    return (
        <div>
            {array.map(figuresForChange => (
                <div className='figure__for' ></div>
            ))}
        </div>
    )
}
export default ChangeFigures;