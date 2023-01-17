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
    
       
    function imageshowlistPuzzledivexit() {
          setShowimagePuzzlediv(false)
       }


  return (
    <div>
        <Button 
          key="imagepuzzle"
          type='button' 
          className="navBtn"
          name='puzzleAsobi' 
          onClick={imageshowlistPuzzle}> 퍼즐 놀이</Button>

        <Button 
          key="imagepuzzleexit"
          type='button' 
          className="navBtn"
          name='puzzleAsobishuryo' 
          onClick={imageshowlistPuzzledivexit}> 퍼즐 종료</Button> 
    </div>
  )
}

export default PuzzleBundle