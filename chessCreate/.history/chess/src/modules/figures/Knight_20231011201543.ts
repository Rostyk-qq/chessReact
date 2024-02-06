import { Figure } from "./Figure"
import { Cell } from "../Cell"
import { Color } from "../Color"
import { FigureName } from "./Figure"

import knightWhite from '../../assets/white-bishop.png'
import knightBlack from '../../assets/black-bishop.png'

export class Knight extends Figure{
    constructor(color: Color, cell: Cell) {
        super(color, cell)
        this.logo = color === Color.WHITE ? bishopWhite : bishopBlack
        this.figureName = FigureName.BISHOP
    }

    public canMove(target: Cell){
        
    }
}