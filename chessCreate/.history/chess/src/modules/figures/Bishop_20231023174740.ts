import { Figure } from "./Figure"
import { Cell } from "../Cell"
import { Color } from "../Color"
import { FigureName } from "./Figure"

import bishopWhite from '../../assets/white-bishop.png'
import bishopBlack from '../../assets/black-bishop.png'

export class Bishop extends Figure{
    constructor(color: Color, cell: Cell, uniqValue: number | null) {
        super(color, cell, uniqValue)
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
                if(this.uniqValue === 9999){
                    if(this.cell.moveDiagonalKingDisabledWhite(target)){
                    target.whiteBishopLower = true
                    return true
                    }
            }
        }
    
            if(this.cell.figure?.color === Color.BLACK){ 
                if(this.cell.moveDiagonalKingDisabledBlack(target)){
                    target.blackBishop = true
                    return true
                }
                target.blackBishop = false
                return false
            }
        }
    }    
