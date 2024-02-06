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
interface XY{
    x: number
    y: number
}

interface FigureBlock {
    figure: Figure | null
    king: XY
}

interface Result {
    cell: Cell,
    bool: boolean
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

    let cellForKill: Result = {cell: target, bool: false};
    let figureMainObj: FigureBlock = {figure: target.figure, king: {x: 0, y: 0}};

    if(target.board.arrayWhiteFiguresBlock.length){
        this.cell.board.arrayWhiteFiguresBlock.map(figureMain => {
            if(figureMain.figure?.figureName === FigureName.QUEEN && (target.figure?.figureName === FigureName.KING && target.figure?.color === Color.BLACK)){ 
             
                if(target.blockFigureMovementDiagonal(figureMain.figure?.cell, {x: target.x, y: target.y}) ||
                target.blockFigureMovementVertical(figureMain.figure?.cell, {x: target.x, y: target.y}) ||
                target.blockFigureMovementHorizontal(figureMain.figure?.cell, {x: target.x, y: target.y})){
                    
                    const Diagonal = target.blockFigureMovementDiagonal(figureMain.figure?.cell, {x: target.x, y: target.y})
                    const Vertical = target.blockFigureMovementVertical(figureMain.figure?.cell, {x: target.x, y: target.y})
                    const Horizontal = target.blockFigureMovementHorizontal(figureMain.figure?.cell, {x: target.x, y: target.y})
                    
                    if(Diagonal){
                        if(Diagonal.bool){
                            Diagonal.cell.block = true

                            cellForKill = Diagonal
                            figureMainObj = figureMain
                        }
                    }
                    if(Vertical){
                        if(Vertical.bool){
                            Vertical.cell.block = true

                            cellForKill = Vertical
                            figureMainObj = figureMain
                        }
                    }
                    if(Horizontal){
                        if((target.x !== figureMainObj.figure?.cell.x || !Horizontal.bool) && Horizontal){
                            Horizontal.cell.block = target.
                        }
                        if(Horizontal.bool){
                            Horizontal.cell.block = true

                            cellForKill = Horizontal
                            figureMainObj = figureMain
                        }
                    }
                }
            }

            if(figureMain.figure?.figureName === FigureName.ROOK && (target.figure?.figureName === FigureName.KING && target.figure?.color === Color.BLACK)){
                if(target.blockFigureMovementVertical(figureMain.figure?.cell , {x: this.cell.x, y: this.cell.y}) ||
                target.blockFigureMovementHorizontal(figureMain.figure?.cell , {x: this.cell.x, y: this.cell.y})){

                    const Vertical = target.blockFigureMovementVertical(figureMain.figure?.cell, {x: this.cell.x, y: this.cell.y})
                    const Horizontal = target.blockFigureMovementHorizontal(figureMain.figure?.cell, {x: this.cell.x, y: this.cell.y})

                    if(Vertical){
                        if(Vertical.bool){
                            Vertical.cell.block = true

                            cellForKill = Vertical
                            figureMainObj = figureMain
                        }
                        target.block = false
                    }
                    if(Horizontal){
                        if(Horizontal.bool){
                            Horizontal.cell.block = true

                            cellForKill = Horizontal
                            figureMainObj = figureMain
                        }
                        target.block = false
                    }
                  }
                }

                if(figureMain.figure?.figureName === FigureName.BISHOP && (target.figure?.figureName === FigureName.KING && target.figure?.color === Color.BLACK)){
                    if(target.blockFigureMovementDiagonal(figureMain.figure?.cell, figureMain.king)){
                        const cell = target.blockFigureMovementDiagonal(figureMain.figure?.cell, figureMain.king)!
                        if(cell.bool){
                            cell.cell.block = true

                            cellForKill = cell
                            figureMainObj = figureMain
                        }
                        target.block = false
                    }
                }
            })
        }
        if (figureMainObj && cellForKill) {
            if (cellForKill.cell.figure?.color === Color.BLACK && target.figure?.color === Color.WHITE && target.figure === figureMainObj.figure ) {
                return true;
            }
        }

    // if(target.board.arrayBlackFiguresBlock.length){
    //     this.cell.board.arrayBlackFiguresBlock.map(figureMain => {
    //         if(figureMain.figure?.figureName === FigureName.QUEEN || (target.figure?.figureName === FigureName.KING  &&  target.figure.color === Color.WHITE)){
                
    //             if(target.blockFigureMovementDiagonal(figureMain.figure?.cell, figureMain.king) ||
    //             target.blockFigureMovementVertical(figureMain.figure?.cell, figureMain.king) ||
    //             target.blockFigureMovementHorizontal(figureMain.figure?.cell, figureMain.king)){

    //                 const Diagonal = target.blockFigureMovementDiagonal(figureMain.figure?.cell, figureMain.king)
    //                 const Vertical = target.blockFigureMovementVertical(figureMain.figure?.cell, figureMain.king)
    //                 const Horizontal = target.blockFigureMovementHorizontal(figureMain.figure?.cell, figureMain.king)
                    
    //                 if(Diagonal){
    //                     if(Diagonal.bool){
    //                         Diagonal.cell.block = true

    //                         cellForKill = Diagonal
    //                         figureMainObj = figureMain
    //                     }
    //                     target.block = false
    //                 }
    //                 if(Vertical){
    //                     if(Vertical.bool){
    //                         Vertical.cell.block = true

    //                         cellForKill = Vertical
    //                         figureMainObj = figureMain
    //                     }
    //                     target.block = false
    //                 }
    //                 if(Horizontal){
    //                     if(Horizontal.bool){
    //                         Horizontal.cell.block = true

    //                         cellForKill = Horizontal
    //                         figureMainObj = figureMain
    //                     }
    //                     target.block = false
    //                 }
    //             }
    //         }
    //         if(figureMain.figure?.figureName === FigureName.ROOK || (target.figure?.figureName === FigureName.KING  &&  target.figure.color === Color.WHITE)){
    //             if(target.blockFigureMovementVertical(figureMain.figure?.cell , figureMain.king) ||
    //             target.blockFigureMovementHorizontal(figureMain.figure?.cell , figureMain.king)){
    //                 const Vertical = target.blockFigureMovementVertical(figureMain.figure?.cell, figureMain.king)
    //                 const Horizontal = target.blockFigureMovementHorizontalWhiteKing(figureMain.figure?.cell, figureMain.king)

    //                 if(Vertical){
    //                     if(Vertical.bool){
    //                         Vertical.cell.block = true

    //                         cellForKill = Vertical
    //                         figureMainObj = figureMain
    //                     }
    //                     target.block = false
    //                 }
    //                 if(Horizontal){
    //                     if(Horizontal.bool){
    //                         Horizontal.cell.block = true

    //                         cellForKill = Horizontal
    //                         figureMainObj = figureMain
    //                     }
    //                     target.block = false
    //                 }
    //             }
    //         }
    //         if(figureMain?.figure?.figureName === FigureName.BISHOP || (target.figure?.figureName === FigureName.KING  &&  target.figure.color === Color.WHITE)){    
    //             let cell: Result            
    //             if(target.blockFigureMovementDiagonalWhiteKing(figureMain.figure?.cell , figureMain.king)){

    //                 cell = target.blockFigureMovementDiagonalWhiteKing(figureMain.figure?.cell, figureMain.king)!
    //                 if(cell.bool){
    //                     cell.cell.block = true

    //                     cellForKill = cell
    //                     figureMainObj = figureMain
    //                 }
    //                 target.block = false
    //             }
    //         }
    //     })
        
    // }
    // if (figureMainObj && cellForKill) {
    //     if (cellForKill.cell.figure?.color === Color.WHITE && target.figure?.color === Color.BLACK && target.figure === figureMainObj.figure ) {
    //         return true;
    //     }
    // }

        


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

        if(this.cell.block){
            return false
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