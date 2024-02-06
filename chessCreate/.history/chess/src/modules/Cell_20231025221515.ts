import { Board } from "./Board"
import { Color } from "./Color"
import { Figure, FigureName } from "./figures/Figure"
import { King } from "./figures/King"
import { Rook } from "./figures/Rook"

    interface XY {
        x: number
        y: number
    }
    interface XYCastling {
        kingX: number
        rookX: number
    }

export class Cell{
        board: Board
        figure: Figure | null
        color: Color
        x: number
        y: number
        available: boolean
        
        id: number

        constructor(board: Board, y: number, x: number,color: Color, figure: Figure | null){
            this.board = board
            this.y = y
            this.x = x
            this.figure = figure
            this.color = color
            this.available = false
            this.id = Math.random()
        }

        move(figure: Figure){
            this.figure = figure
            this.figure.cell = this
        }

        setDeletedFigures(target: Figure){
            
            if(target?.color === Color.BLACK && target.figureName !== FigureName.KING){
                this.board.deletedBlackFigures.push(target)
            }
            if(target?.color === Color.WHITE && target.figureName !== FigureName.KING){
                this.board.deletedWhiteFigures.push(target)
            }
        }

        moveFigure(target: Cell){
            if(this.figure && this.figure?.canMove(target)){
                if(target.figure){
                    this.setDeletedFigures(target.figure)
                }    
                        
                target.move(this.figure!)
                this.figure?.PawnStart(target);
                this.figure = null
            }
        }

        moveDiagonalKingDisabledWhite(target: Cell){
            const dx = Math.abs(target.x - this.x);
            const dy = Math.abs(target.y - this.y);

            const directionX = this.x < target.x ? 1 : -1;    
            const directionY = this.y < target.y ? 1 : -1;

            if(dx !== dy){
                return false;
            }
            for (let i = 1; i <= dy; i++) {
                if(!this.board.getCell(this.y + (i * directionY), this.x + (i * directionX)).isEmpty()){
                    if(this.board.getCell(this.y + (i * directionY), this.x + (i * directionX)).figure?.figureName !== FigureName.KING 
                    || this.board.getCell(this.y + (i * directionY), this.x + (i * directionX)).figure?.color !== Color.BLACK){
                        return false
                    }
                }
            }
            return true;
        }

        moveHorizontalKingDisabledWhite(target: Cell){
            if(target.y !== this.y){
                return false
            }

            const max = Math.max(target.x, this.x);
            const min = Math.min(target.x, this.x);

            for(let i = min + 1; i < max; i++){
                if(!this.board.getCell(this.y, i).isEmpty()){
                    if(this.board.getCell(this.y, i).figure?.figureName !== FigureName.KING || this.board.getCell(this.y, i).figure?.color !== Color.BLACK){
                        return false  
                    }
                }
            }
            return true
        }

        moveVerticalKingDisabledWhite(target: Cell){
            if(target.x !== this.x){
                return false;
            }

            const max = Math.max(target.y, this.y);
            const min = Math.min(target.y, this.y);

            for (let i = min + 1; i < max; i++) {
                if(!this.board.getCell(i, this.x).isEmpty()){
                    if(this.board.getCell(i, this.x).figure?.figureName !== FigureName.KING || this.board.getCell(i, this.x).figure?.color !== Color.BLACK){
                        return false  
                    }
                }   
            }
            return true
        }

        moveDiagonalKingDisabledBlack(target: Cell){
            const dx = Math.abs(target.x - this.x);
            const dy = Math.abs(target.y - this.y);

            const directionX = this.x < target.x ? 1 : -1;    
            const directionY = this.y < target.y ? 1 : -1;

            if(dx !== dy){
                return false;
            }
            for (let i = 1; i <= dy; i++) {
                if(!this.board.getCell(this.y + (i * directionY), this.x + (i * directionX)).isEmpty()){
                    if(this.board.getCell(this.y + (i * directionY), this.x + (i * directionX)).figure?.color !== Color.WHITE
                    || this.board.getCell(this.y + (i * directionY), this.x + (i * directionX)).figure?.figureName !== FigureName.KING){
                        return false
                    }
                }
            }
            return true;
        }

        moveHorizontalKingDisabledBlack(target: Cell){
            if(target.y !== this.y){
                return false
            }

            const max = Math.max(target.x, this.x);
            const min = Math.min(target.x, this.x);

            for(let i = min + 1; i < max; i++){
                if(!this.board.getCell(this.y, i).isEmpty()){
                    if(this.board.getCell(this.y, i).figure?.color !== Color.WHITE || this.board.getCell(this.y, i).figure?.figureName !== FigureName.KING){
                        return false
                    }
                }
            }
            return true
        }

        moveVerticalKingDisabledBlack(target: Cell){
            if(target.x !== this.x){
                return false;
            }

            const max = Math.max(target.y, this.y);
            const min = Math.min(target.y, this.y);

            for (let i = min + 1; i < max; i++) {
                if(!this.board.getCell(i, this.x).isEmpty()){
                    if(this.board.getCell(i, this.x).figure?.color !== Color.WHITE || this.board.getCell(i, this.x).figure?.figureName !== FigureName.KING){
                        return false  
                    }
                }   
            }
            return true
        }


        isEmpty(){
            return this.figure === null;
        }
        moveDiagonal(target: Cell){
            const dx = Math.abs(target.x - this.x);
            const dy = Math.abs(target.y - this.y);

            const directionX = this.x < target.x ? 1 : -1;    
            const directionY = this.y < target.y ? 1 : -1;

            if(dx !== dy){
                return false;
            }
            for (let i = 1; i < dy; i++) {
                if(!this.board.getCell(this.y + (i * directionY), this.x + (i * directionX)).isEmpty()){
                    return false;
                }
            }
            return true;
        }

        moveHorizontal(target: Cell){
            if(target.y !== this.y){
                return false
            }

            const max = Math.max(target.x, this.x);
            const min = Math.min(target.x, this.x);

            for(let i = min + 1; i < max; i++){
                if(!this.board.getCell(this.y, i).isEmpty()){
                    return false
                }
            }
            return true
        }

        moveVertical(target: Cell){
            if(target.x !== this.x){
                return false;
            }

            const max = Math.max(target.y, this.y);
            const min = Math.min(target.y, this.y);

            for (let i = min + 1; i < max; i++) {
                if(!this.board.getCell(i, this.x).isEmpty()){
                    return false
                }   
            }
            return true
        }

        blackKingKill(cell: Cell, kingParams: XY){
            if(cell.figure?.figureName === FigureName.QUEEN){
                if(this.tryToKillKingHorizontal(cell, kingParams) || this.tryToKillKingDiagonal(cell, kingParams) || this.tryToKillKingVertical(cell, kingParams)){
                    return true;
                }
            }
            if(cell.figure?.figureName === FigureName.BISHOP){
                if(this.tryToKillKingDiagonal(cell, kingParams)){
                    return true
                }
            }
            if (cell.figure?.figureName === FigureName.KNIGHT) {
                if(this.tryToKillKingWithKnight(cell, kingParams)){
                    return true
                }
            }
            if(cell.figure?.figureName === FigureName.PAWN){
                if(this.tryToKillKingWithPawn(cell, kingParams)){
                    return true
                }
            }
            if(cell.figure?.figureName === FigureName.ROOK){
                if(this.tryToKillKingHorizontal(cell, kingParams) || this.tryToKillKingVertical(cell, kingParams)){
                    return true
                }
            }
        }
        
        whiteKingKill(cell: Cell, kingParams: XY){
            if(cell.figure?.figureName === FigureName.QUEEN){
                if(this.tryToKillKingHorizontal(cell, kingParams) || this.tryToKillKingDiagonal(cell, kingParams) || this.tryToKillKingVertical(cell, kingParams)){
                    return true;
                }
            }
            if(cell.figure?.figureName === FigureName.BISHOP){
                if(this.tryToKillKingDiagonal(cell, kingParams)){
                    return true
                }
            }
            if (cell.figure?.figureName === FigureName.KNIGHT) {
                if(this.tryToKillKingWithKnight(cell, kingParams)){
                    return true
                }
            }
            if(cell.figure?.figureName === FigureName.PAWN){
                if(this.tryToKillKingWithPawn(cell, kingParams)){
                    return true
                }
            }
            if(cell.figure?.figureName === FigureName.ROOK){
                if(this.tryToKillKingHorizontal(cell, kingParams) || this.tryToKillKingVertical(cell, kingParams)){
                    return true
                }
            }
        }

        tryToKillKingDiagonal(cell: Cell, kingParams: XY){        
            const dx = Math.abs(cell.x - kingParams.x);
            const dy = Math.abs(cell.y - kingParams.y);

            const directionX = kingParams.x < cell.x ? -1 : 1;
            const directionY = kingParams.y < cell.y ? -1 : 1;
            
            if(dy !== dx){                
                return false
            }
            for (let i = 1; i <= dx; i++) {
                if(!this.board.getCell(cell.y + (i * directionY), cell.x + (i * directionX)).isEmpty()){
                    if (this.board.getCell(cell.y + (i * directionY), cell.x + (i * directionX)).figure?.figureName !== FigureName.KING) {
                        return false
                    }
                    else{         
                        return true
                    }
                }
            }
        }

        tryToKillKingHorizontal(cell: Cell, kingParams: XY){  
            if(cell.y !== kingParams.y){
                return false
            }    
            
            const max = Math.max(cell.x, kingParams.x);
            const min = Math.min(cell.x, kingParams.x);

            for (let i = min + 1; i < max; i++) {

                if(!this.board.getCell(cell.y, i).isEmpty()){
                    if (this.board.getCell(cell.y, i).figure?.figureName !== FigureName.KING) {
                        return false
                    }
                }
            }
            return true
        }

        tryToKillKingVertical(cell: Cell, kingParams: XY){  
            if(cell.x !== kingParams.x){
                return false
            }    
            
            const max = Math.max(cell.y, kingParams.y);
            const min = Math.min(cell.y, kingParams.y);

            for (let i = min + 1; i < max; i++) {
                if(!this.board.getCell(i, cell.x).isEmpty()){
                    if (this.board.getCell(i, cell.x).figure?.figureName !== FigureName.KING) {
                        return false
                    }
                }
            }
            return true
        }

        tryToKillKingWithKnight(cell: Cell, kingParams: XY){ 
            const dx = Math.abs(cell.x - kingParams.x);
            const dy = Math.abs(cell.y - kingParams.y);
            if((dy === 2 && dx === 1) || (dy === 1 && dx === 2)){
                return true  
            }
            return false
        }

        tryToKillKingWithPawn(cell: Cell, kingParams: XY){
            const direction = cell.figure?.color === Color.BLACK ? 1 : -1;
            if(kingParams.y === cell.y + direction && cell.figure && (kingParams.x === cell.x + 1 || kingParams.x === cell.x - 1)){
                return true
            }
            return false
        }

        clearToCastling(clickedCell: Cell, currentCell: Cell){
            if(clickedCell.y !== currentCell.y){
                return false
            }
            const max = Math.max(clickedCell.x, currentCell.x);
            const min = Math.min(clickedCell.x, currentCell.x);

            for (let i = min + 1; i < max; i++) {
                if(!this.board.getCell(clickedCell.y, i).isEmpty()){
                    return false
                }
            }
            return true
        }

        Castling(clicked: Cell, current: Cell, XY: XYCastling, color: Color){
            new Rook(color , this.board.getCell(clicked.y, XY.rookX), null);
            new King(color, this.board.getCell(current.y, XY.kingX), null);
            return true
        }
        clearCastling(clicked: Cell, current: Cell, color: Color){
            new Rook(color, this.board.getCell(clicked.y, clicked.x), null).cell.figure = null;
            new King(color, this.board.getCell(current.y, current.x), null).cell.figure = null;
        }

        biggerCastling(clicked: Cell, current: Cell, XY: XYCastling, color: Color) {
            new Rook(color, this.board.getCell(clicked.y, XY.rookX), null);
            new King(color, this.board.getCell(current.y, XY.kingX), null);
            return true
        }
        clearBiggerCastling(clicked: Cell, current: Cell, color: Color){
            new Rook(color, this.board.getCell(clicked.y, clicked.x), null).cell.figure = null;
            new King(color, this.board.getCell(current.y, current.x), null).cell.figure = null;
        }
    }