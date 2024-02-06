import React, {FC} from 'react'
import { Cell } from '../modules/Cell';
import { FigureName } from '../modules/figures/Figure';

interface CellProps {
    cell: Cell,
    click: (cell: Cell) => void
    selected: boolean
    clickedCell: Cell | null
}

const CellComponent:FC<CellProps> = ({cell, click, selected}) => {
    return (
        <div onClick={() => click(cell)} style={{backgroundColor: cell.available && cell.figure?.figureName !== FigureName.KING && cell.figure ? 'green' : ''}} className={['cell', cell.color, selected && cell.figure ? 'selected' : ''].join(' ')}>
            {cell.available && !cell.figure && <div className='available'></div>}
            {cell.blackBlock && <div className='cell__block_white'></div>}
            {cell.whiteBlock && <div className='cell__block_white'></div>}
            {cell.figure?.logo && <img src={cell.figure?.logo} width={40} height={40} />}
        </div>
    )
} 
export default CellComponent;