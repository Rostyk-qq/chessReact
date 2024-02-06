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
        if((this.cell.figure?.figureName === FigureName.ROOK && this.cell.figure?.color === Color.WHITE) && 
        (target.figure?.figureName === FigureName.KING && target.figure?.color === Color.WHITE)){
            if((this.cell.figure?.cell.y === 7 && target.figure?.cell.x === 0) 
                && (target.figure?.cell.y === 7 && this.cell.figure?.cell.x === 3)){
                    if(this.cell.clearToCastling(this.cell, target)){
                        const XY = {kingX: 1, rookX: 2}
                        setTimeout(() => {
                            target.Castling(this.cell, target, XY)  
                        }, 100)  
                        console.log('Works!');
                        
                    
                }
                if((this.cell.figure?.cell.y === 7 && this.cell.figure?.cell.x === 7) 
                && (target.figure?.cell.y === 7 && target.figure?.cell.x === 3)){
                    if(this.cell.clearToCastling(this.cell, target)){
                        const XY = {kingX: 6, rookX: 5}
                        setTimeout(() => {
                            target.biggerCastling(this.cell, target, XY)  
                        }, 100)  
                    } 
                }
        }
        if(this.cell.figure?.color === target.figure?.color){
            return false
        }
        return true
    }
    public PawnStart(target: Cell){

    }
}