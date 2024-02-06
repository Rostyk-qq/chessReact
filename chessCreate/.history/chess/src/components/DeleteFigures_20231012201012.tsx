import React, {FC} from "react";
import { Cell } from "../modules/Cell";
interface DeleteFiguresProps {
    array: Cell[]
}

const DeletedFigures:FC<DeleteFiguresProps> = ({array}) => {
    return (
        <div>
           {array.push(cell => (
                
           ))} 
        </>
    )
}
export default DeletedFigures