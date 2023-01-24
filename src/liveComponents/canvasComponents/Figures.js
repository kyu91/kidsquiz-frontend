import React from 'react'
import { v1 as uuid } from 'uuid'
import { fabric } from 'fabric';
import { Button } from '@mui/material';
import "../css/Canvas.css"

const Figures = ({canvas, colorvalue, emitAdd, showFigureBundleHandler}) => {
    const addShape = (e) => {
        let type = e.target.name;
        let object
    
        if (type === 'rectangle') {
          object = new fabric.Rect({
            fill : colorvalue,
            left : 230,
            top: 150,
            height: 75,
            width: 150,
          });
    
        } else if (type === 'triangle') {
          object = new fabric.Triangle({
            fill : colorvalue,
            left : 230,
            top: 150,
            width: 100,
            height: 100,
          })
    
        } else if (type === 'circle') {
          object = new fabric.Circle({
            fill : colorvalue,
            left : 230,
            top: 150,
            radius: 50,
          })
        }
        object.set({id: uuid()})
        canvas.add(object)
        canvas.renderAll()
        emitAdd({obj: object, id: object.id, left: object.left, top: object.top})
        showFigureBundleHandler();
      };
  return (
    <div className="figuresBox">
        <Button 
          key="Circle"
          type='button' 
          className="navBtn"
          name='circle' 
          onClick={addShape}>원</Button>

        <Button  
          key = "Triangle"
          type='button' 
          className="navBtn"
          name='triangle' 
          onClick={addShape}>삼각형</Button>

        <Button 
          key="Rectangle"
          type='button' 
          className="navBtn"
          name='rectangle' 
          onClick={addShape}>사각형</Button>
    </div>
  )
}

export default Figures