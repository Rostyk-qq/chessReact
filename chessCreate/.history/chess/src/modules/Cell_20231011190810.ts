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

    constructor(y: number, x: number){

    }
}   