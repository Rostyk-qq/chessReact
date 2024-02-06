import { Figure } from "./Figure"
import 
import bishopWhite from '../../assets/white-bishop.png'
import bishopBlack from '../../assets/black-bishop.png'

export class Bishop extends Figure{
    constructor(color: Color, cell: Cell) {
        super(color, cell)
        this.logo = null
        this.figureName = FigureName.BISHOP
    }

    public canMove(target: Cell){
        
    }
    public PawnStart(target: Cell){

    }
}