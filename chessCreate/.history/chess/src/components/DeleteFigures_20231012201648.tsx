import React, {FC} from "react";
import { Cell } from "../modules/Cell";
interface DeleteFiguresProps {
    deletedFigures: Cell[]
}

const DeletedFigures:FC<DeleteFiguresProps> = ({array}) => {
    return (
        <div className="deleted__figures">
            {array.map(cell => (
               <span className="figures">
                   {cell.figure?.figureName}: {cell.figure?.logo && <img src={cell.figure?.logo} />} 
               </span>
           ))} 
        </div>
    )
}
export default DeletedFigures