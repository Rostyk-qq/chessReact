import { Cell } from "../Cell";
import { Color } from "../Color";

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
    logo: string
    NameFigure: FigureName
    id: number
}