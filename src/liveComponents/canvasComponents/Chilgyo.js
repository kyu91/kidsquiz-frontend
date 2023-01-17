import React from 'react'
import { v1 as uuid } from 'uuid'
import { fabric } from 'fabric';
import { Button } from '@mui/material';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';


const Chilgyo = ({ drawmodeonoff, emitAdd, canvas }) => {
    const addTangram = ()=> {
    
        let object
    
        object = new fabric.Triangle({
          width : 300,
          height : 150,
          fill : 'red',
          angle : 90,
          left : 300,
          top :200,
        })
    
        object.set({id: uuid()})
        canvas.add(object)
        emitAdd({obj: object, id: object.id})
    
        object = new fabric.Triangle({
          width : 300,
          height : 150,
          fill : 'green',
          left : 150,
          top : 350,
        })
        object.set({id: uuid()})
        canvas.add(object)
    
        emitAdd({obj: object, id: object.id})
    
        object = new fabric.Triangle({
          width : 150,
          height : 75,
          fill : 'yellow',
          left : 375,
          top : 500,
          angle : -90,
        })
        object.set({id: uuid()})
        canvas.add(object)
    
        emitAdd({obj: object, id: object.id})
    
        object = new fabric.Triangle({
          width : 150,
          height : 75,
          fill : 'orange',
          left : 375,
          top : 350,
          angle : 180,
        })
        object.set({id: uuid()})
        canvas.add(object)
      
        emitAdd({obj: object, id: object.id})
    
        object = new fabric.Triangle({
          width : 212,
          height : 106,
          fill : 'orange',
          left : 375,
          top : 123,
          angle : 45,
        })
        object.set({id: uuid()})
        canvas.add(object)
        emitAdd({obj: object, id: object.id})
    
        object = new fabric.Rect({
          width : 106,
          height : 106,
          fill : 'purple',
          left : 375,
          top : 275,
          angle : 45,
        })
        object.set({id: uuid()})
        canvas.add(object)
        emitAdd({obj: object, id: object.id})
    
        object = new fabric.Rect({
          width : 150,
          height : 75,
          fill : 'blue',
          skewX : 45,
          left : 150,
          top : 200,
          angle : 0,
        })
        object.set({id: uuid()})
        canvas.add(object)
        emitAdd({obj: object, id: object.id})
      }
  return (
    <div>
        {drawmodeonoff && <Button 
          key="addTangram"
          type='button' 
          className="navBtn"
          name='addTangram' 
          onClick={addTangram}><DashboardCustomizeIcon/></Button>}
    </div>
  )
}

export default Chilgyo