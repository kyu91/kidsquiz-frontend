import React from 'react'
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';

const drawToggle = ({canvas, setShow, setdrawmodeonoff}) => {
    const drawmode = () => {
        if (canvas.isDrawingMode === true){
          canvas.isDrawingMode = false
          setShow(false)
          setdrawmodeonoff(true)
        }
        else {
          canvas.isDrawingMode = true
          setShow(true)
          setdrawmodeonoff(false)
        }
      }
  return (
    <Button 
          key="on/off(draw)"
          type='button' 
          className="navBtn"
          name='on/off(draw)' 
          onClick={drawmode}> 
          <CreateIcon></CreateIcon>
          
    </Button>
  )
}

export default drawToggle