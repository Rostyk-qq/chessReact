import React, {FC} from "react";

interface DeleteFiguresProps {
    array: Cell[]
}

const DeletedFigures:FC = ({array}) => {
    return (
        <h1>
            Deleted Figures     
        </h1>
    )
}
export default DeletedFigures