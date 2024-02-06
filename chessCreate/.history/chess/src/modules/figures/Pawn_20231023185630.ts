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
            
            if(target.x === this.cell.x + 1 || target.x === this.cell.x - 1){
                if(target.y === this.cell.y + stepOne && !target.figure){
                    if(this.uniqValue === 40){
                        target.whitePawn1 = true
                        return true
                    }
                    if(this.uniqValue === 41){
                        target.whitePawn2 = true
                        return true
                    }
                    if(this.uniqValue === 42){
                        target.whitePawn3 = true
                        return true
                    }
                    if(this.uniqValue === 43){
                        target.whitePawn3 = true
                        return true
                    }
                    if(this.uniqValue === 44){
                        target.whitePawn3 = true
                        return true
                    }                    
                    if(this.uniqValue === 45){
                        target.whitePawn3 = true
                        return true
                    }
                    if(this.uniqValue === 46){
                        target.whitePawn3 = true
                        return true
                    }
                    if(this.uniqValue === 47){
                        target.whitePawn3 = true
                        return true
                    }


                    if(this.cell.figure.uniqValue === 40){
                        target.whitePawn1 = false
                        return true
                    }
                    if(this.cell.figure.uniqValue === 41){
                        target.whitePawn2 = false
                        return true
                    }
                    if(this.cell.figure.uniqValue === 42){
                        target.whitePawn3 = false
                    }
                    if(this.cell.figure.uniqValue === 43){
                        target.whitePawn3 = false
                    }
                    if(this.cell.figure.uniqValue === 44){
                        target.whitePawn3 = false
                    }                    
                    if(this.cell.figure.uniqValue === 45){
                        target.whitePawn3 = false
                    }
                    if(this.cell.figure.uniqValue === 46){
                        target.whitePawn3 = false
                    }
                    if(this.cell.figure.uniqValue === 47){
                        target.whitePawn3 = false
                    }
                }
            }
        }
    
        // if(this.cell.figure?.color === Color.BLACK){
        //     const stepOne = this.cell.figure?.color === Color.BLACK ? 1 : -1
        //     if(target.x === this.cell.x + 1 || target.x === this.cell.x - 1){
        //         if(target.y === this.cell.y + stepOne && !target.figure){
        //             target.blackPawn = true
        //             return true
        //         }
        //         target.blackPawn = false
        //     }
        //     this.cell.blackPawn = false
        // }
    }


   public PawnStart(target: Cell){
        super.PawnStart(target)
        this.secondStep = false
   }
}