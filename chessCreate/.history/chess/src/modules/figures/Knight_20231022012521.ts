import { Figure } from "./Figure"
import { Cell } from "../Cell"
import { Color } from "../Color"
import { FigureName } from "./Figure"

import knightWhite from '../../assets/white-knight.png'
import knightBlack from '../../assets/black-knight.png'

export class Knight extends Figure{
    normalDx: number | null
    normalDy: number | null

    constructor(color: Color, cell: Cell) {
        super(color, cell)
        this.logo = color === Color.WHITE ? knightWhite : knightBlack
        this.figureName = FigureName.KNIGHT
        this.normalDx = null
        this.normalDy = null
    }

    public canMove(target: Cell){
        if(!super.canMove(target)){
           return false 
        }   

        const dx = Math.abs(target.x - this.cell.x);
        const dy = Math.abs(target.y - this.cell.y);

        this.normalDx = dx 
        this.normalDy = dy

        return (dx === 1 && dy === 2) || (dx === 2 && dy === 1) 
   }
    public canBlock(target: Cell){
        if(target.figure?.figureName === FigureName.KNIGHT){
            if(target.figure?.color === Color.WHITE){
                if((this.normalDx === 1 && this.normalDy === 2) || (this.normalDx === 2 && this.normalDy === 1)){
                    target.whiteKnight = true
                }
            }
            // if(target.figure?.color === Color.BLACK){
            //     if((this.normalDx === 1 && this.normalDy === 2) || (this.normalDx === 2 && this.normalDy === 1)){
            //         target.blackKnight = true
            //     }
            // }
        }        
    }
}