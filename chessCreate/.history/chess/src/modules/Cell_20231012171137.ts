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


    moveDiagonal(target: Cell){

    }
    
    moveHorizontal(target: Cell){

    }
    moveVertical(target: Cell){

    }
}   