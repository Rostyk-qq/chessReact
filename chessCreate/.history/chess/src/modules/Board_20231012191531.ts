import { Cell } from "./Cell"
import { Color } from "./Color";
import { Bishop } from "./figures/Bishop";
import { King } from "./figures/King";
import { Pawn } from "./figures/Pawn";
import { Queen } from "./figures/Queen";
import { Knight } from "./figures/Knight";
import { Rook } from "./figures/Rook";
export class Board {
    public cells: Cell[][] = [] 
    public deletedWhiteFigures: Cell[] = []
    public deletedBlackFigures: Cell[] = []

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

    doRefreshFigures(targetClicked: Cell | null){
        for (let i = 0; i < this.cells.length; i++) {
            const row:Cell[] = this.cells[i];
            for (let j = 0; j < row.length; j++) {
                let cell = row[j];
                cell.available = !!targetClicked?.figure?.canMove(cell)              
            }
        }
    }
    createNewInstance(){
        const newBoard = new Board();
        newBoard.cells = this.cells
        return newBoard;
    }

    getCell(y: number, x: number){
        return this.cells[x][y];
    }
    setPawns(){
        for (let i = 0; i < 8; i++) {
            new Pawn(Color.WHITE, this.getCell(6, i))
            new Pawn(Color.BLACK, this.getCell(1, i))
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

        new Bishop(Color.BLACK, this.getCell(0, 2))
        new Bishop(Color.BLACK, this.getCell(0, 5))
    }
    setKnight(){
        new Knight(Color.WHITE, this.getCell(7, 1))
        new Knight(Color.WHITE, this.getCell(7, 6))

        new Knight(Color.BLACK, this.getCell(0, 1))
        new Knight(Color.BLACK, this.getCell(0, 6))
    }
    setRook(){
        new Rook(Color.WHITE, this.getCell(7, 0))
        new Rook(Color.WHITE, this.getCell(7, 7))

        new Rook(Color.BLACK, this.getCell(0, 0))
        new Rook(Color.BLACK, this.getCell(0, 7))
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