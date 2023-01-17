import React from 'react'
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';

const NewCanvas = ({canvas, emitClear}) => {
    const clearCanvas = () => {
        canvas.clear();
        emitClear(1);
      }
  return (
    <div>
    <Button 
          key="clear"
          type='button' 
          className="navBtn"
          name='clear' 
          onClick={clearCanvas}><RefreshIcon/> 
    </Button>
    </div>
  )
}

export default NewCanvas