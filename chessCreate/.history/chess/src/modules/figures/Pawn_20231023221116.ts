import { Figure } from "./Figure"
import { Cell } from "../Cell"
import { Color } from "../Color"
import { FigureName } from "./Figure"

import pawnWhite from '../../assets/white-pawn.png'
import pawnBlack from '../../assets/black-pawn.png'

export class Pawn extends Figure{
    secondStep: boolean = true 
    constructor(color: Color, cell: Cell, uniqValue: number | null) {
        super(color, cell, uniqValue)
        this.logo = color === Color.WHITE ? pawnWhite : pawnBlack
        this.figureName = FigureName.PAWN
    }

    public canMove(target: Cell){
        if(!super.canMove(target)){
           return false 
        }   

        const stepOne = this.cell.figure?.color === Color.BLACK ? 1 : -1
        const stepTwo = this.cell.figure?.color === Color.BLACK ? 2 : -2

        const firstCell = this.cell.y + stepOne;
        const secondCell = this.cell.y + stepTwo;

        const first = this.cell.board.getCell(firstCell, target.x).isEmpty();
        const second = this.cell.board.getCell(secondCell, target.x);

        if((target.y === this.cell.y + stepOne || this.secondStep && (target.y === this.cell.y + stepTwo && first))
        && (target.x === this.cell.x)){
            if(target.figure && this.secondStep){                
                if (!first) {
                    console.log(this.cell.board.getCell(firstCell, target.x).figure?.color);
                    this.secondStep = false
                    second.available = false
                }
                return false
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

    public canBlock(target: Cell){
        if(this.cell.figure?.color === Color.WHITE){
            const stepOne = this.cell.figure?.color === Color.WHITE ? -1 : 1
            if(target.y === this.cell.y + stepOne && (target.x === this.cell.x + 1 || target.x === this.cell.x - 1)){
                    if(this.uniqValue === 1){
                        target.whitePawn1 = true
                    }
                    if(this.uniqValue === 2){
                        target.whitePawn2 = true
                    }
                    if(this.uniqValue === 3){
                        target.whitePawn3 = true
                    }
                    if(this.uniqValue === 4){
                        target.whitePawn4 = true
                    }
                    if(this.uniqValue === 5){
                        target.whitePawn5 = true
                    }
                    if(this.uniqValue === 6){
                        target.whitePawn6 = true
                    }
                    if(this.uniqValue === 7){
                        target.whitePawn7 = true
                    }  
                    if(this.cell.figure?.uniqValue === 8){
                        target.whitePawn8 = true
                    }

                    // if(this.cell.figure?.uniqValue === 1){
                    //     target.whitePawn1 = false
                    // }
                    // if(this.cell.figure?.uniqValue === 2){
                    //     target.whitePawn2 = false
                    // }
                    // if(this.cell.figure?.uniqValue === 3){
                    //     target.whitePawn3 = false
                    // }
                    // if(this.cell.figure?.uniqValue === 4){
                    //     target.whitePawn4 = false
                    // }
                    // if(this.cell.figure?.uniqValue === 5){
                    //     target.whitePawn5 = false
                    // }
                    // if(this.cell.figure?.uniqValue === 6){
                    //     target.whitePawn6 = false
                    // }
                    // if(this.cell.figure?.uniqValue === 7){
                    //     target.whitePawn7 = false
                    // }  
                    // if(this.cell.figure?.uniqValue === 8){
                    //     target.whitePawn8 = false
                    // }
            }
        }
    
        if(this.cell.figure?.color === Color.BLACK){
            const stepOne = this.cell.figure?.color === Color.BLACK ? 1 : -1
            if(target.x === this.cell.x + 1 || target.x === this.cell.x - 1){
                if(target.y === this.cell.y + stepOne && !target.figure){
                    target.blackPawn = true
                    return true
                }
                target.blackPawn = false
            }
            this.cell.blackPawn = false
        }
    }


   public PawnStart(target: Cell){
        super.PawnStart(target)
        this.secondStep = false
   }
}