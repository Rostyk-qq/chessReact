import { Figure } from "./Figure"
import { Cell } from "../Cell"
import { Color } from "../Color"
import { FigureName } from "./Figure"

import queenWhite from '../../assets/white-queen.png'
import queenBlack from '../../assets/black-queen.png'

export class Queen extends Figure{
    constructor(color: Color, cell: Cell) {
        super(color, cell)
        this.logo = color === Color.WHITE ? queenWhite : queenBlack
        this.figureName = FigureName.QUEEN
    }

    public canMove(target: Cell){
        if(!super.canMove(target)){
           return false 
        }   
        if(this.cell.moveVertical(target)){
            return true
        }
        if(this.cell.moveDiagonal(target)){
            return true
        }
        if(this.cell.moveHorizontal(target)){   
            return true
        }

        return false
   }
    public canBlock(target: Cell){
        if(this.cell.figure?.color === Color.WHITE && this.cell.figure?.figureName === FigureName.QUEEN){
            if(this.cell.moveDiagonalKingDisabledWhite(target)){
                target.whiteBlock = true
                return true
            }
            if(this.cell.moveHorizontalKingDisabledWhite(target)){
                target.whiteBlock = true
                return true
            }
            if(this.cell.moveVerticalKingDisabledWhite(target)){  
                target.whiteBlock = true
                return true
            }
            target.whiteBlock = false
            return false
        }

        if(this.cell.figure?.color === Color.BLACK && this.cell.figure?.figureName === FigureName.QUEEN){ 
            if(this.cell.moveDiagonalKingDisabledBlack(target)){
                target.blackBlock = true
                return true
            }
            if(this.cell.moveHorizontalKingDisabledBlack(target)){
                target.blackBlock = true
                return true
            }
            if(this.cell.moveVerticalKingDisabledBlack(target)){  
                target.blackBlock = true
                return true
            }
            target.blackBlock = false
            return false
        }
    }
}
