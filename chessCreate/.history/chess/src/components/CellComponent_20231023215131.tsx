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

            {cell.blackQueen && cell.figure?.color !== Color.BLACK && <div className='cell__block_black'></div>}
            {cell.whiteQueen && cell.figure?.color !== Color.WHITE && <div className='cell__block_white'></div>}
            
            {cell.blackPawn && cell.figure?.color !== Color.BLACK  && <div className='cell__block_black'></div>}
            {cell.whitePawn && cell.figure?.color !== Color.WHITE && <div className='cell__block_white'></div>}

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

            this.whitePawn1 = false
            this.whitePawn2 = false
            this.whitePawn3 = false
            this.whitePawn4 = false
            this.whitePawn5 = false
            this.whitePawn6 = false
            this.whitePawn7 = false
            this.whitePawn8 = false

            this.blackPawn1 = false
            this.blackPawn2 = false
            this.blackPawn3 = false
            this.blackPawn4 = false
            this.blackPawn5 = false
            this.blackPawn6 = false
            this.blackPawn7 = false
            this.blackPawn8 = false

            {cell.whitePawn1 && cell.figure?.color !== Color.WHITE && <div className='cell__block_white'></div>}
            {cell.whitePawn2 && cell.figure?.color !== Color.WHITE && <div className='cell__block_white'></div>}
            {cell.whitePawn3 && cell.figure?.color !== Color.WHITE && <div className='cell__block_white'></div>}
            {cell.whitePawn4 && cell.figure?.color !== Color.WHITE && <div className='cell__block_white'></div>}
            {cell.whitePawn5 && cell.figure?.color !== Color.WHITE && <div className='cell__block_white'></div>}
            {cell.whitePawn6 && cell.figure?.color !== Color.WHITE && <div className='cell__block_white'></div>}
            {cell.whitePawn7 && cell.figure?.color !== Color.WHITE && <div className='cell__block_white'></div>}
            {cell.blackPawn8 && cell.figure?.color !== Color.WHITE && <div className='cell__block_white'></div>}

            {cell.whitePawn1 && cell.figure?.color !== Color.WHITE && <div className='cell__block_white'></div>}
            {cell.whitePawn2 && cell.figure?.color !== Color.WHITE && <div className='cell__block_white'></div>}
            {cell.whitePawn3 && cell.figure?.color !== Color.WHITE && <div className='cell__block_white'></div>}
            {cell.whitePawn4 && cell.figure?.color !== Color.WHITE && <div className='cell__block_white'></div>}
            {cell.whitePawn5 && cell.figure?.color !== Color.WHITE && <div className='cell__block_white'></div>}
            {cell.whitePawn6 && cell.figure?.color !== Color.WHITE && <div className='cell__block_white'></div>}
            {cell.whitePawn7 && cell.figure?.color !== Color.WHITE && <div className='cell__block_white'></div>}
            {cell.blackPawn8 && cell.figure?.color !== Color.WHITE && <div className='cell__block_white'></div>}
        </div>
    )
} 
export default CellComponent;