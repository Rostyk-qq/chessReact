import { Figure } from "./Figure"
import { Cell } from "../Cell"
import { Color } from "../Color"
import { FigureName } from "./Figure"

import bishopWhite from '../../assets/white-bishop.png'
import bishopBlack from '../../assets/black-bishop.png'

export class Bishop extends Figure{
    constructor(color: Color, cell: Cell) {
        super(color, cell)
        this.logo = color === Color.WHITE ? bishopWhite : bishopBlack
        this.figureName = FigureName.BISHOP
    }

    public canMove(target: Cell){
         if(!super.canMove(target)){
            return false 
         }   
         if(!this.cell.moveDiagonal(target)){
            return false
         }
         return true
    }
    public canBlock(target: Cell){
            if(this.cell.figure?.color === Color.WHITE){
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
    
            if(this.cell.figure?.color === Color.BLACK){ 
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
}