import React, {FC} from 'react'
import { Cell } from '../modules/Cell';
import { FigureName } from '../modules/figures/Figure';
import { Color } from '../modules/Color';

interface CellProps {
    cell: Cell,
    click: (cell: Cell) => void
    selected: boolean
    clicked: Cell
}

const CellComponent:FC<CellProps> = ({cell, click, selected, }) => {
    return (
        <div onClick={() => click(cell)} style={{backgroundColor: cell.available && cell.figure?.figureName !== FigureName.KING && cell.figure ? 'green' : ''}} className={['cell', cell.color, selected && cell.figure ? 'selected' : ''].join(' ')}>
            {cell.available && !cell.figure && <div className='available'></div>}

            {cell.blackQueen && cell.figure?.color !== Color.BLACK && <div className='cell__block_black'></div>}
            {cell.whiteQueen && cell.figure?.color !== Color.WHITE && <div className='cell__block_white'></div>}
            {cell.whiteBishop && cell.figure?.color !== Color.WHITE && <div className='cell__block_white'></div>}
            {cell.blackBishop && cell.figure?.color !== Color.BLACK && <div className='cell__block_black'></div>}
            {cell.blackRook && cell.figure?.color !== Color.BLACK && <div className='cell__block_black'></div>}
            {cell.whiteRook && cell.figure?.color !== Color.WHITE && <div className='cell__block_white'></div>}
            {cell.blackPawn && cell.figure?.color !== Color.BLACK  && <div className='cell__block_black'></div>}
            {cell.whitePawn && cell.figure?.color !== Color.WHITE && <div className='cell__block_white'></div>}
            {cell.blackKnight && cell.figure?.color !== Color.BLACK && cell.figure?.uniqValue === 3333 && <div className='cell__block_black'></div>}
            {cell.blackKnight && cell.figure?.color !== Color.BLACK && cell.figure?.uniqValue === 4444 && <div className='cell__block_black'></div>}
            {cell.whiteKnight && cell.figure?.color !== Color.WHITE && cell.figure?.uniqValue === 1111 &&  <div className='cell__block_white'></div>}
            {cell.whiteKnight && cell.figure?.color !== Color.WHITE && cell.figure?.uniqValue === 2222 &&  <div className='cell__block_white'></div>}
            
            {cell.figure?.logo && <img src={cell.figure?.logo} width={40} height={40} />}
        </div>
    )
} 
export default CellComponent;