import { Cell } from "./Cell"
import { Color } from "./Color";

export class Board {
    public cells: Cell[][] = [] 

    public initCells(){
        for (let i = 0; i < 8; i++) {
            const row: Cell[] = [];
            for (let j = 0; j < 8; j++) {
                if((i + j) % 2 !== 0){
                    row.push(new Cell(this, j , i, Color.BLACK, null))
                }
                else{
                    row.push(new Cell(this, j , i, Color.WHITE, null))
                }
            }
            this.cells.push(row)
        }
    }

    getCell(y: number, x: number){
        return this.cells[y][x];
    }
    setPawns(){

    }
    setQueen(){

    }
    setKing(){

    }
    setBishop(){

    }
    setKnight(){

    }
    setRook(){

    }
    initFigures(){
        this.setPawns()
        this.setQueen()
        this.setKing()
        this.setBishop()
        this.setKnight()
        this.setKing()
    }

}