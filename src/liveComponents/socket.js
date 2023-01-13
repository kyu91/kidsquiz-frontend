import io from 'socket.io-client'
import {fabric} from 'fabric'
const socket = io("http://localhost:4000/")
// emitters
export const emitAdd = (obj) => {
  socket.emit('object-added', obj)
}
export const emitAddImage = (data) => {
  socket.emit('imageobj-added', data)
  console.log("이미지 전송 완료")
  console.log(data)
}
export const emitAddP = (path) =>{
    socket.emit('path-added', path)
}
export const emitModify = (obj) => {
  socket.emit('object-modified', obj)
}
export const emitDelete = (obj) => {
    socket.emit('object-deleted', obj)
}
export const emitClear = (obj) => {
    socket.emit('object-clear',obj)
}
// listeners
export const addObj = canvas => {
  socket.off('new-add')
  socket.on('new-add', data => {
    const {obj, id} = data
    let object
    if (obj.type === 'rect') {
      object = new fabric.Rect({
        height: obj.height,
        width: obj.width,
        fill: obj.fill,
        skewX: obj.skewX,
        left: obj.left,
        right: obj.right,
        top: obj.top,
        angle: obj.angle
      })
    } else if (obj.type === 'circle') {
      object = new fabric.Circle({
        radius: obj.radius,
      })
    } else if (obj.type === 'triangle') {
      object = new fabric.Triangle({
        width: obj.width,
        height: obj.height,
        left: obj.left,
        right: obj.right,
        top: obj.top,
        angle: obj.angle,
        fill: obj.fill,
      })
    }
    object.set({id: id})
    canvas.add(object)
    canvas.renderAll()
  })
}
export const addimageObj = canvas => {
  socket.off('new-addimg')
  socket.on('new-addimg', data =>{
    const {url, id} = data
    let object
    fabric.Image.fromURL(url, function(Image){
      Image.scale(0.3);
      object = Image
      object.set({id : id})
      canvas.add(object);
      canvas.renderAll()
    })
  })
}
export const addPObj = canvas => {
    socket.off('new-addP')
    socket.on('new-addP', data => {
      const {path, id} = data
      var objectpath
      console.log('addPObj의 문제');
      objectpath = new fabric.Path(path.path, {
        fill: path.fill,
        stroke: path.color,
        strokeWidth: path.width,
        strokeLineCap: path.strokeLineCap,
        strokeMiterLimit: path.strokeLineJoin,
        strokeDashArray: path.storkeDashArray,
          })
      console.log('addPObj의 문제2');
      objectpath.set({id: id})
      objectpath.set({path: path.path})
objectpath.set({type: path.type})
objectpath.set({originX: path.originX})
objectpath.set({originY: path.originY})
objectpath.set({left: path.left})
objectpath.set({top: path.top})
objectpath.set({width: path.width})
objectpath.set({height: path.height})
objectpath.set({stroke: path.stroke})
objectpath.set({strokeWidth: path.strokeWidth})
objectpath.set({strokeDashArray: path.strokeDashArray})
objectpath.set({strokeLineCap: path.strokeLineCap})
objectpath.set({strokeDashOffset: path.strokeDashOffset})
objectpath.set({strokeLineJoin: path.strokeLineJoin})
objectpath.set({strokeUniform: path.strokeUniform})
objectpath.set({strokeMiterLimit: path.strokeMiterLimit})
objectpath.set({scaleX: path.scaleX})
objectpath.set({scaleY: path.scaleY})
objectpath.set({angle: path.angle})
objectpath.set({flipX: path.flipX})
objectpath.set({flipY: path.flipY})
objectpath.set({opacity: path.opacity})
objectpath.set({shadow: path.shadow})
objectpath.set({visible: path.visible})
objectpath.set({backgroundColor: path.backgroundColor})
objectpath.set({fillRule: path.fillRule})
objectpath.set({paintFirst: path.paintFirst})
objectpath.set({globalCompositeOperation: path.globalCompositeOperation})
      console.log('addPObj의 문제3');
      objectpath.setCoords()
      canvas.add(objectpath)
      console.log('addPObj의 문제4');
      console.log(objectpath);
      console.log(path);
      canvas.requestRenderAll();
    })
  }
export const modifyObj = canvas => {
  socket.on('new-modification', data => {
    const { obj, id } = data
    canvas.getObjects().forEach(object => {
      if (object.id === id) {
        object.set(obj)
        object.setCoords()
        canvas.renderAll()
      }
    })
  })
}
export const deleteObj = canvas => {
    socket.on('deleteallcanvas', data => {
        const { obj, id } = data
        console.log(data)
        canvas.getObjects().forEach(object => {
            if (object.id === id) {
            console.log('통과1',object,obj);
            canvas.remove(object);
            object.setCoords()
              canvas.renderAll()
            }
        })
    })
}
export const clearObj = canvas =>{
    socket.on('clearcanvas', data => {
        console.log(data)
        canvas.clear();
        canvas.renderAll()
    })
}
export default socket