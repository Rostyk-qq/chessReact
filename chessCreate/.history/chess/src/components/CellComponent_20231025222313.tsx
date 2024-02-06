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

            {cell.figure?.blackQueen && cell.figure?.color !== Color.BLACK && <div className='cell__block_black_queen'></div>}
            {cell.figure?.whiteQueen && cell.figure?.color !== Color.WHITE && <div className='cell__block_white'></div>}

            {cell.figure?.blackKing && cell.figure?.color !== Color.BLACK  && <div className='cell__block_black'></div>}
            {cell.figure?.whiteKing && cell.figure?.color !== Color.WHITE && <div className='cell__block_white'></div>}

            {cell.figure?.whiteBishopLower && cell.figure?.color !== Color.WHITE && <div className='cell__block_white'></div>}
            {cell.figure?.blackBishopLower && cell.figure?.color !== Color.BLACK && <div className='cell__block_black'></div>}
            {cell.figure?.whiteBishopBigger && cell.figure?.color !== Color.WHITE && <div className='cell__block_white'></div>}
            {cell.figure?.blackBishopBigger && cell.figure?.color !== Color.BLACK && <div className='cell__block_black'></div>}

            {cell.figure?.whiteRookLower && cell.figure?.color !== Color.WHITE && <div className='cell__block_white'></div>}
            {cell.figure?.blackRookLower && cell.figure?.color !== Color.BLACK && <div className='cell__block_black'></div>}
            {cell.figure?.whiteRookBigger && cell.figure?.color !== Color.WHITE && <div className='cell__block_white'></div>}
            {cell.figure?.blackRookBigger && cell.figure?.color !== Color.BLACK && <div className='cell__block_black'></div>}

            {cell.figure?.whiteKnightLower && cell.figure?.color !== Color.WHITE && <div className='cell__block_white'></div>}
            {cell.whiteKnightBigger && cell.figure?.color !== Color.WHITE && <div className='cell__block_white'></div>}
            {cell.figure?.blackKnightLower && cell.figure?.color !== Color.BLACK && <div className='cell__block_black'></div>}
            {cell.figure?.blackKnightBigger && cell.figure?.color !== Color.BLACK && <div className='cell__block_black'></div>}

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