import { Cell } from "./Cell"
import { Color } from "./Color";

export class Board {
    private cells: Cell[][] = [] 

    public initCells(){
        for (let i = 0; i < 8; i++) {
            const row: Cell[] = [];
            for (let j = 0; j < 8; j++) {
                if((i + j) % 2 !== 0){
                    this.cells.push(new Cell(this, j , i, null, Color.))
                }
                else{
                    this.cells.push(new Cell())
                }
            }
            this.cells.push(row)
        }
    }
}