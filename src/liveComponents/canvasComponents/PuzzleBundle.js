import React from 'react'
import Button from '@mui/material/Button';
import ExtensionIcon from '@mui/icons-material/Extension';
import ExtensionOffIcon from '@mui/icons-material/ExtensionOff';


const PuzzleBundle = ({ showimagePuzzle, setShowimagePuzzle, setShowimagePuzzlediv }) => {
    function imageshowlistPuzzle(){

        if (showimagePuzzle === false) {
          setShowimagePuzzle(true)
        }
        else {
          setShowimagePuzzle(false)
        }
       }
    
       
    function imageshowlistPuzzledivexit() {
          setShowimagePuzzlediv(false)
       }


  return (
    <div>
        <Button 
          key="imagepuzzle"
          type='button' 
          className="navBtn"
          name='imageaddeee2' 
          onClick={imageshowlistPuzzle}><ExtensionIcon/></Button>


        <Button 
          key="imagepuzzleexit"
          type='button' 
          className="navBtn"
          name='imageaddeee2ddd' 
          onClick={imageshowlistPuzzledivexit}><ExtensionOffIcon/></Button> 
    </div>
  )
}

export default PuzzleBundle