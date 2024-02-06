import { Board } from "./Board"
import { Color } from "./Color"
import { Figure } from "./figures/Figure"
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
        this.available = true
        this.id = Math.random()
    }

    move(figure: Figure){
        this.figure = figure
        this.figure.cell = this
    }
    
    moveFigure(target: Cell){
        this.figure?.PawnStart(target);
        if(this.figure && this.figure?.canMove(target)){
            target.move(this.figure)
            this.figure = null
        }
    }

    isEmpty(){
        return this.figure === null;
    }

    moveDiagonal(target: Cell){
        const dx = Math.abs(target.x - this.x);
        const dy = Math.abs(target.x - this.y);

        const directionX = this.x < target.x ? -1 : 1;    
        const directionY = this.y < target.y ? -1 : 1;

        if(dx !== dy){
            return false;
        }
        for (let i = 0; i < dy; i++) {
            if(!this.board.getCell(dy + (i * directionY), dx + (i * directionX)).isEmpty()){
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

        const max = Math.max(target.x, this.x);
        const min = Math.min(target.x, this.x);

        for (let i = min + 1; i < max; i++) {
             if(!this.board.getCell(i, this.x).isEmpty()){
                return false
             }   
        }
        return true
    }
}   