import { type } from "os"
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

        cellDiagonal: Cell | null
        cellHorizontal: Cell | null
        cellVertical: Cell | null

        deletedDiagonalQueen = null
        counterDiagonalQueen = 0

        deletedVerticalQueen = null
        counterVerticalQueen = 0

        deletedHorizontalQueen = null
        counterHorizontalQueen = 0


        deletedVerticalRook = null
        counterVerticalRook = 0

        deletedHorizontalRook = null
        counterHorizontalRook = 0


        deletedDiagonalBishop = null
        this.counterDiagonalBishop = 0

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

            this.cellDiagonal = null
            this.cellVertical = null
            this.cellHorizontal = null
            
            this.deletedDiagonalQueen = null
            this.counterDiagonalQueen = 0

            this.deletedVerticalQueen = null
            this.counterVerticalQueen = 0
    
            this.deletedHorizontalQueen = null
            this.counterHorizontalQueen = 0


            this.deletedVerticalRook = null
            this.counterVerticalRook = 0
    
            this.deletedHorizontalRook = null
            this.counterHorizontalRook = 0


            this.deletedDiagonalBishop = null
            this.counterDiagonalBishop = 0



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
            if(this.figure && this.figure?.canMove(target)){
                if(target.figure){
                    this.setDeletedFigures(target.figure)
                }    
                        
                target.move(this.figure!)
                this.figure?.PawnStart(target);
                this.figure = null
            }
        }

            blockFigureMovementDiagonalQueen(figure: Cell, king: XY){
                this.counterDiagonal = this.counterDiagonalQueen + 1
                if(this.counterDiagonal === 1){
                   this.deletedDiagonal = figure   
                }
                
                const dx = Math.abs(figure.x - king.x);
                const dy = Math.abs(figure.y - king.y);

                const directionX = king.x < figure.x ? -1 : 1;    
                const directionY = king.y < figure.y ? -1 : 1;
                
                let arrayFigures: Array<Cell> = [];

                    if(dx !== dy){
                        if(this.cellDiagonal){
                            return {cell: this.cellDiagonal, bool: false}
                        }
                        return {cell: this.cellDiagonal!, bool: false}
                    }

                for (let i = 1; i <= dy; i++) {                    
                    if(!this.board.getCell(figure.y + (i * directionY), figure.x + (i * directionX)).isEmpty()){
                        if(this.board.getCell(figure.y + (i * directionY), figure.x + (i * directionX)).figure?.color === figure.figure?.color){
                            return {cell: this.cellDiagonal!, bool: false}
                        }
                        arrayFigures.push(this.board.getCell(figure.y + (i * directionY), figure.x + (i * directionX)))                   
                    }
                }

                arrayFigures.push(figure)
                
                if(arrayFigures.length === 3 && dx === dy && this.deletedDiagonal === arrayFigures[2]){
                    this.cellDiagonal = arrayFigures[0]
                    this.deletedDiagonal = null
                    this.counterDiagonal = 0
                    return {cell: arrayFigures[0], bool: true}
                }
                else{
                    const newA = arrayFigures.filter(el => el.block === true)
                    this.deletedDiagonal = null
                    this.counterDiagonal = 0
                    return {cell: newA[0], bool: false}
                }
            }


            blockFigureMovementVerticalQueen(figure: Cell, king: XY){
                this.counterVertical = this.counterVertical + 1
                if(this.counterVertical === 1){
                    this.deletedVertical = figure
                }
                let item: Cell;
                let arrayCell: Array<Cell> = [];

                const directionY = king.y < figure.y ? -1 : 1;  
                
                const dy = Math.abs(figure.y - king.y);    
                
                if(figure.x !== king.x){
                    if(this.cellVertical){
                        return {cell: this.cellVertical, bool: false}
                    }
                    return {cell: this.cellVertical!, bool: false}
                }

                for (let i = 1; i <= dy; i++) {
                    if(!this.board.getCell(figure.y + (i * directionY), figure.x).isEmpty()){
                        if(this.board.getCell(figure.y + (i * directionY), figure.x).figure?.color === figure.figure?.color){
                            return {cell: this.cellVertical!, bool: false}
                        }
                        item = this.board.getCell(figure.y + (i * directionY), figure.x)
                        arrayCell.push(item)
                    }
                }

                arrayCell.push(figure)
                console.log(arrayCell.length, this.deletedVertical);
                

                if(arrayCell.length === 3 && figure.x === king.x && this.deletedVertical === arrayCell[2]){
                    console.log('6789');
                    this.cellVertical = arrayCell[0]
                    this.deletedVertical = null
                    this.counterVertical = 0
                    return {cell: arrayCell[0], bool: true}
                } 
                else{
                    const newA = arrayCell.filter(el => el.block === true)
                    this.deletedVertical = null
                    this.counterVertical = 0
                    console.log('there');
                    console.log(newA, ' sdfghjkl;456789');
                    
                    return {cell: newA[0], bool: false}
                } 
            }
            
            
    
            blockFigureMovementHorizontalQueen(figure: Cell, king: XY){
                this.counterHorizontal = this.counterHorizontal + 1
                if(this.counterHorizontal === 1){
                    this.deletedHorizontal = figure
                }
                let item: Cell;
                let arrayCell: Array<Cell> = [];

                const directionX = king.x < figure.x ? -1 : 1;  
                const dx = Math.abs(figure.x - king.x);    
                
                if(figure.y !== king.y){
                    if(this.cellHorizontal){
                        return {cell: this.cellHorizontal, bool: false}
                    }
                    return {cell: this.cellHorizontal!, bool: false}
                }

                for (let i = 1; i <= dx; i++) {
                    if(!this.board.getCell(figure.y, figure.x + (i * directionX)).isEmpty()){
                        if(this.board.getCell(figure.y, figure.x + (i * directionX)).figure?.color === figure.figure?.color){
                            return {cell: this.cellHorizontal!, bool: false}
                        }
                        item = this.board.getCell(figure.y, figure.x + (i * directionX))
                        arrayCell.push(item)
                    }
                }
                
                arrayCell.push(figure)

                if(arrayCell.length === 3 && figure.y === king.y && this.deletedHorizontal === arrayCell[2]){

                    this.cellHorizontal = arrayCell[0]
                    this.deletedHorizontal = null
                    this.counterHorizontal = 0
                    return {cell: arrayCell[0], bool: true}
                } 
                else{
                    const newA = arrayCell.filter(el => el.block === true)
                    this.deletedHorizontal = null
                    this.counterHorizontal = 0
                    return {cell: newA[0], bool: false}
                } 
            }





            blockFigureMovementVerticalRook(figure: Cell, king: XY){
                this.counterVertical = this.counterVertical + 1
                if(this.counterVertical === 1){
                    this.deletedVertical = figure
                }
                let item: Cell;
                let arrayCell: Array<Cell> = [];

                const directionY = king.y < figure.y ? -1 : 1;  
                
                const dy = Math.abs(figure.y - king.y);    
                
                if(figure.x !== king.x){
                    if(this.cellVertical){
                        return {cell: this.cellVertical, bool: false}
                    }
                    return {cell: this.cellVertical!, bool: false}
                }

                for (let i = 1; i <= dy; i++) {
                    if(!this.board.getCell(figure.y + (i * directionY), figure.x).isEmpty()){
                        if(this.board.getCell(figure.y + (i * directionY), figure.x).figure?.color === figure.figure?.color){
                            return {cell: this.cellVertical!, bool: false}
                        }
                        item = this.board.getCell(figure.y + (i * directionY), figure.x)
                        arrayCell.push(item)
                    }
                }

                arrayCell.push(figure)
                console.log(arrayCell.length, this.deletedVertical);
                

                if(arrayCell.length === 3 && figure.x === king.x && this.deletedVertical === arrayCell[2]){
                    console.log('6789');
                    this.cellVertical = arrayCell[0]
                    this.deletedVertical = null
                    this.counterVertical = 0
                    return {cell: arrayCell[0], bool: true}
                } 
                else{
                    const newA = arrayCell.filter(el => el.block === true)
                    this.deletedVertical = null
                    this.counterVertical = 0
                    console.log('there');
                    console.log(newA, ' sdfghjkl;456789');
                    
                    return {cell: newA[0], bool: false}
                } 
            }
            
            
    
            blockFigureMovementHorizontalRook(figure: Cell, king: XY){
                this.counterHorizontal = this.counterHorizontal + 1
                if(this.counterHorizontal === 1){
                    this.deletedHorizontal = figure
                }
                let item: Cell;
                let arrayCell: Array<Cell> = [];

                const directionX = king.x < figure.x ? -1 : 1;  
                const dx = Math.abs(figure.x - king.x);    
                
                if(figure.y !== king.y){
                    if(this.cellHorizontal){
                        return {cell: this.cellHorizontal, bool: false}
                    }
                    return {cell: this.cellHorizontal!, bool: false}
                }

                for (let i = 1; i <= dx; i++) {
                    if(!this.board.getCell(figure.y, figure.x + (i * directionX)).isEmpty()){
                        if(this.board.getCell(figure.y, figure.x + (i * directionX)).figure?.color === figure.figure?.color){
                            return {cell: this.cellHorizontal!, bool: false}
                        }
                        item = this.board.getCell(figure.y, figure.x + (i * directionX))
                        arrayCell.push(item)
                    }
                }
                
                arrayCell.push(figure)

                if(arrayCell.length === 3 && figure.y === king.y && this.deletedHorizontal === arrayCell[2]){

                    this.cellHorizontal = arrayCell[0]
                    this.deletedHorizontal = null
                    this.counterHorizontal = 0
                    return {cell: arrayCell[0], bool: true}
                } 
                else{
                    const newA = arrayCell.filter(el => el.block === true)
                    this.deletedHorizontal = null
                    this.counterHorizontal = 0
                    return {cell: newA[0], bool: false}
                } 
            }


            


            blockFigureMovementDiagonalBishop(figure: Cell, king: XY){
                this.counterDiagonal = this.counterDiagonal + 1
                if(this.counterDiagonal === 1){
                   this.deletedDiagonal = figure   
                }
                
                const dx = Math.abs(figure.x - king.x);
                const dy = Math.abs(figure.y - king.y);

                const directionX = king.x < figure.x ? -1 : 1;    
                const directionY = king.y < figure.y ? -1 : 1;
                
                let arrayFigures: Array<Cell> = [];

                    if(dx !== dy){
                        if(this.cellDiagonal){
                            return {cell: this.cellDiagonal, bool: false}
                        }
                        return {cell: this.cellDiagonal!, bool: false}
                    }

                for (let i = 1; i <= dy; i++) {                    
                    if(!this.board.getCell(figure.y + (i * directionY), figure.x + (i * directionX)).isEmpty()){
                        if(this.board.getCell(figure.y + (i * directionY), figure.x + (i * directionX)).figure?.color === figure.figure?.color){
                            return {cell: this.cellDiagonal!, bool: false}
                        }
                        arrayFigures.push(this.board.getCell(figure.y + (i * directionY), figure.x + (i * directionX)))                   
                    }
                }

                arrayFigures.push(figure)
                
                if(arrayFigures.length === 3 && dx === dy && this.deletedDiagonal === arrayFigures[2]){
                    this.cellDiagonal = arrayFigures[0]
                    this.deletedDiagonal = null
                    this.counterDiagonal = 0
                    return {cell: arrayFigures[0], bool: true}
                }
                else{
                    const newA = arrayFigures.filter(el => el.block === true)
                    this.deletedDiagonal = null
                    this.counterDiagonal = 0
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