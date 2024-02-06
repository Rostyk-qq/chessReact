import { Board } from "./Board"
import { Color } from "./Color"
import { Figure, FigureName } from "./figures/Figure"

interface XY {
    x: number
    y: number
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
        if(target?.color === Color.BLACK){
            this.board.deletedBlackFigures.push(target)
        }
        else{
            this.board.deletedWhiteFigures.push(target)
        }
    }

    moveFigure(target: Cell){
        if(this.figure && this.figure?.canMove(target)){

            if(target.figure){
                this.setDeletedFigures(target.figure)
            }

            this.figure?.PawnStart(target);
            target.move(this.figure)
            this.figure = null
        }
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
                if(this.board.getCell(this.y, i).figure?.figureName === FigureName.KING){
                    return true
                }
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


    tryToKillKing(cell: Cell, kingParams: XY){
        console.log(kingParams);
        
        if(cell.figure?.color === Color.WHITE && cell.figure.figureName === FigureName.QUEEN){
            const dx = Math.abs(cell.x - kingParams.x);
            const dy = Math.abs(cell.y - kingParams.y);
     
            const directionX = cell.x < kingParams.x ? -1 : 1;
            const directionY = cell.y < kingParams.y ? -1 : 1;
            
            if(dy !== dx){                
                if(cell.y !== kingParams.y){
                    return false
                }

                const max = Math.max(cell.x, kingParams.x);
                const min = Math.min(cell.x, kingParams.x);

                for (let i = min + 1; i < max; i++) {
                    if(!this.board.getCell(i, cell.y).isEmpty()){
                        console.log('Wtf dude!');
                        if(this.board.getCell(i, i).figure?.figureName === FigureName.KING){
                            console.log('Wtf dude!');
                            return true
                        }
                        return false
                    }
                }
            }

            for (let i = 0; i < dy; i++) {
                if(!this.board.getCell(cell.y + (i * directionY), cell.x + (i * directionX)).isEmpty()){
                    if (this.board.getCell(cell.y + (i * directionY), cell.x + (i * directionX)).figure?.figureName === FigureName.KING) {
                        return true
                    }
                    return false
                }
            }
            return false
        }
    }
}