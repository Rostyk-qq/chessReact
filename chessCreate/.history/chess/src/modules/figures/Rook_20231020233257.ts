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
        if(this.cell.figure?.color === Color.WHITE){
            if(this.cell.moveHorizontalKingDisabledWhite(target)){
                target.whiteRook = true
                return true
            }
            if(this.cell.moveVerticalKingDisabledWhite(target)){  
                target.whiteRook = true
                return true
            }
            target.whiteRook = false
            return false
        }

        if(this.cell.figure?.color === Color.BLACK){ 
            if(this.cell.moveHorizontalKingDisabledBlack(target)){
                target.blackBlock = true
                return true
            }
            if(this.cell.moveVerticalKingDisabledBlack(target)){  
                target.blackRook = true
                return true
            }
            target.blackRook= false
            return false
        }
    }
} 
