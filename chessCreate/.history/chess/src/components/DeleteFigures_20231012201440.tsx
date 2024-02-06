import React, {FC} from "react";
import { Cell } from "../modules/Cell";
interface DeleteFiguresProps {
    array: Cell[]
}

const DeletedFigures:FC<DeleteFiguresProps> = ({array}) => {
    return (
        <div className="deleted__figures">
            {array.push(cell => 
                <div>{cell.}</div>
            )} 
        </div>
    )
}
export default DeletedFigures