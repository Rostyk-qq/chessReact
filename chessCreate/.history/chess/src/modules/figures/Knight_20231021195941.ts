import { Figure } from "./Figure"
import { Cell } from "../Cell"
import { Color } from "../Color"
import { FigureName } from "./Figure"

import knightWhite from '../../assets/white-knight.png'
import knightBlack from '../../assets/black-knight.png'

export class Knight extends Figure{
    constructor(color: Color, cell: Cell) {
        super(color, cell)
        this.logo = color === Color.WHITE ? knightWhite : knightBlack
        this.figureName = FigureName.KNIGHT
    }

    public canMove(target: Cell){
        if(!super.canMove(target)){
           return false 
        }   

        const dx = Math.abs(target.x - this.cell.x);
        const dy = Math.abs(target.y - this.cell.y);

        return (dx === 1 && dy === 2) || (dx === 2 && dy === 1) 
   }
   public canBlock(target: Cell){
        const dx = Math.abs(target.x - this.cell.x);
        const dy = Math.abs(target.y - this.cell.y);

        if(this.cell.figure?.color === Color.WHITE){
            if(this.cell.x === 1 && this.cell.y === 7){
                this.cell.x = target.x
                this.cell.y = target.y

                if((dx === 1 && dy === 2) || (dx === 2 && dy === 1)){
                    target.whiteKnight = true
                    return true
                }
                target.whiteKnight = false
            }
            if(this.cell.x === 1 && this.cell.y === 7){
                this.cell.x = target.x
                this.cell.y = target.y
                
                if((dx === 1 && dy === 2) || (dx === 2 && dy === 1)){
                    target.whiteKnight = true
                    return true
                }
                target.whiteKnight = false
            }
        }
        if(this.cell.figure?.color === Color.BLACK){
            if((dx === 1 && dy === 2) || (dx === 2 && dy === 1)){
                target.blackKnight = true
                return true
            }
            target.blackKnight = false
        }
    }
}