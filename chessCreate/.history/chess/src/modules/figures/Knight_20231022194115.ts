import { Figure } from "./Figure"
import { Cell } from "../Cell"
import { Color } from "../Color"
import { FigureName } from "./Figure"

import knightWhite from '../../assets/white-knight.png'
import knightBlack from '../../assets/black-knight.png'

export class Knight extends Figure{
    thisCell: Cell | null
    constructor(color: Color, cell: Cell) {
        super(color, cell)
        this.logo = color === Color.WHITE ? knightWhite : knightBlack
        this.figureName = FigureName.KNIGHT
        this.thisCell = null
    }

    public canMove(target: Cell){
        if(!super.canMove(target)){
           return false 
        }   
        this.thisCell = this.cell
        const dx = Math.abs(target.x - this.cell.x);
        const dy = Math.abs(target.y - this.cell.y);

        return (dx === 1 && dy === 2) || (dx === 2 && dy === 1) 
    }
        public canBlock(target: Cell){
            const dx = Math.abs(target.x - this.cell.x);
            const dy = Math.abs(target.y - this.cell.y);

            const stepOne = this.cell.figure?.color === Color.BLACK ? 1 : -1
            const stepTwo = this.cell.figure?.color === Color.BLACK ? 2 : -2

            console.log(this.thisCell?.x, this.cell.x);
            console.log(this.thisCell?.y, this.cell.y);
            
            if(this.cell.figure?.color === Color.WHITE){
                if((dx === 1 && dy === 2) || (dx === 2 && dy === 1)){
                    target.whiteKnight = true
                    return true
                }
                else if((this.cell.x === this.thisCell?.x! - stepTwo && this.cell.y === this.thisCell?.y! - stepOne) || 
                (this.cell.y === this.thisCell?.y! - stepOne || this.cell.y === this.thisCell?.y! - stepTwo)){
                    target.whiteKnight = false
                }
            }
        }
}