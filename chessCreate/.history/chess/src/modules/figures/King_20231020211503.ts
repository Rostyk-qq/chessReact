import { Figure } from "./Figure"
import { Cell } from "../Cell"
import { Color } from "../Color"
import { FigureName } from "./Figure"

import kingWhite from '../../assets/white-king.png'
import kingBlack from '../../assets/black-king.png'

export class King extends Figure{
    constructor(color: Color, cell: Cell) {
        super(color, cell)
        this.logo = color === Color.WHITE ? kingWhite : kingBlack
        this.figureName = FigureName.KING
    }

    public canMove(target: Cell){
        if(!super.canMove(target)){
           return false 
        }   
        const dx = Math.abs(target.x - this.cell.x)
        const dy = Math.abs(target.y - this.cell.y)

        if(this.cell.figure?.color === Color.WHITE){
            if(target.whiteBlock){
                if(dx === 1 && dy === 1){
                    return true
                }
                if(dx === 1 && dy === 0){
                    return true
                }
                if(dx === 0 && dy === 1){
                    return true
                }
                return false
            }
        }
        if(this.cell.figure?.color === Color.BLACK){
            if(target.blackBlock){
                if(dx === 1 && dy === 1){
                    return true
                }
                if(dx === 1 && dy === 0){
                    return true
                }
                if(dx === 0 && dy === 1){
                    return true
                }
                return false
            }
        }
   }
}