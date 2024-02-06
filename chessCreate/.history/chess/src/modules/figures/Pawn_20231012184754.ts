import { Figure } from "./Figure"
import { Cell } from "../Cell"
import { Color } from "../Color"
import { FigureName } from "./Figure"

import pawnWhite from '../../assets/white-pawn.png'
import pawnBlack from '../../assets/black-pawn.png'

export class Pawn extends Figure{
    secondStep: boolean = true 
    constructor(color: Color, cell: Cell) {
        super(color, cell)
        this.logo = color === Color.WHITE ? pawnWhite : pawnBlack
        this.figureName = FigureName.PAWN
    }

    public canMove(target: Cell){
        if(!super.canMove(target)){
           return false 
        }   

        const stepOne = this.cell.figure?.color === Color.BLACK ? 1 : -1
        const stepTwo = this.cell.figure?.color === Color.BLACK ? 2 : -2

        if((target.y === this.cell.y + stepOne || this.secondStep && (target.y === this.cell.y + stepTwo))
        && target.x === this.cell.x){
            if(target.figure && this.secondStep){
                const firstCell = this.cell.y + stepOne;
                const secondCell = this.cell.y + stepTwo;

                const firstEmpty = this.cell.board.getCell(firstCell, this.cell.x).isEmpty();
                const secondEmpty = this.cell.board.getCell(secondCell, this.cell.x).isEmpty();

                if(firstEmpty && secondCell){
                    return true
                }
                if(firstEmpty && !secondCell){

                }
            }


            if(target.figure){
                return false;
            }
            return true
        }
        if(target.y === this.cell.y + stepOne && target.figure && (target.x === this.cell.x + 1 || target.x === this.cell.x - 1)){
            return true
        }
        return false
   }
   public PawnStart(target: Cell){
        super.PawnStart(target)
        this.secondStep = false
   }
}