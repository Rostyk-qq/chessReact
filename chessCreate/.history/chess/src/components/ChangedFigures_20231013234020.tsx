import React, {FC} from 'react'
import { Figure, FigureName } from '../modules/figures/Figure';
import { Queen } from '../modules/figures/Queen';
import { Knight } from '../modules/figures/Knight';
import { Bishop } from '../modules/figures/Bishop';

interface ChangeFiguresProp {
    array: Array<Figure | null>
    pawn: Figure
}

const ChangeFigures:FC<ChangeFiguresProp> = ({array, pawn}) => {
    function getFigure(figure: Figure){
        if(figure.figureName === FigureName.QUEEN){
           const queen = new Queen(figure.color, figure.cell.board.getCell(figure.cell.y, figure.cell.x))
        }
        if(figure.figureName === FigureName.KNIGHT){
            const knight = new Knight(figure.color, figure.cell.board.getCell(figure.cell.y, figure.cell.x))
        }
        if(figure.figureName === FigureName.BISHOP){
            const bishop = new Bishop(figure.color, figure.cell.board.getCell(figure.cell.y, figure.cell.x))
        }
        if(figure.figureName === FigureName.QUEEN){
            const queen = new Queen(figure.color, figure.cell.board.getCell(figure.cell.y, figure.cell.x))
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