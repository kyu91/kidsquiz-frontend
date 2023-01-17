import React from 'react'
import Button from '@mui/material/Button';

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
        onClick={deleteObject}> 지우기 </Button>}
    </div>
  )
}

export default Deletes