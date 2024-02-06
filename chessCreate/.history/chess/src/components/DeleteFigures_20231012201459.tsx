import React, {FC} from "react";
import { Cell } from "../modules/Cell";
interface DeleteFiguresProps {
    array: Cell[]
}

const DeletedFigures:FC<DeleteFiguresProps> = ({array}) => {
    return (
        <div className="deleted__figures">
            {array.map(cell => (
               <span className="figures">
                   {}
               </span>
           ))} 
        </div>
    )
}
export default DeletedFigures