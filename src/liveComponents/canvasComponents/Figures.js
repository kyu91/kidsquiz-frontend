import React from 'react'
import { fabric } from 'fabric';
import { v1 as uuid } from 'uuid'
import { Button } from '@mui/material';

const Figures = ({canvas, colorvalue, emitAdd, drawmodeonoff}) => {
    const addShape = (e) => {
        let type = e.target.name;
        let object
    
        if (type === 'rectangle') {
          object = new fabric.Rect({
            fill : colorvalue,
            height: 75,
            width: 150,
          });
    
        } else if (type === 'triangle') {
          object = new fabric.Triangle({
            fill : colorvalue,
            width: 100,
            height: 100,
          })
    
        } else if (type === 'circle') {
          object = new fabric.Circle({
            fill : colorvalue,
            radius: 50,
          })
        }
        object.set({id: uuid()})
        canvas.add(object)
        canvas.renderAll()
        emitAdd({obj: object, id: object.id})
    
      };
  return (
    <div>
        {drawmodeonoff && <Button 
          key="Square"
          type='button' 
          className="navBtn"
          name='circle' 
          onClick={addShape}> 원 🟢 </Button>}

        {drawmodeonoff && <Button  
          key = "Triangle"
          type='button' 
          className="navBtn"
          name='triangle' 
          onClick={addShape}> 삼각형 🔺</Button>}

        {drawmodeonoff && <Button 
          key="Rectangle"
          type='button' 
          className="navBtn"
          name='rectangle' 
          onClick={addShape}>사각형 🟦 </Button>}
    </div>
  )
}

export default Figures