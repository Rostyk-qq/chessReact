import React, {FC} from 'react'
import { Figure } from '../modules/figures/Figure';

interface ChangeFiguresProp {
    array: Array<Figure | null>
    pawn: Figure
}

const ChangeFigures:FC<ChangeFiguresProp> = ({array, pawn}) => {
    return (
        <div className='figures__container'>
            {array.map(figuresForChange => (
                {figuresForChange?.logo && <></>}
            ))}
        </div>
    )
}
export default ChangeFigures;