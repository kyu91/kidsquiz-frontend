import React from 'react'
import Button from '@mui/material/Button';

const NewCanvas = ({canvas, emitClear}) => {
    const clearCanvas = () => {
        canvas.clear();
        emitClear(1);
      }
  return (
    <Button 
          key="clear"
          type='button' 
          className="navBtn"
          name='clear' 
          onClick={clearCanvas}>새 도화지 
    </Button>
  )
}

export default NewCanvas