import React, {FC} from 'react'
import { Figure } from '../modules/figures/Figure';

interface ChangeFiguresProp {
    array: Array<Figure | null>
    pawn: Figure
}

const ChangeFigures:FC<ChangeFiguresProp> = ({array, }) => {
    return (
        <h1>

        </h1>
    )
}
export default ChangeFigures;