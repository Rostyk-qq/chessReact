import React, {FC} from 'react'
import { Cell } from '../modules/Cell';
import { FigureName } from '../modules/figures/Figure';
import { Color } from '../modules/Color';

interface CellProps {
    cell: Cell,
    click: (cell: Cell) => void
    selected: boolean
}

const CellComponent:FC<CellProps> = ({cell, click, selected}) => {
    return (
        <div onClick={() => click(cell)} style={{backgroundColor: cell.available && cell.figure?.figureName !== FigureName.KING && cell.figure ? 'green' : ''}} className={['cell', cell.color, selected && cell.figure ? 'selected' : ''].join(' ')}>
            {cell.available && !cell.figure && <div className='available'></div>}
            {cell.figure?.logo && <img src={cell.figure?.logo} width={40} height={40} />}

            {cell.blackQueen && cell.figure?.color !== Color.BLACK && <div className='cell__block_black queenBlack'></div>}
            {cell.whiteQueen && cell.figure?.color !== Color.WHITE && <div className='cell__block_white queenW hite'></div>}

            {cell.blackKing && cell.figure?.color !== Color.BLACK  && <div className='cell__block_black'></div>}
            {cell.whiteKing && cell.figure?.color !== Color.WHITE && <div className='cell__block_white'></div>}

            {cell.whiteBishopLower && cell.figure?.color !== Color.WHITE && <div className='cell__block_white'></div>}
            {cell.blackBishopLower && cell.figure?.color !== Color.BLACK && <div className='cell__block_black'></div>}
            {cell.whiteBishopBigger && cell.figure?.color !== Color.WHITE && <div className='cell__block_white'></div>}
            {cell.blackBishopBigger && cell.figure?.color !== Color.BLACK && <div className='cell__block_black'></div>}

            {cell.whiteRookLower && cell.figure?.color !== Color.WHITE && <div className='cell__block_white'></div>}
            {cell.blackRookLower && cell.figure?.color !== Color.BLACK && <div className='cell__block_black'></div>}
            {cell.whiteRookBigger && cell.figure?.color !== Color.WHITE && <div className='cell__block_white'></div>}
            {cell.blackRookBigger && cell.figure?.color !== Color.BLACK && <div className='cell__block_black'></div>}

            {cell.whiteKnightLower && cell.figure?.color !== Color.WHITE && <div className='cell__block_white'></div>}
            {cell.whiteKnightBigger && cell.figure?.color !== Color.WHITE && <div className='cell__block_white'></div>}
            {cell.blackKnightLower && cell.figure?.color !== Color.BLACK && <div className='cell__block_black'></div>}
            {cell.blackKnightBigger && cell.figure?.color !== Color.BLACK && <div className='cell__block_black'></div>}

            {
                cell.whitePawn.map((pawnWhite, idx) => (
                    pawnWhite && <div key={idx}  className='cell__block_white'></div> 
                ))}
                {cell.blackPawn.map((pawnBlack, idx) => (
                    pawnBlack && <div key={idx} className='cell__block_black'></div> 
                ))
            }
        </div>
    )
} 
export default CellComponent;