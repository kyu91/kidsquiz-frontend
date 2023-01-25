// import io from 'socket.io-client'
import {fabric} from 'fabric'
import { useState } from 'react'
import socket from "./socketExport"

let tempcounting = 0

// emitters

export const emitCanvas = (socketId,objs) => {
  socket.emit("canvasUpdate", socketId,objs)
  console.log("캔버스 업데이트 확인")
}
export const emitUrl = (obj) => {
  socket.emit("sendPuzzleURL", obj)
}
export const emitAdd = (obj) => {
  socket.emit('object-added', obj)
}
export const emitAddImage = (data) => {
  socket.emit('imageobj-added', data)
  // console.log("이미지 전송 완료")
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
        top: obj.top,
        angle: obj.angle
      })
    } else if (obj.type === 'circle') {
      object = new fabric.Circle({
        fill: obj.fill,
        left: obj.left,
        top: obj.top,
        radius: obj.radius,
      })
    } else if (obj.type === 'triangle') {
      object = new fabric.Triangle({
        width: obj.width,
        height: obj.height,
        left: obj.left,
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
    const {url, id, left, top} = data
    let object
    fabric.Image.fromURL(url, function(Image){
      Image.scale(0.4);
      object = Image
      object.set({id : id, left : left, top : top})
      canvas.add(object);
      canvas.renderAll()
    })
  })
}
export const addPObj = canvas => {
    socket.off('new-addP')
    socket.on('new-addP', data => {
      const {path, id} = data
      var object
      console.log('addPObj의 문제');
      object = new fabric.Path(path.path, {
        fill: path.fill,
        stroke: path.color,
        strokeWidth: path.width,
        strokeLineCap: path.strokeLineCap,
        strokeMiterLimit: path.strokeLineJoin,
        strokeDashArray: path.storkeDashArray,
          })
      console.log('addPObj의 문제2');
      object.set({id: id})
      object.set({path: path.path})
object.set({type: path.type})
object.set({originX: path.originX})
object.set({originY: path.originY})
object.set({left: path.left})
object.set({top: path.top})
object.set({width: path.width})
object.set({height: path.height})
object.set({stroke: path.stroke})
object.set({strokeWidth: path.strokeWidth})
object.set({strokeDashArray: path.strokeDashArray})
object.set({strokeLineCap: path.strokeLineCap})
object.set({strokeDashOffset: path.strokeDashOffset})
object.set({strokeLineJoin: path.strokeLineJoin})
object.set({strokeUniform: path.strokeUniform})
object.set({strokeMiterLimit: path.strokeMiterLimit})
object.set({scaleX: path.scaleX})
object.set({scaleY: path.scaleY})
object.set({angle: path.angle})
object.set({flipX: path.flipX})
object.set({flipY: path.flipY})
object.set({opacity: path.opacity})
object.set({shadow: path.shadow})
object.set({visible: path.visible})
object.set({backgroundColor: path.backgroundColor})
object.set({fillRule: path.fillRule})
object.set({paintFirst: path.paintFirst})
object.set({globalCompositeOperation: path.globalCompositeOperation})
      console.log('addPObj의 문제3');
      object.setCoords()
      canvas.add(object)
      console.log('addPObj의 문제4');
      console.log(object);
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
// export const clearObj = canvas =>{
//     socket.on('clearcanvas', data => {
//         console.log(data)
//         canvas.clear();
//         canvas.renderAll()
//     })
// }
export const canvasChange = canvas => {
  //조건 걸어서 똑같은 아이디가 있으면 더이상 만들어지지 않도록 해줘야 합니더
  socket.on('canvassetnewuser', data => {
    const {objs, objsid} = data
    console.log(objsid[0])
    let object
    tempcounting += 1
    if (tempcounting % 4 === 0) {
    objs.map((v,i) => {
      // canvas.getObjects().forEach(object => {
      //   if (object.id !== objsid[i])
      //     console.log('so long ')
          if (v.type === 'image'){
            fabric.Image.fromURL(v.src, function(Image){
              Image.scale(0.4);
              object = Image
              object.set({id : objsid[i], left : v.left, top : v.top})
              canvas.add(object);
              canvas.renderAll()
            })
              }
              else if (v.type === 'rect') {
                object = new fabric.Rect({
                  height: v.height,
                  width: v.width,
                  fill: v.fill,
                  skewX: v.skewX,
                  left: v.left,
                  top: v.top,
                  angle: v.angle
                })
                object.set({id: objsid[i]})
                canvas.add(object)
                canvas.renderAll()
              } else if (v.type === 'circle') {
                object = new fabric.Circle({
                  fill: v.fill,
                  left: v.left,
                  top: v.top,
                  radius: v.radius,
                })
                object.set({id: objsid[i]})
                canvas.add(object)
                canvas.renderAll()
              } else if (v.type === 'triangle') {
                object = new fabric.Triangle({
                  width: v.width,
                  height: v.height,
                  left: v.left,
                  top: v.top,
                  angle: v.angle,
                  fill: v.fill,
                })
                object.set({id: objsid[i]})
                canvas.add(object)
                canvas.renderAll()
              } else if (v.type === 'path') {
        
                object = new fabric.Path(v.path, {
                  fill: v.fill,
                  stroke: v.color,
                  strokeWidth: v.width,
                  strokeLineCap: v.strokeLineCap,
                  strokeMiterLimit: v.strokeLineJoin,
                  strokeDashArray: v.storkeDashArray,
                  })
                object.set({id: objsid[i]})
                object.set({path: v.path})
                object.set({type: v.type})
                object.set({originX: v.originX})
                object.set({originY: v.originY})
                object.set({left: v.left})
                object.set({top: v.top})
                object.set({width: v.width})
                object.set({height: v.height})
                object.set({stroke: v.stroke})
                object.set({strokeWidth: v.strokeWidth})
                object.set({strokeDashArray: v.strokeDashArray})
                object.set({strokeLineCap: v.strokeLineCap})
                object.set({strokeDashOffset: v.strokeDashOffset})
                object.set({strokeLineJoin: v.strokeLineJoin})
                object.set({strokeUniform: v.strokeUniform})
                object.set({strokeMiterLimit: v.strokeMiterLimit})
                object.set({scaleX: v.scaleX})
                object.set({scaleY: v.scaleY})
                object.set({angle: v.angle})
                object.set({flipX: v.flipX})
                object.set({flipY: v.flipY})
                object.set({opacity: v.opacity})
                object.set({shadow: v.shadow})
                object.set({visible: v.visible})
                object.set({backgroundColor: v.backgroundColor})
                object.set({fillRule: v.fillRule})
                object.set({paintFirst: v.paintFirst})
                object.set({globalCompositeOperation: v.globalCompositeOperation})
                object.setCoords()
                canvas.add(object)
                canvas.requestRenderAll();
        }
      })
    }
    })
    // console.log(data)
    // console.log(objs)
  // })
  }

export default socket