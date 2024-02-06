import { Figure } from "./Figure"
import { Cell } from "../Cell"
import { Color } from "../Color"
import { FigureName } from "./Figure"

import rookWhite from '../../assets/white-rook.png'
import rookBlack from '../../assets/black-rook.png'

export class Rook extends Figure{
    constructor(color: Color, cell: Cell) {
        super(color, cell)
        this.logo = color === Color.WHITE ? rookWhite : rookBlack
        this.figureName = FigureName.ROOK
    }

    public canMove(target: Cell){
        if(!super.canMove(target)){
           return false 
        }   
        if(this.cell.moveVertical(target)){
            return true
        }
        if(this.cell.moveHorizontal(target)){
            return true
        }
        return false
   }

   public canBlock(target: Cell){
        if(this.cell.moveVerticalKingDisabled(target)){
            if(target.figure?.color === Color.WHITE){
                target.blackBlockBlock = true
                target.whiteBlock = false
            }
            if(target.figure?.color === Color.BLACK){
                target.blackBlock = true
            }
            return true
        }
        if(this.cell.moveHorizontalKingDisabled(target)){  
            if(target.figure?.color === Color.WHITE){
                target.blackBlock = true
                target.whiteBlock = false
            }
            if(target.figure?.color === Color.BLACK){
                target.whiteBlock = true
                target.blackBlock = false
            }
            return true
        }

        target.whiteBlock = false
        target.blackBlock = false
    } 
}