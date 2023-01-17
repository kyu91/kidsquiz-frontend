import React from 'react'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const Deletes = ({ drawmodeonoff, canvas, emitDelete }) => {
  const deleteObject = () => {
    let object;
    object = canvas.getActiveObject()
    canvas.remove(canvas.getActiveObject());
    emitDelete({obj: object, id: object.id})
  }
  return (
    <div>
      {drawmodeonoff && <Button 
        key="delete"
        type='button' 
        className="navBtn"
        name='delete' 
        onClick={deleteObject}> <DeleteIcon/></Button>}
    </div>
  )
}

export default Deletes