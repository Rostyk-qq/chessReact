import React,{FC, useState, useEffect} from 'react';
import { Board } from '../modules/Board';
import CellComponent from './CellComponent';
import { Cell } from '../modules/Cell';
import { Player } from '../modules/Player';
import { Figure, FigureName } from '../modules/figures/Figure';
import { Color } from '../modules/Color';
import ChangeFigures from './ChangedFigures';

interface BoardProps {
    board: Board,
    setBoard: (board: Board) => void
    change: () => void
    currentColor: Player | null
}

interface XY {
    x: number
    y: number
}

const BoardComponent:FC<BoardProps> = ({board, setBoard, change, currentColor}) => {
    const [clicked, setClicked] = useState<Cell | null>(null)

    const [blackKing, setBlackKing] = useState<XY>({y: 0 , x: 3});
    const [whiteKing, setWhiteKing] = useState<XY>({y: 7 , x: 3});

    const [blackKingCell, setBlackKingCell] = useState<Cell | null>(null);
    const [whiteKingCell, setWhiteKingCell] = useState<Cell | null>(null);

    const [whitePawn, setWhitePawn] = useState<Figure | null>(null);
    const [blackPawn, setBlackPawn] = useState<Figure | null>(null);
    
    const [availableWhiteCasting, setAvailableWhiteCasting] = useState<boolean>(true)
    const [availableBlackCasting, setAvailableBlackCasting] = useState<boolean>(true)
    

    function alertBlackKing(){
        alert('Шах чорному королю!')
    }    
    function alertWhiteKing(){
        alert('Шах білому королю!')
    }

    const click = (cell: Cell) => {
        if(cell.figure?.figureName === FigureName.KING && cell !== clicked){
            if(cell.figure.color === Color.BLACK){
                setBlackKing({...blackKing, x: cell.x, y: cell.y})
                setBlackKingCell(cell)
            }
            else{
                setWhiteKing({...whiteKing, x: cell.x, y: cell.y})
                setWhiteKingCell(cell)
            }
        }
        if(clicked && cell !== clicked && cell.figure?.figureName !== FigureName.KING && clicked.figure?.canMove(cell)){
            clicked.moveFigure(cell);
            setTimeout(() => {
                if(cell.figure?.color === Color.WHITE){
                    if(cell.blackKingKill(cell, blackKing)){
                        alertBlackKing()
                    }
                }
                if(cell.figure?.color === Color.BLACK){
                    if(cell.whiteKingKill(cell, whiteKing)){
                        alertWhiteKing()
                    }
                }
            }, 100)

            if (cell.figure?.color === Color.WHITE && cell.y === 0 && cell.figure?.figureName === FigureName.PAWN) {
                setWhitePawn(cell.figure)
            }
            if (cell.figure?.color === Color.BLACK && cell.y === 7 && cell.figure?.figureName === FigureName.PAWN) {
                setBlackPawn(cell.figure)
            }
            
            if(availableWhiteCasting){    
                if((clicked.y === 7 && clicked.x === 0) && (cell.y === 7 && cell.x === 3)){
                        if(clicked.clearToCastling(clicked, cell)){
                            const XY = {kingX: 1, rookX: 2}
                            if(cell.Castling(clicked, cell, XY, Color.WHITE)){
                                cell.clearCastling(clicked, cell, Color.WHITE)
                            }
                            setAvailableWhiteCasting(false)
                        }   
                }
                if((clicked.y === 7 && clicked.x === 7) && (cell.y === 7 && cell.x === 3)){
                    if(clicked.clearToCastling(clicked, cell)){
                        const XY = {kingX: 6, rookX: 5}
                        if(cell.biggerCastling(clicked, cell, XY, Color.WHITE)){
                            cell.clearBiggerCastling(clicked, cell, Color.WHITE)
                        }
                        setAvailableWhiteCasting(false)
                    }   
                }
            }

            if(availableBlackCasting){
                if((clicked.y === 0 && clicked.x === 0) && (cell.y === 0 && cell.x === 3)){
                    if(clicked.clearToCastling(clicked, cell)){
                        const XY = {kingX: 1, rookX: 2}
                        if(cell.Castling(clicked, cell, XY, Color.BLACK)){
                            cell.clearCastling(clicked, cell, Color.BLACK)
                        }
                        setAvailableBlackCasting(false)
                    }   
                }
                if((clicked.y === 0 && clicked.x === 7) && (cell.y === 0 && cell.x === 3)){
                    if(clicked.clearToCastling(clicked, cell)){
                        const XY = {kingX: 6, rookX: 5}
                        if(cell.biggerCastling(clicked, cell, XY, Color.BLACK)){
                            cell.clearBiggerCastling(clicked, cell, Color.BLACK)
                        }
                        setAvailableBlackCasting(false)
                    }   
                }
            }
            setClicked(null)
            change()
        }
        else{
            if(currentColor?.color === cell.figure?.color){
                setClicked(cell)
            }
        }
    }
    useEffect(() => {
        refresh()
    }, [clicked])

    const refresh = () => {
         board.doRefreshFigures(clicked)
         createNewInstance()
    } 
    const createNewInstance = () => {
        const newBoard = board.createNewInstance();
        setBoard(newBoard)
    }
    return (
        <div className='board'>
            {blackPawn && <ChangeFigures board={board} setPawn={setBlackPawn} array={board.arrayBlackForChange} pawn={blackPawn} />}
            {whitePawn && <ChangeFigures board={board} setPawn={setWhitePawn} array={board.arrayWhiteForChange} pawn={whitePawn} />}
            
            {board.cells.map((row, id) => 
                <React.Fragment key={id}>
                    {row.map(element => 
                        <CellComponent click={click} selected={element.x === clicked?.x && element.y === clicked?.y} key={element.id} cell={element} />
                    )}
                </React.Fragment>
            )}
        </div>
    )
}
export default BoardComponent



