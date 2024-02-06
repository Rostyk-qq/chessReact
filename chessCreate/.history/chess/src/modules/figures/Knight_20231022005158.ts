import { Figure } from "./Figure"
import { Cell } from "../Cell"
import { Color } from "../Color"
import { FigureName } from "./Figure"

import knightWhite from '../../assets/white-knight.png'
import knightBlack from '../../assets/black-knight.png'

export class Knight extends Figure{
    thisPositionX: number | null
    thisPositionY: number | null

    constructor(color: Color, cell: Cell) {
        super(color, cell)
        this.logo = color === Color.WHITE ? knightWhite : knightBlack
        this.figureName = FigureName.KNIGHT
        this.thisPositionX = null
        this.thisPositionY = null
    }

    public canMove(target: Cell){
        if(!super.canMove(target)){
           return false 
        }   
        this.thisPositionX = this.cell.x
        this.thisPositionY = this.cell.y
        
        const dx = Math.abs(target.x - this.cell.x);
        const dy = Math.abs(target.y - this.cell.y);
    
        return (dx === 1 && dy === 2) || (dx === 2 && dy === 1) 
   }
   public canBlock(target: Cell){
        const dx = Math.abs(target.x - this.cell.x);
        const dy = Math.abs(target.y - this.cell.y);
        
        if(this.cell.figure?.color === Color.WHITE){
            if((dx === 1 && dy === 2) || (dx === 2 && dy === 1)){
                if(){
                    target.whiteKnight = true
                }
                target.whiteKnight = false
            }
        }
    }
}