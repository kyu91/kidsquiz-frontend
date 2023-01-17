import React from 'react'
import Button from '@mui/material/Button';

const ImageBundle = ({ showimage, setShowimage }) => {
    function imageshowlist(){

        if (showimage === false) {
          setShowimage(true)
        }
        else {
          setShowimage(false)
        }
       }
  return (
    <Button 
        key="image"
        type='button' 
        className="navBtn"
        name='imageaddeee' 
        onClick={imageshowlist}> 이미지</Button>
  )
}

export default ImageBundle