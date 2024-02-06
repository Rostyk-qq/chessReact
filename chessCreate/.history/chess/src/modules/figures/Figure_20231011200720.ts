import { Cell } from "../Cell";
import { Color } from "../Color";
impodt assets
enum FigureName {
    PAWN = 'пішак',
    KING = 'король',
    KNIGHT = 'кінь',
    QUEEN = 'король',
    BISHOP = 'офіцер',
}

export class Figure{
    cell: Cell
    color: Color
    logo: string | null
    figureName: FigureName
    id: number
  
    constructor(color: Color, cell: Cell) {
        this.color = color
        this.cell = cell
        this.logo = null
        this.figureName = FigureName.BISHOP
    }
}