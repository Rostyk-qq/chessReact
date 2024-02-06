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
        // if(this.cell.moveVertical(target)){
        //     return true
        // }
        if(this.cell.moveDiagonal(target)){
            return true
        }
        // if(this.cell.moveHorizontal(target)){
        //     return true
        
        return false
   }
}