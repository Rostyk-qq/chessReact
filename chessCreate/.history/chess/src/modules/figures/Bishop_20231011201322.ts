import { Figure } from "./Figure"

import bishopWhite from '../../assets/white-bishop.png'
import bishopBlack from '../../assets/black-bishop.png'

export class Bishop extends Figure{
    constructor(color: Color, cell: Cell) {
        
        this.color = color
        this.cell = cell
        this.logo = null
        this.figureName = FigureName.BISHOP
        this.id = Math.random()
    }

    public canMove(target: Cell){
        
    }
    public PawnStart(target: Cell){

    }
}