export class Figure{
    cell: Cell
    color: Color
    logo: typeof logo | null
    figureName: FigureName
    id: number
  
    constructor(color: Color, cell: Cell) {
        this.color = color
        this.cell = cell
        this.logo = null
        this.figureName = FigureName.BISHOP
        this.id = Math.random()
    }

    public canMove(target: Cell){
        
    }
    public PawnStart(target: Cell){

    }
}