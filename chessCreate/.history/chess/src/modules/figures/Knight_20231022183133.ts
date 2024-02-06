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

        const dx = Math.abs(target.x - this.cell.x);
        const dy = Math.abs(target.y - this.cell.y);

        return (dx === 1 && dy === 2) || (dx === 2 && dy === 1) 
   }
    public canBlock(target: Cell){
            if(this.cell.figure?.color === Color.WHITE){
                if(target.x === 1 && target.y === 7){
                    this.cell.BlockingKnightLowerWhite(target)
                }
                else if(target.x === 6 && target.y === 7){
                    this.cell.BlockingKnightHiderWhite(target)
                }
            }
            if(this.cell.figure?.color === Color.BLACK){
                if(target.x === 1 && target.y === 0){
                    this.cell.BlockingKnightLowerBlack(target)
                }
                if(target.x === 6 && target.y === 0){
                    this.cell.BlockingKnightHiderBlack(target)
                }
            }     

                // if((Math.abs(target.x - this.cell.x) === 1 && Math.abs(target.y - this.cell.y) === 2) || 
                // (Math.abs(target.x - this.cell.x) === 2 && Math.abs(target.y - this.cell.y) === 1)){
                //     target.whiteKnight = true
                //     return true
                // }
                // target.whiteKnight = false
    }
}