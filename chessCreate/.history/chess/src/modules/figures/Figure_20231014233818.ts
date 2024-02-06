import { Cell } from "../Cell";
import { Color } from "../Color";
import logo from '../../assets/black-bishop.png'

export enum FigureName {
    PAWN = 'пішак',
    KING = 'король',
    KNIGHT = 'кінь',
    QUEEN = 'королева',
    BISHOP = 'офіцер',
    ROOK = 'тура'
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
        this.cell.figure = this
        this.logo = null
        this.figureName = FigureName.BISHOP
        this.id = Math.random()
    }

    public canMove(target: Cell){
        if(this.cell.figure?.figureName === FigureName.ROOK
        && 
        (this.cell.figure?.color === Color.WHITE || this.cell.figure?.color === Color.BLACK) 
        &&
        ((this.cell.figure?.cell.y === 7 && this.cell.figure?.cell.x === 0) || (target.figure?.cell.y === 7 && target.figure?.cell.x === 7) || 
        (this.cell.figure?.cell.y === 0 && this.cell.figure?.cell.x === 0) || (target.figure?.cell.y === 0 && target.figure?.cell.x === 3) || 
        ((this.cell.y === 7 && this.cell.x === 7) && (target.y === 7 && target.x === 3)) ||  (this.cell.y === 0 && this.cell.x === 0) && (target.y === 7 && target.x === 3))
        && 
        target.figure?.figureName === FigureName.KING
        && 
        (target.figure?.color === Color.BLACK || target.figure?.color === Color.WHITE)
        ){
            return true
        }

        if(this.cell.figure?.color === target.figure?.color){
            return false
        }

        return true
    }
    public PawnStart(target: Cell){

    }
}