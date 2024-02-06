import React, {FC} from "react";
import { Cell } from "../modules/Cell";
interface DeleteFiguresProps {
    deletedFigures: Cell[]
}

const DeletedFigures:FC<DeleteFiguresProps> = ({deletedFigures, title}) => {
    return (
        <div className="deleted__figures">
            {deletedFigures.map(cell => (
               <span className="figures">
                   {cell.figure?.figureName}: {cell.figure?.logo && <img src={cell.figure?.logo} width={30} height={30} />} 
               </span>
           ))} 
        </div>
    )
}
export default DeletedFigures