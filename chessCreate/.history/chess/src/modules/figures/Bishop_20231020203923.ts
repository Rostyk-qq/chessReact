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
    // public canBlock(target: Cell){
    //     if(this.cell.moveDiagonalKingDisabled(target)){
    //         if(target.figure?.color === Color.WHITE){
    //             target.blackBlock = true
    //         }
    //         if(target.figure?.color === Color.BLACK){
    //             target.whiteBlock = true
    //         }
    //     }
    // }    
}