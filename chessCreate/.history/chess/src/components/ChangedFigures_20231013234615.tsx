import React, {FC} from 'react'
import { Figure, FigureName } from '../modules/figures/Figure';
import { Queen } from '../modules/figures/Queen';
import { Knight } from '../modules/figures/Knight';
import { Bishop } from '../modules/figures/Bishop';
import { Rook } from '../modules/figures/Rook';
import { Board } from '../modules/Board';

interface ChangeFiguresProp {
    array: Array<Figure | null>
    pawn: Figure
    board: Board 
    setPawn: (pawn: Figure) => void
}

const ChangeFigures:FC<ChangeFiguresProp> = ({array, pawn, setPawn, board}) => {
    function getFigure(figure: Figure){
        if(figure.figureName === FigureName.QUEEN){
           const queen = new Queen(figure.color, board.getCell(figure.cell.y, figure.cell.x))
           pawn = queen
        }
        if(figure.figureName === FigureName.KNIGHT){
            const knight = new Knight(figure.color, board.getCell(figure.cell.y, figure.cell.x))
        }
        if(figure.figureName === FigureName.BISHOP){
            const bishop = new Bishop(figure.color, board.getCell(figure.cell.y, figure.cell.x))
        }
        if(figure.figureName === FigureName.ROOK){
            const rook = new Rook(figure.color, board.getCell(figure.cell.y, figure.cell.x))
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