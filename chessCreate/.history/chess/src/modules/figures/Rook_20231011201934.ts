import { Figure } from "./Figure"
import { Cell } from "../Cell"
import { Color } from "../Color"
import { FigureName } from "./Figure"

import rookWhite from '../../assets/white-rook.png'
import rookBlack from '../../assets/black-rook.png'

export class Queen extends Figure{
    constructor(color: Color, cell: Cell) {
        super(color, cell)
        this.logo = color === Color.WHITE ? rookWhite : rookBlack
        this.figureName = FigureName.ROOK
    }

    public canMove(target: Cell){
        
    }
}