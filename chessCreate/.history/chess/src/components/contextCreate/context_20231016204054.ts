import {createContext} from 'react'
interface kingProps {
    king: Cell | null
    setKing: (king: Cell | null) => void
}
export const AppContext = createContext<kingProps | null>()