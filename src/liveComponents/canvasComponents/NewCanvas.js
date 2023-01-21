import React from 'react'
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';

const NewCanvas = ({canvas, emitClear}) => {
  const [hover, setHover] = React.useState(false);
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
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={clearCanvas}><RefreshIcon/> 
    </Button>
    </div>
  )
}

export default NewCanvas