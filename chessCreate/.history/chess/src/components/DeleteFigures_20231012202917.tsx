import React, {FC} from "react";
import { Cell } from "../modules/Cell";
import { Figure } from "../modules/figures/Figure";
interface DeleteFiguresProps {
    deletedFigures: Figure[]
    title: string
}

const DeletedFigures:FC<DeleteFiguresProps> = ({deletedFigures, title}) => {
    return (
        <div className="deleted__figures">
            <h1>{title}</h1>
            {deletedFigures.map(figure => (
               <span key={figure.} className="figures">
                   {figure.figureName}:{figure.logo && <img src={cell.figure?.logo} width={30} height={30} />} 
               </span>
           ))} 
        </div>
    )
}
export default DeletedFigures