import {createContext} from 'react'
import Cell
interface kingProps {
    king: Cell | null
    setKing: (king: Cell | null) => void
}
export const AppContext = createContext<kingProps | null>(null)