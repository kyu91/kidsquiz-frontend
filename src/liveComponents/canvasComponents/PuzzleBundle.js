import React from 'react'
import Button from '@mui/material/Button';


const PuzzleBundle = ({ showimagePuzzle, setShowimagePuzzle, setShowimagePuzzlediv }) => {
    function imageshowlistPuzzle(){

        if (showimagePuzzle === false) {
          setShowimagePuzzle(true)
        }
        else {
          setShowimagePuzzle(false)
        }
       }
    
       function imageshowlistPuzzledivexit(){
          setShowimagePuzzlediv(false)
       }
  return (
    <div>
        <Button 
          key="imagepuzzle"
          type='button' 
          className="navBtn"
          name='imageaddeee2' 
          onClick={imageshowlistPuzzle}> 퍼즐 놀이</Button>

        <Button 
          key="imagepuzzledd"
          type='button' 
          className="navBtn"
          name='imageaddeee2ddd' 
          onClick={imageshowlistPuzzledivexit}> 퍼즐 종료</Button> 
    </div>
  )
}

export default PuzzleBundle