import { Cell } from "./Cell"

export class Board {
    private cells: Cell[][] = [] 

    public initCells(){
        for (let i = 0; i < 8; i++) {
            const row: Cell[] = [];
            for (let j = 0; j < 8; j++) {
                if((i + j) % 2 !== 0){
                    new Cell
                }
            }
            
        }
    }
}