import { Cell } from "../Cell";
import { Color } from "../Color";
import logo from '../../assets/black-bishop.png'
enum FigureName {
    PAWN = 'пішак',
    KING = 'король',
    KNIGHT = 'кінь',
    QUEEN = 'король',
    BISHOP = 'офіцер',
}

export abstract class Figure{
    cell: Cell
    color: Color
    logo: typeof logo | null
    figureName: FigureName
    id: number
  
    constructor(color: Color, cell: Cell) {
        this.color = color
        this.cell = cell
        this.logo = null
        this.figureName = FigureName.BISHOP
        this.id = Math.random()
    }

    protected canMove(target: Cell){
        
    }
    public PawnStart()
}