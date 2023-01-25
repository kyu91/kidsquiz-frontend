import React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";

const Deletes = ({ canvas, emitDelete }) => {
  const deleteObject = () => {
    let object;
    object = canvas.getActiveObject();
    canvas.remove(canvas.getActiveObject());
    emitDelete({ obj: object, id: object.id });
  };
  return (
    <div>
      <Tooltip title="선택 삭제" placement="right">
        <Button
          key="delete"
          type="button"
          className="navBtn"
          name="delete"
          onClick={deleteObject}
        >
          {" "}
          <DeleteIcon fontSize='large'/>
        </Button>
      </Tooltip>
    </div>
  );
};

export default Deletes;
