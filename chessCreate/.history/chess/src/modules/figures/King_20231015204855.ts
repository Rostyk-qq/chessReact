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

    public canMove(target: Cell){
        if(!super.canMove(target)){
           return false 
        }   
        moveDiagonal(target: Cell){
            const dx = Math.abs(target.x - this.x);
            const dy = Math.abs(target.y - this.y);

            const directionX = this.x < target.x ? 1 : -1;    
            const directionY = this.y < target.y ? 1 : -1;

            if(dx !== dy){
                return false;
            }
            for (let i = 1; i < dy; i++) {
                if(!this.board.getCell(this.y + (i * directionY), this.x + (i * directionX)).isEmpty()){
                    return false;
                }
            }
            return true;
        }

        moveHorizontal(target: Cell){
            if(target.y !== this.y){
                return false
            }

            const max = Math.max(target.x, this.x);
            const min = Math.min(target.x, this.x);

            for(let i = min + 1; i < max; i++){
                if(!this.board.getCell(this.y, i).isEmpty()){
                    return false
                }
            }
            return true
        }

        moveVertical(target){
            if(target.x !== this.x){
                return false;
            }

            const max = Math.max(target.y, this.y);
            const min = Math.min(target.y, this.y);

            for (let i = min + 1; i < max; i++) {
                if(!this.board.getCell(i, this.x).isEmpty()){
                    return false
                }   
            }
            return true
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