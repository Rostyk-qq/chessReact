import { Figure } from "./Figure"
import { Cell } from "../Cell"
import { Color } from "../Color"
import { FigureName } from "./Figure"

import knightWhite from '../../assets/white-knight.png'
import knightBlack from '../../assets/black-knight.png'

export class Knight extends Figure{
    normalCell: Cell | null

    constructor(color: Color, cell: Cell) {
        super(color, cell)
        this.logo = color === Color.WHITE ? knightWhite : knightBlack
        this.figureName = FigureName.KNIGHT
        this.normalCell= null
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
            const dx = Math.abs(target.x - this.cell.x);
            const dy = Math.abs(target.y - this.cell.y);
            let currentCell: Cell;

            if(this.cell.figure?.color === Color.WHITE && target.x === this.cell.x + dx){
                if((dx === 1 && dy === 2) || (dx === 2 && dy === 1)){
                    target.whiteKnight = true
                    currentCell = this.cell
                    return true
                }
                if(currentCell.x !== this.cell.x && currentCell.y !== this.cell.y){

                }
                target.whiteKnight = false
            }
            if(this.cell.figure?.color === Color.BLACK && target.x === this.cell.x + dx){
                if(((dx === 1 && dy === 2) || (dx === 2 && dy === 1))){
                    target.blackKnight = true
                    return false
                }
                target.blackKnight = false
            }     
    }
}