import { Figure } from "./Figure"
import { Cell } from "../Cell"
import { Color } from "../Color"
import { FigureName } from "./Figure"

import knightWhite from '../../assets/white-knight.png'
import knightBlack from '../../assets/black-knight.png'

export class Knight extends Figure{

    constructor(color: Color, cell: Cell) {
        super(color, cell)
        this.logo = color === Color.WHITE ? knightWhite : knightBlack
        this.figureName = FigureName.KNIGHT
    }

    public canMove(target: Cell){
        if(!super.canMove(target)){
           return false 
        }   

        const dx = Math.abs(target.x - this.cell.x);
        const dy = Math.abs(target.y - this.cell.y);

        return (dx === 1 && dy === 2) || (dx === 2 && dy === 1) 
   }
    public canBlock(target: Cell){
            const whiteKnightFirst = {x: 0, y: 0}
            const whiteKnightSecond = {x: 0, y: 0}
            const blackKnightFirst = {x: 0, y: 0}
            const blackKnightSecond = {x: 0, y: 0}


            if(target.x === 1 && target.y === 7){
                whiteKnightFirst.x = target.x
                whiteKnightFirst.y = target.y
            }
            if(target.x === 6 && target.y === 7){
                whiteKnightSecond.x = target.x
                whiteKnightSecond.y = target.y
            }
            if(target.x === 1 && target.y === 0){
                blackKnightFirst.x = target.x
                blackKnightFirst.y = target.y
            }
            if(target.x === 6 && target.y === 0){
                blackKnightSecond.x = target.x
                blackKnightSecond.y = target.y
            }
            if(this.cell.figure?.color === Color.WHITE){
                if(this.cell.x === 1 && this.cell.y === 7){

                }
                if(this.cell.x === 6 && this.cell.y === 7){

                }
                // if((Math.abs(target.x - this.cell.x) === 1 && Math.abs(target.y - this.cell.y) === 2) || 
                // (Math.abs(target.x - this.cell.x) === 2 && Math.abs(target.y - this.cell.y) === 1)){
                //     target.whiteKnight = true
                //     return true
                // }
                // target.whiteKnight = false
            }
            if(this.cell.figure?.color === Color.BLACK){
                if(((Math.abs(target.x - this.cell.x) === 1 && Math.abs(target.y - this.cell.y) === 2) || 
                (Math.abs(target.x - this.cell.x) === 2 && Math.abs(target.y - this.cell.y) === 1))){
                    target.blackKnight = true
                    return true
                }
                target.blackKnight = false
            }     
    }
}