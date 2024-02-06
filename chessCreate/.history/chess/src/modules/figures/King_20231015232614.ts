import { Figure } from "./Figure"
import { Cell } from "../Cell"
import { Color } from "../Color"
import { FigureName } from "./Figure"

import kingWhite from '../../assets/white-king.png'
import kingBlack from '../../assets/black-king.png'

export class King extends Figure{


    constructor(color: Color, cell: Cell) {
        super(color, cell)
        this.logo = color === Color.WHITE ? kingWhite : kingBlack
        this.figureName = FigureName.KING
    }


    checkHorizontal(cell: Cell, kingParams: XY){  
        if(cell.y !== kingParams.y){
            return false
        }    
        
        const max = Math.max(cell.x, kingParams.x);
        const min = Math.min(cell.x, kingParams.x);

        for (let i = min; i < max; i++) {
            if(!this.board.getCell(cell.y, i).isEmpty()){
                if (this.board.getCell(cell.y, i).figure?.figureName !== FigureName.KING) {
                    return false
                }
            }
        }
        return true
    }

    checkVertical(cell: Cell, kingParams: XY){  
        if(cell.x !== kingParams.x){
            return false
        }    
        
        const max = Math.max(cell.y, kingParams.y);
        const min = Math.min(cell.y, kingParams.y);

        for (let i = min + 1; i < max; i++) {
            if(!this.board.getCell(i, cell.x).isEmpty()){
                if (this.board.getCell(i, cell.x).figure?.figureName !== FigureName.KING) {
                    return false
                }
            }
        }
        return true
    }

    checkKnight(cell: Cell, kingParams: XY){ 
        const dx = Math.abs(cell.x - kingParams.x);
        const dy = Math.abs(cell.y - kingParams.y);

        if((dy === 2 && dx === 1) || (dy === 1 && dx === 2)){
            return true  
        }
        return false
    }

    checkPawn(cell: Cell, kingParams: XY){
        const direction = cell.figure?.color === Color.BLACK ? 1 : -1;
        if(kingParams.y === cell.y + direction && cell.figure && (kingParams.x === cell.x + 1 || kingParams.x === cell.x - 1)){
            return true
        }
        return false
    }



    checkQueen(cellQueen: Cell){

    }
    checkBishop(cellBishop: Cell){

    }
    checkRook(cellRook: Cell){

    }
    checkKnight(cellKnight: Cell){

    }
    checkPawn(cellPawn: Cell){

    }


    public canMove(target: Cell){
        if(!super.canMove(target)){
           return false 
        }   

        const dx = Math.abs(target.x - this.cell.x)
        const dy = Math.abs(target.y - this.cell.y)

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
}