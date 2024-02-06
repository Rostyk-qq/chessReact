import React, {FC, useState} from "react";
import { Cell } from "../modules/Cell";
import { Figure } from "../modules/figures/Figure";
import { Color } from "../modules/Color";

interface DeleteFiguresProps {
    deletedFigures: Figure[]
    title: string
    color: Color 
}

const DeletedFigures:FC<DeleteFiguresProps> = ({deletedFigures, title, color}) => {
    const [color, setColor] = useState<Figure | null>(null);
    return (
        <div className="deleted__figures">
            <h1 style={{backgroundColor: deletedFigures[0].color === Color.WHITE ? 'white' : 'black'}}>{title}</h1>
            {deletedFigures.map(figure => (
               <span key={figure.id} className="figures">
                   {figure.figureName}:{figure.logo && <img src={figure.logo} width={30} height={30} />},&ensp; 
               </span>
           ))} 
        </div>
    )
}
export default DeletedFigures