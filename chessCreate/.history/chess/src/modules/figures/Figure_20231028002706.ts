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

    constructor(color: Color, cell: Cell, uniqValue: number | null ) {
        this.color = color
        this.cell = cell
        this.cell.figure = this
        this.logo = null
        this.castingAvailable = true
        this.figureName = FigureName.BISHOP
        this.id = Math.random()
        this.uniqValue = uniqValue
    }

    public canMove(target: Cell){

            if(this.cell.figure?.color === Color.WHITE){    

                        if(this.cell.figure?.figureName === FigureName.QUEEN){
                            if(this.cell.blockFigureMovementWhiteKingDiagonal(this.cell.figure.cell) ||
                            this.cell.blockFigureMovementWhiteKingVertical(this.cell.figure.cell) ||
                            this.cell.blockFigureMovementWhiteKingHorizontal(this.cell.figure.cell)){
                                target.whiteQueen = false
                                return true
                            }
                        }
                        if(this.cell.figure?.figureName === FigureName.BISHOP){
                            if(target.blockFigureMovementWhiteKingDiagonal(this.cell.figure.cell) ){
                                if(this.cell.figure.uniqValue === 1100){
                                    target.whiteBishopLower = false
                                }
                                if(this.cell.figure.uniqValue === 1200){
                                    target.whiteBishopBigger = false
                                }
                                return true
                            }
                        }
                        if(figureMain.figure?.figureName === FigureName.ROOK){
                            if(target.blockFigureMovementWhiteKingVertical(figureMain.figure.cell, figureMain.king) ||
                            target.blockFigureMovementWhiteKingHorizontal(figureMain.figure.cell, figureMain.king)){
                                if(figureMain.figure.uniqValue === 7777){
                                    target.whiteRookLower = false
                                }
                                if(figureMain.figure.uniqValue === 8888){
                                    target.whiteRookBigger = false
                                }
                                return true
                            }
                        }
                    })
                }

            }

        
        if(this.cell.board.arrayBlackFiguresKingMovement.length){
            this.cell.board.arrayBlackFiguresKingMovement.map(figure => {
                if(figure?.figureName === FigureName.QUEEN){
                    if(target.kingMovementBlackDiagonal(figure.cell) ||
                    target.kingMovementBlackVertical(figure.cell) ||
                    target.kingMovementBlackHorizontal(figure.cell)){
                        target.blackQueen = false
                        return true
                    }
                }
                if(figure?.figureName === FigureName.BISHOP){
                    if(target.kingMovementBlackDiagonal(figure.cell)){
                        if(figure.uniqValue === 1100){
                            target.blackBishopLower = false
                        }
                        if(figure.uniqValue === 1200){
                            target.blackBishopBigger = false
                        }
                        return true
                    }
                }
                if(figure?.figureName === FigureName.ROOK){
                    if(target.kingMovementBlackVertical(figure.cell) || target.kingMovementBlackHorizontal(figure.cell)){
                        if(figure.uniqValue === 7777){
                            target.blackRookLower = false
                        }
                        if(figure.uniqValue === 8888){
                            target.blackRookBigger = false
                        }
                        return true
                    }
                }
            }) 
        }


        if(this.cell.board.arrayWhiteFiguresKingMovement.length){
            this.cell.board.arrayWhiteFiguresKingMovement.map(figure => {
                if(figure?.figureName === FigureName.QUEEN){
                    if(target.kingMovementWhiteDiagonal(figure.cell) 
                    || target.kingMovementWhiteVertical(figure.cell) 
                    || target.kingMovementWhiteHorizontal(figure.cell)){
                        target.whiteQueen = false
                    }                        
                    return true
                }
                if(figure?.figureName === FigureName.BISHOP){
                    if(target.kingMovementWhiteDiagonal(figure.cell)) {
                        if(figure.uniqValue === 9999){
                            target.whiteBishopLower = false
                        }
                        if(figure.uniqValue === 1000){
                            target.whiteBishopBigger = false
                        }
                        return true
                    }
                }
                if(figure?.figureName === FigureName.ROOK){
                    if(target.kingMovementWhiteVertical(figure.cell) 
                    || target.kingMovementWhiteHorizontal(figure.cell)){
                        if(figure.uniqValue === 5555){
                            target.whiteRookLower = false
                        }
                        if(figure.uniqValue === 6666){
                            target.whiteRookBigger = false
                        }
                        return true
                    }
                }
            }) 
        }


        if(this.castingAvailable && this?.figureName === FigureName.ROOK
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