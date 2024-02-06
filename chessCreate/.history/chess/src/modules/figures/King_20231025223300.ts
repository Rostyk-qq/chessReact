import { Figure } from "./Figure"
import { Cell } from "../Cell"
import { Color } from "../Color"
import { FigureName } from "./Figure"

import kingWhite from '../../assets/white-king.png'
import kingBlack from '../../assets/black-king.png'

export class King extends Figure{
    constructor(color: Color, cell: Cell, uniqValue: number | null) {
        super(color, cell, uniqValue)
        this.logo = color === Color.WHITE ? kingWhite : kingBlack
        this.figureName = FigureName.KING
    }

    public canMove(target: Cell){
        if(!super.canMove(target)){
           return false 
        }   
        const dx = Math.abs(target.x - this.cell.x)
        const dy = Math.abs(target.y - this.cell.y)

        if(this.cell.figure?.color === Color.BLACK){
            if(target.figure?.whiteBishopBigger || target.figure?.whiteBishopLower || 
                target.figure?.whiteKnightBigger|| target.figure?.whiteKnightLower || 
                target.figure?.whiteRookBigger || target.figure?.whiteRookLower || 
                target.figure?.whiteQueen || target.figure?.whiteKing){
                    return false
            }
            for (let i = 0; i < 8; i++) {
                if(target.figure?.whitePawn[i]){
                    return false  
                }
            }
        }
        if(this.cell.figure?.color === Color.WHITE){
            if(target.figure?.blackBishopBigger || target.figure?.blackBishopLower || 
                target.figure?.blackKnightBigger|| target.figure?.blackKnightLower || 
                target.figure?.blackRookBigger || target.figure?.blackRookLower || 
                target.figure?.blackQueen || target.figure?.blackKing){
                    return false
            }
            for (let i = 0; i < 8; i++) {
                if(target.figure?.blackPawn[i]){
                    return false  
                }
            }
        }

        if(dx === 1 && dy === 1){
            return true
        }
        if(dx === 1 && dy === 0){
            return true
        }
        if(dx === 0 && dy === 1){
            return true
        }
        return false
   }
    public canBlock(target: Cell){
        const dx = Math.abs(target.x - this.cell.x)
        const dy = Math.abs(target.y - this.cell.y)

        if(this.cell.figure?.color === Color.WHITE){
            if((dx === 0 && dy === 1) || (dx === 1 && dy === 0) || (dx === 1 && dy === 1)){
                target.figure!.whiteKing = true
                return true
            }    
            target.figure!.whiteKing = false
        }
        if(this.cell.figure?.color === Color.BLACK){
            if((dx === 0 && dy === 1) || (dx === 1 && dy === 0) || (dx === 1 && dy === 1)){
                target.blackKing = true
                return true
            }    
            target.blackKing = false
        }
    }
}