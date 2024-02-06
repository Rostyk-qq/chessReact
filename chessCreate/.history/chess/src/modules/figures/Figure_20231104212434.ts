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

    if(this.cell.figure?.figureName === FigureName.KING && this.cell.figure.color === Color.BLACK){
        if(target.figure?.color === Color.WHITE && (target.whiteBishopBigger || target.whiteBishopLower || 
            target.whiteKnightBigger || target.whiteKnightLower || 
            target.whiteRookBigger || target.whiteRookLower || 
            target.whiteQueen || target.whiteKing)){
                return false
        }
        for (let i = 0; i < target.whitePawn.length; i++) {
            if(target.figure?.color === Color.WHITE && target.whitePawn[i]){
                return false  
            }
        }
    }

    if(this.cell.figure?.figureName === FigureName.KING && this.cell.figure.color === Color.WHITE){
        if(target.figure?.color === Color.BLACK && (target.blackBishopBigger || target.blackBishopLower || 
            target.blackKnightBigger|| target.blackKnightLower || 
            target.blackRookBigger || target.blackRookLower || 
            target.blackQueen || target.blackKing)){
                return false
        }
        for (let i = 0; i < target.whitePawn.length; i++) {
            if(target.figure?.color === Color.BLACK && target.blackPawn[i]){
                return false  
            }
        }
    }
    

    let cellForKill: Result = {cell: target, bool: false};
    let figureMainObj: FigureBlock = {figure: this.cell.figure, king: {x: 0, y: 0}};
    
    let kingBlack: XY = {x: 3, y: 0};
    let kingWhite: XY = {x: 3, y: 7};

    if(target.board.arrayWhiteFiguresBlock.length){
        this.cell.board.arrayWhiteFiguresBlock.map(figureMain => {
            
            if(target.figure?.figureName === FigureName.KING && target.figure.color === Color.BLACK){
                kingBlack = {x: target.x, y: target.y}
            }

            if(figureMain.figure?.figureName === FigureName.QUEEN || this.cell){ 

                if(target.blockFigureMovementDiagonal(figureMain.figure?.cell, kingBlack) ||
                target.blockFigureMovementVertical(figureMain.figure?.cell, kingBlack) ||
                target.blockFigureMovementHorizontal(figureMain.figure?.cell, kingBlack)){

                    let Diagonal = target.blockFigureMovementDiagonal(figureMain.figure?.cell, kingBlack)
                    let Vertical = target.blockFigureMovementVertical(figureMain.figure?.cell, kingBlack)
                    let Horizontal = target.blockFigureMovementHorizontal(figureMain.figure?.cell, kingBlack)

                    if(Diagonal){
                        if(Diagonal.bool){
                            Diagonal.cell.block = true

                            cellForKill = Diagonal
                            figureMainObj = figureMain
                        }
                        else{ 
                            if(Diagonal.cell){
                                Diagonal.cell.block = false
                             }                           
                        }
                    }
                    if(Vertical){
                        if(Vertical.bool){
                            Vertical.cell.block = true

                            cellForKill = Vertical
                            figureMainObj = figureMain
                        }
                        else{
                            if(Vertical.cell){
                                Vertical.cell.block = false
                            }
                        }
                    }
                    if(Horizontal){
                        if(Horizontal.bool){
                            Horizontal.cell.block = true

                            cellForKill = Horizontal
                            figureMainObj = figureMain
                        }
                        else{
                            if(Horizontal.cell){
                                Horizontal.cell.block = false
                            }
                        }
                    }
                }
            }

            if(figureMain.figure?.figureName === FigureName.ROOK || this.cell){

                if(target.blockFigureMovementVertical(figureMain.figure?.cell , kingBlack) ||
                target.blockFigureMovementHorizontal(figureMain.figure?.cell , kingBlack)){

                    const Vertical = target.blockFigureMovementVertical(figureMain.figure?.cell, kingBlack)
                    const Horizontal = target.blockFigureMovementHorizontal(figureMain.figure?.cell, kingBlack)

                    if(Vertical){
                        if(Vertical.bool){
                            Vertical.cell.block = true

                            cellForKill = Vertical
                            figureMainObj = figureMain
                        }
                        else{
                            if(Vertical.cell){
                                Vertical.cell.block = false
                            }
                        }
                    }
                    if(Horizontal){
                        if(Horizontal.bool){
                            Horizontal.cell.block = true

                            cellForKill = Horizontal
                            figureMainObj = figureMain
                        }
                        else{
                            if(Horizontal.cell){
                                Horizontal.cell.block = false
                            }
                        }
                    }
                  }
                }

                if(figureMain.figure?.figureName === FigureName.BISHOP || this.cell){

                    if(target.blockFigureMovementDiagonal(figureMain.figure?.cell, kingBlack)){
                        const Diagonal = target.blockFigureMovementDiagonal(figureMain.figure?.cell, kingBlack)

                        if(Diagonal){
                            if(Diagonal.bool){
                                Diagonal.cell.block = true
                                cellForKill = Diagonal
                                figureMainObj = figureMain
                            }
                            else{ 
                                if(Diagonal.cell){
                                    Diagonal.cell.block = false
                                 }                           
                            }
                        }
                    }
                }
            })
        }

        // if (figureMainObj && cellForKill) {
        //     if (cellForKill.cell.figure?.color === Color.BLACK && target.figure?.color === Color.WHITE && target.figure === figureMainObj.figure ) {
        //         return true;
        //     }
        // }

    if(target.board.arrayBlackFiguresBlock.length){
        this.cell.board.arrayBlackFiguresBlock.map(figureMain => {

            if(target.figure?.figureName === FigureName.KING && target.figure.color === Color.WHITE){
                kingWhite = {x: target.x, y: target.y}
            }

            if(figureMain.figure?.figureName === FigureName.QUEEN || this.cell){
                
                if(target.blockFigureMovementDiagonal(figureMain.figure?.cell, kingWhite) ||
                target.blockFigureMovementVertical(figureMain.figure?.cell, kingWhite) ||
                target.blockFigureMovementHorizontal(figureMain.figure?.cell, kingWhite)){

                    let Diagonal = target.blockFigureMovementDiagonal(figureMain.figure?.cell, kingWhite)
                    let Vertical = target.blockFigureMovementVertical(figureMain.figure?.cell, kingWhite)
                    let Horizontal = target.blockFigureMovementHorizontal(figureMain.figure?.cell, kingWhite)

                    if(Diagonal){
                        if(Diagonal.bool){
                            Diagonal.cell.block = true

                            cellForKill = Diagonal
                            figureMainObj = figureMain
                        }
                        else{ 
                            if(Diagonal.cell){
                                Diagonal.cell.block = false
                             }                           
                        }
                    }
                    if(Vertical){
                        if(Vertical.bool){
                            Vertical.cell.block = true

                            cellForKill = Vertical
                            figureMainObj = figureMain
                        }
                        else{
                            if(Vertical.cell){
                                Vertical.cell.block = false
                            }
                        }
                    }
                    if(Horizontal){
                        if(Horizontal.bool){
                            Horizontal.cell.block = true

                            cellForKill = Horizontal
                            figureMainObj = figureMain
                        }
                        else{
                            if(Horizontal.cell){
                                Horizontal.cell.block = false
                            }
                        }
                    }
                }
            }
            if(figureMain.figure?.figureName === FigureName.ROOK || this.cell){
                
                if(target.blockFigureMovementVertical(figureMain.figure?.cell, kingWhite) ||
                target.blockFigureMovementHorizontal(figureMain.figure?.cell, kingWhite)){
                    const Vertical = target.blockFigureMovementVertical(figureMain.figure?.cell, kingWhite)
                    const Horizontal = target.blockFigureMovementHorizontal(figureMain.figure?.cell, kingWhite)

                    if(Vertical){
                        if(Vertical.bool){
                            Vertical.cell.block = true

                            cellForKill = Vertical
                            figureMainObj = figureMain
                        }
                        else{
                            if(Vertical.cell){
                                Vertical.cell.block = false
                            }
                        }
                    }
                    if(Horizontal){
                        if(Horizontal.bool){
                            Horizontal.cell.block = true

                            cellForKill = Horizontal
                            figureMainObj = figureMain
                        }
                        else{
                            if(Horizontal.cell){
                                Horizontal.cell.block = false
                            }
                        }
                    }
                }
            }
            if(figureMain?.figure?.figureName === FigureName.BISHOP || this.cell){    
                if(target.blockFigureMovementDiagonal(figureMain.figure?.cell , kingWhite)){

                    const Diagonal = target.blockFigureMovementDiagonal(figureMain.figure?.cell, kingWhite)

                    if(Diagonal){
                        if(Diagonal.bool){
                            Diagonal.cell.block = true
                            cellForKill = Diagonal
                            figureMainObj = figureMain
                        }
                        else{ 
                            if(Diagonal.cell){
                                Diagonal.cell.block = false
                             }                           
                        }
                    }
                }
            }
        })
    }
   
    // if (figureMainObj && cellForKill) {
    //     if (cellForKill.cell.figure?.color === Color.WHITE && target.figure?.color === Color.BLACK && target.figure === figureMainObj.figure ) {
    //         return true;
    //     }
    // }

        

    if(this.cell.block){
        return false
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