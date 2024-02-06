import React, {FC} from 'react'
import { Cell } from '../modules/Cell';

interface CellProps {
    cell: Cell,
    click: (cell: Cell) => void
    selected: boolean
}

const CellComponent:FC<CellProps> = ({cell, click, selected}) => {
    return (
        <div onClick={e => click(cell)} className={['cell', cell.color].join(' ')}>
            {cell.figure?.logo && <img src={cell.figure?.logo} width={40} height={40} />}
        </div>
    )
} 
export default CellComponent;