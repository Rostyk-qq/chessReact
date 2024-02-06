import React, {FC} from 'react'
import { Cell } from '../modules/Cell';
import { FigureName } from '../modules/figures/Figure';
import { Color } from '../modules/Color';

interface CellProps {
    cell: Cell,
    click: (cell: Cell) => void
    selected: boolean
    clicked: Cell | null
}

const CellComponent:FC<CellProps> = ({cell, click, selected, clicked}) => {
    return (
        <div onClick={() => click(cell)} style={{backgroundColor: cell.available && cell.figure?.figureName !== FigureName.KING && cell.figure ? 'green' : ''}} className={['cell', cell.color, selected && cell.figure ? 'selected' : ''].join(' ')}>
            {cell.available && !cell.figure && <div className='available'></div>}
            {cell.figure?.logo && <img src={cell.figure?.logo} width={40} height={40} />}


            {cell.blackQueen && cell.figure?.color !== Color.BLACK && <div className='cell__block_black'></div>}
            {cell.whiteQueen && cell.figure?.color !== Color.WHITE && <div className='cell__block_white'></div>}
            {cell.blackRook && cell.figure?.color !== Color.BLACK && <div className='cell__block_black'></div>}
            {cell.whiteRook && cell.figure?.color !== Color.WHITE && <div className='cell__block_white'></div>}
            {cell.blackPawn && cell.figure?.color !== Color.BLACK  && <div className='cell__block_black'></div>}
            {cell.whitePawn && cell.figure?.color !== Color.WHITE && <div className='cell__block_white'></div>}
            
            this.whiteRookLower = false
            this.blackRookLower = false
            this.whiteRookBigger = false
            this.blackRookBigger 
            {cell.whiteBishop && cell.figure?.color !== Color.WHITE && <div className='cell__block_white'></div>}
            {cell.blackBishop && cell.figure?.color !== Color.BLACK && <div className='cell__block_black'></div>}

            {cell.whiteKnightLower && cell.figure?.color !== Color.WHITE && <div className='cell__block_white'></div>}
            {cell.whiteKnightBigger && cell.figure?.color !== Color.WHITE && <div className='cell__block_white'></div>}
            {cell.blackKnightLower && cell.figure?.color !== Color.BLACK && <div className='cell__block_black'></div>}
            {cell.blackKnightBigger && cell.figure?.color !== Color.BLACK && <div className='cell__block_black'></div>}
        </div>
    )
} 
export default CellComponent;