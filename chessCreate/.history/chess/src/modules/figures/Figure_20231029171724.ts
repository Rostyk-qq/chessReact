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
            if(figureMain.figure?.figureName === FigureName.QUEEN || (target.figure?.figureName === FigureName.KING  &&  target.figure.color === Color.BLACK)){
                
                if(target.blockFigureMovementWhiteKingDiagonal(figureMain.figure?.cell, figureMain.king) ||
                target.blockFigureMovementWhiteKingVertical(figureMain.figure?.cell, figureMain.king) ||
                target.blockFigureMovementWhiteKingHorizontal(figureMain.figure?.cell, figureMain.king)){

                    const Diagonal = target.blockFigureMovementWhiteKingDiagonal(figureMain.figure?.cell, figureMain.king)
                    const Vertical = target.blockFigureMovementWhiteKingVertical(figureMain.figure?.cell, figureMain.king)
                    const Horizontal = target.blockFigureMovementWhiteKingHorizontal(figureMain.figure?.cell, figureMain.king)
                    
                    if(Diagonal){
                        if(Diagonal.bool){
                            Diagonal.cell.block = true
                            console.log(Diagonal);
                        }
                        target.block = false
                    }
                    if(Vertical){
                        if(Vertical.bool){
                            Vertical.cell.block = true
                            console.log(Vertical);
                        }
                        target.block = false
                    }
                    if(Horizontal){
                        if(Horizontal.bool){
                            Horizontal.cell.block = true
                            console.log(Horizontal);
                        }
                        target.block = false
                    }
                }
            }
            if(figureMain.figure?.figureName === FigureName.ROOK || (target.figure?.figureName === FigureName.KING  &&  target.figure.color === Color.BLACK)){
                if(target.blockFigureMovementWhiteKingVertical(figureMain.figure?.cell , figureMain.king) ||
                target.blockFigureMovementWhiteKingHorizontal(figureMain.figure?.cell , figureMain.king)){
                    const Vertical = target.blockFigureMovementWhiteKingVertical(figureMain.figure?.cell, figureMain.king)
                    const Horizontal = target.blockFigureMovementWhiteKingHorizontal(figureMain.figure?.cell, figureMain.king)

                    if(Vertical){
                        if(Vertical.bool){
                            Vertical.cell.block = true
                            console.log(Vertical);
                        }
                        target.block = false
                    }
                    if(Horizontal){
                        if(Horizontal.bool){
                            Horizontal.cell.block = true
                            console.log(Horizontal);
                        }
                        target.block = false
                    }
                }
            }
            if(figureMain?.figure?.figureName === FigureName.BISHOP || (target.figure?.figureName === FigureName.KING  &&  target.figure.color === Color.BLACK)){    
                let cell: Result            
                if(target.blockFigureMovementWhiteKingDiagonal(figureMain.figure?.cell , figureMain.king)){

                    cell = target.blockFigureMovementWhiteKingDiagonal(figureMain.figure?.cell, figureMain.king)!
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
        const dx = Math.abs(target.x - figureMainObj.king.x);
        const dy = Math.abs(target.y - figureMainObj.king.y);

        if (
        (cellForKill.cell.figure?.color === Color.BLACK) &&
        this.cell.figure?.color === Color.WHITE &&
        (this.cell.x === figureMainObj.king.x || this.cell.y === figureMainObj.king.y || dx === dy)
        ) {
            console.log('inside');
            
        return true;
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