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
        block: boolean

        whitePawn: Array<boolean>
        blackPawn: Array<boolean>

        whiteQueen: boolean
        blackQueen: boolean

        whiteKing: boolean
        blackKing: boolean

        whiteRookLower: boolean
        blackRookLower: boolean
        whiteRookBigger: boolean
        blackRookBigger: boolean

        whiteBishopLower: boolean
        blackBishopLower: boolean
        whiteBishopBigger: boolean
        blackBishopBigger: boolean

        whiteKnightLower: boolean
        whiteKnightBigger: boolean
        blackKnightLower: boolean
        blackKnightBigger: boolean

        id: number

        constructor(board: Board, y: number, x: number,color: Color, figure: Figure | null){
            this.board = board
            this.y = y
            this.x = x
            this.figure = figure
            this.color = color
            this.available = false
            this.id = Math.random()
            this.block = false

            this.whiteQueen = false
            this.blackQueen = false

            this.whiteKing = false
            this.blackKing = false

            this.whiteRookLower = false
            this.blackRookLower = false
            this.whiteRookBigger = false
            this.blackRookBigger = false

            this.whiteBishopLower = false
            this.blackBishopLower = false
            this.whiteBishopBigger = false
            this.blackBishopBigger = false

            this.whiteKnightLower = false
            this.whiteKnightBigger = false
            this.blackKnightLower = false
            this.blackKnightBigger = false

            this.whitePawn = [false, false, false, false, false, false, false, false];
            this.blackPawn = [false, false, false, false, false, false, false, false];
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
            this.whiteQueen = false
            if(this.figure && this.figure?.canMove(target)){
                if(target.figure){
                    this.setDeletedFigures(target.figure)
                }    
                        
                target.move(this.figure!)
                this.figure?.PawnStart(target);
                this.figure = null
            }
        }


        blockFigureMovementDiagonal(figure: Cell, king: XY){
            const dx = Math.abs(figure.x - king.x);
            const dy = Math.abs(figure.y - king.y);

            const directionX = king.x < figure.x ? -1 : 1;    
            const directionY = king.y < figure.y ? -1 : 1;

            let item: Cell
            const arrayFigures: Array<Cell> = [];
            let newArray: Array<Cell> = [];

            if(dx !== dy){
                if(localStorage.getItem('tempCell')){
                    let cell: Cell = JSON.parse(localStorage.getItem('tempCell')!)
                    return {cell: this.figure!.cell, bool: false}
                }
            }
                for (let i = 1; i <= dy; i++) {
                    console.log(this.board.getCell(figure.y + (i * directionY), figure.x + (i * directionX)));
                    
                    if(!this.board.getCell(figure.y + (i * directionY), figure.x + (i * directionX)).isEmpty()){
                        item = this.board.getCell(figure.y + (i * directionY), figure.x + (i * directionX)) 
                        arrayFigures.push(item)                      
                    }
                }
                const kingCell = arrayFigures.find(cell => cell.figure?.figureName === FigureName.KING)
                newArray = arrayFigures.filter(cell => cell.figure?.figureName !== FigureName.KING)

                if(kingCell && arrayFigures.length === 2 && dx === dy){
                    localStorage.setItem('tempCell', JSON.stringify(newArray[0]))
                    return {cell: newArray[0], bool: true}
                }
                else{
                    return {cell: newArray[0], bool: false }
                }
            }


        blockFigureMovementVertical(figure: Cell, king: XY){
            let item: Cell;
            const arrayCell: Array<Cell> = [];

            const max = Math.max(figure.y, king.y);    
            const min = Math.min(figure.y, king.y);

            if(figure.y <= 4){
                for (let i = min + 1; i <= max; i++) {
                    if(!this.board.getCell(i, figure.x).isEmpty()){
                        item = this.board.getCell(i, figure.x)
                        arrayCell.unshift(item)
                    }
                }
            }
            if(figure.y >= 4){
                for (let i = min; i < max; i++) {
                    if(!this.board.getCell(i, figure.x).isEmpty()){
                        item = this.board.getCell(i, figure.x)
                        arrayCell.unshift(item)
                    }
                }
            }   
            const kingCell = arrayCell.find(cell => cell.figure?.figureName === FigureName.KING)
            const newArray = arrayCell.filter(cell => cell.figure?.figureName !== FigureName.KING)

            if(arrayCell.length === 2 && kingCell && figure.x === king.x){
                console.log(arrayCell);
                return {cell: newArray[0], bool: true}
            } 
            else{
                const newA = arrayCell.filter(el => el.block === true)
                console.log(newA[0]);
                return {cell: newA[0], bool: false}
            } 
        }

        
        blockFigureMovementHorizontal(figure: Cell, king: XY){
            let item: Cell;
            const arrayCell: Array<Cell> = [];

            const max = Math.max(figure.x, king.x);    
            const min = Math.min(figure.x, king.x);
            
            if(figure.x <= 4){
                for (let i = min + 1; i <= max; i++) {
                    if(!this.board.getCell(figure.y, i).isEmpty()){
                        item = this.board.getCell(figure.y, i)
                        arrayCell.push(item)
                    }
                }
            }
            if(figure.x >= 4){
                for (let i = min; i < max; i++) {
                    if(!this.board.getCell(figure.y, i).isEmpty()){
                        item = this.board.getCell(figure.y, i)
                        arrayCell.push(item)
                    }
                }
            }   
            const kingCell = arrayCell.find(cell => cell.figure?.figureName === FigureName.KING)
            const newArray = arrayCell.filter(cell => cell.figure?.figureName !== FigureName.KING)

            
            if(arrayCell.length === 2 && kingCell && figure.y === king.y){
                console.log(arrayCell);
                return {cell: newArray[0], bool: true}
            } 
            else{
                const newA = arrayCell.filter(el => el.block === true)
                console.log(newA[0]);
                return {cell: newA[0], bool: false}
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
                    if(this.board.getCell(this.y + (i * directionY), this.x + (i * directionX)).figure?.figureName !== FigureName.KING ){
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
                    if(this.board.getCell(this.y, i).figure?.figureName !== FigureName.KING){
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
                    if(this.board.getCell(i, this.x).figure?.figureName !== FigureName.KING){
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
                    if(this.board.getCell(this.y + (i * directionY), this.x + (i * directionX)).figure?.figureName !== FigureName.KING){
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
                    if(this.board.getCell(this.y, i).figure?.figureName !== FigureName.KING){
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
                    if(this.board.getCell(i, this.x).figure?.figureName !== FigureName.KING){
                        return false  
                    }
                }   
            }
            return true
        }





        kingMovementWhiteDiagonal(cell: Cell){
            const dx = Math.abs(cell.x - this.x);
            const dy = Math.abs(cell.y - this.y);

            const directionX = this.x < cell.x ? 1 : -1
            const directionY = this.y < cell.y ? 1 : -1

            if(dx !== dy){
                return false
            }

            for (let i = 1; i <= dx; i++) {
                if(!this.board.getCell(this.y + (i * directionY), this.x + (i * directionX)).isEmpty()){
                    if(this.board.getCell(this.y + (i * directionY), this.x + (i * directionX)).figure?.color === Color.BLACK
                    && this.board.getCell(this.y + (i * directionY), this.x + (i * directionX)).figure?.figureName !== FigureName.KING){
                        return true
                    }
                }
            }
            return false 
        }
        kingMovementWhiteVertical(cell: Cell){
            if(this.x !== cell.x){
                return false
            }
            const max = Math.max(cell.y, this.y);
            const min = Math.min(cell.y, this.y);

            for (let i = min + 1; i < max; i++) {
                if(!this.board.getCell(i, this.x).isEmpty()){
                    if(this.board.getCell(i, this.x).figure?.color === Color.BLACK
                    && this.board.getCell(i, this.x).figure?.figureName !== FigureName.KING){
                        return true
                    }
                }
            }
            return false 
        }
        kingMovementWhiteHorizontal(cell: Cell){
            if(this.y !== cell.y){
                return false
            }
            const max = Math.max(cell.x, this.x);
            const min = Math.min(cell.x, this.x);

            for (let i = min + 1; i < max; i++) {
                if(!this.board.getCell(this.y, i).isEmpty()){
                    if(this.board.getCell(this.y, i).figure?.color === Color.BLACK
                    && this.board.getCell(this.y, i).figure?.figureName !== FigureName.KING){
                        return true
                    }
                }
            }
            return false 
        }

        kingMovementBlackDiagonal(cell: Cell){
            const dx = Math.abs(cell.x - this.x);
            const dy = Math.abs(cell.y - this.y);

            const directionX = this.x < cell.x ? 1 : -1
            const directionY = this.y < cell.y ? 1 : -1

            if(dx !== dy){
                return false
            }

            for (let i = 1; i <= dx; i++) {
                if(!this.board.getCell(this.y + (i * directionY), this.x + (i * directionX)).isEmpty()){
                    if(this.board.getCell(this.y + (i * directionY), this.x + (i * directionX)).figure?.color === Color.WHITE){
                        this.board.getCell(this.y + (i * directionY), this.x + (i * directionX)).available = false
                        return true
                    }
                }
            }
            return false 
        }
        kingMovementBlackVertical(cell: Cell){
            if(this.x !== cell.x){
                return false
            }
            const max = Math.max(cell.y, this.y);
            const min = Math.min(cell.y, this.y);

            for (let i = min + 1; i < max; i++) {
                if(!this.board.getCell(i, this.x).isEmpty()){
                    if(this.board.getCell(i, this.x).figure?.color === Color.WHITE){
                        return true
                    }
                }
            }
            return false 
        }
        kingMovementBlackHorizontal(cell: Cell){
            if(this.y !== cell.y){
                return false
            }
            const max = Math.max(cell.x, this.x);
            const min = Math.min(cell.x, this.x);

            for (let i = min + 1; i < max; i++) {
                if(!this.board.getCell(this.y, i).isEmpty()){
                    if(this.board.getCell(this.y, i).figure?.color === Color.WHITE){
                        this.board.getCell(this.y, i).available = false
                        return true
                    }
                }
            }
            return false 
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