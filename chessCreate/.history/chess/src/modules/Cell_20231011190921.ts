import { Board } from "./Board"
import { Color } from "./Color"
import { Figure } from "./Figure"
export class Cell{
    board: Board
    figure: Figure | null
    color: Color
    x: number
    y: number
    available: true
    id: number

    constructor(board: Board, y: number, x: number, figure: Figure | null, color: Color){
        this.board = board
        this.y = y
        this.x = x
        this.figure = figure
        this.color = color
        this.available = true
    }
}   