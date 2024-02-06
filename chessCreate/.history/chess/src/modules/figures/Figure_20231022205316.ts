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
    castingAvailable: boolean | null
    uniqValue: number | null //// 1111, 2222, 3333, 4444

    constructor(color: Color, cell: Cell) {
        this.color = color
        this.cell = cell
        this.cell.figure = this
        this.logo = null
        this.castingAvailable = true
        this.figureName = FigureName.BISHOP
        this.id = Math.random()
        this.uniqValue = null
    }

    public canMove(target: Cell){
        if(this.castingAvailable && this.cell.figure?.figureName === FigureName.ROOK
        && 
        (this.cell.figure?.color === Color.WHITE || this.cell.figure?.color === Color.BLACK) 
        && 
        ((this.cell.y === 7 && this.cell.x === 0) || 
        (this.cell.y === 7 && this.cell.x === 7)  || 
        (this.cell.y === 0 && this.cell.x === 7) || 
        (this.cell.y === 0 && this.cell.x === 0) 
        && 
        ((target.y === 0 && target.x === 3) || 
        (target.y === 7 && target.x === 3)))
        &&
        target.figure?.figureName === FigureName.KING
        &&
        (target.figure?.color === Color.BLACK || target.figure?.color === Color.WHITE)
        ){
            setTimeout(() => {
                this.castingAvailable = false
            }, 100)
            return true
        }
        if((this.cell.figure?.figureName === FigureName.ROOK && target.figure?.figureName === FigureName.KING) && this.cell.figure?.color === target.figure?.color){
            return true
        }   

        if(this.cell.figure?.color === target.figure?.color){
            return false
        }

        if(target.figure?.figureName === FigureName.KING){
            return false
        }

        return true
    }
    public canBlock(target: Cell){

    }

    public PawnStart(target: Cell){

    }
}