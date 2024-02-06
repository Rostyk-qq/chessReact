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
        
        if((dx === 1 && dy === 2) || (dx === 2 && dy === 1)){
            if(this.cell.figure?.color === Color.WHITE){
                target.whiteKnight = true
                if(target.blackKnight ){
                    target.blackKnight = false
                }
            }
            if(this.cell.figure?.color === Color.BLACK){
                target.blackKnight = true
                if(target.blackKnight ){
                    target.blackKnight = false
                }
            }
        }
    }
}