import { Cell } from "./Cell"
import { Color } from "./Color";
import { Bishop } from "./figures/Bishop";
import { King } from "./figures/King";
import { Pawn } from "./figures/Pawn";
import { Queen } from "./figures/Queen";

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
        for (let i = 0; i < 8; i++) {
            new Pawn(Color.WHITE, this.getCell(7, i))
            new Pawn(Color.BLACK, this.getCell(0, i))
        }
    }
    setQueen(){
        new Queen(Color.WHITE, this.getCell(7, 4))
        new Queen(Color.BLACK, this.getCell(0, 4))
    }
    setKing(){
        new King(Color.WHITE, this.getCell(7, 3))
        new King(Color.BLACK, this.getCell(0, 3))
    }
    setBishop(){
        new Bishop(Color.WHITE, this.getCell(7, 2))
        new Bishop(Color.WHITE, this.getCell(7, 5))

        new Bishop(Color.BLACK, this.getCell(0, 3))
        new Bishop(Color.BLACK, this.getCell(7, 3))
    }
    setKnight(){
        new King(Color.WHITE, this.getCell(7, 3))
        new King(Color.BLACK, this.getCell(0, 3))
    }
    setRook(){

    }
    initFigures(){
        this.setPawns()
        this.setQueen()
        this.setKing()
        this.setBishop()
        this.setKnight()
        this.setRook()
    }

}