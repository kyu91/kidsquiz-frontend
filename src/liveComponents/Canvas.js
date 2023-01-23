import "./css/Canvas.css";
import React, { useState, useEffect } from "react";
import { fabric } from "fabric";
// import { uuid } from 'uuidv4'
import { v1 as uuid } from "uuid";
import {
  emitModify,
  emitAdd,
  emitAddP,
  modifyObj,
  addObj,
  addPObj,
  emitDelete,
  deleteObj,
  emitClear,
  clearObj,
  emitAddImage,
  addimageObj,
  emitUrl,
} from "./socket";
import axios from "axios";
import ScrollContainer from "react-indiana-drag-scroll";
import socket from "./socketExport";

//석규
import Button from "@mui/material/Button";
import Quiz from "./Quiz";
import Puzzle from "./Puzzle";
import DrawToggle from "./canvasComponents/DrawToggle";
import NewCanvas from "./canvasComponents/NewCanvas";
import Figures from "./canvasComponents/Figures";
import Chilgyo from "./canvasComponents/Chilgyo";
import Deletes from "./canvasComponents/Deletes";
import ImageBundle from "./canvasComponents/ImageBundle";
import PuzzleBundle from "./canvasComponents/PuzzleBundle";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Crop32Icon from "@mui/icons-material/Crop32";
import { useLocation } from "react-router-dom";

// let puzzleurl

function Canvas() {
  const [canvas, setCanvas] = useState("");
  const [widthvalue, setWidthvalue] = useState(1);
  const [colorvalue, setColorvalue] = useState("#000000");
  // const [imageURL,setimageURL] = useState('');
  const [show, setShow] = useState(false);
  const [showimage, setShowimage] = useState(false);
  const [showimagePuzzle, setShowimagePuzzle] = useState(false);
  const [showimagePuzzlediv, setShowimagePuzzlediv] = useState(false);
  const [drawmodeonoff, setdrawmodeonoff] = useState(true);
  // const [imagearraydata,setimagearraydata] = useState([])
  // const [puzzlearraydata,setpuzzlearraydata] = useState([])
  const [puzzleurl, setpuzzleurl] = useState("");
  const hostBool = localStorage.getItem("hostBool");

  //석규 도형 묶음 on/off 상태값
  const [showFigureBundle, setShowFigureBundle] = useState(false);

  //석규 이미지 묶음 on/off 함수
  const showFigureBundleHandler = () => {
    if (showFigureBundle === false) {
      setShowFigureBundle(true);
    } else {
      setShowFigureBundle(false);
    }
  };

  //현재URL에서 /intro를 제거

  const location = useLocation();
  const updatedUrl = location.pathname.replace("/intro", "");

  //방이름을 추출
  const roomName = updatedUrl.split("/")[2];

  const bringimageinhtml = (event) => {
    let url = event.currentTarget.src;
    addImage(url);
    setShowimage(false);
  };

  const bringimageinhtmlPuzzle = (event) => {
    setpuzzleurl(event.currentTarget.src);
    emitUrl(event.currentTarget.src);
    setShowimagePuzzlediv(true);
    setShowimagePuzzle(false);
  };

  //퍼즐, 이미지 묶음 데이터 담을 state(수업의 오브젝트 아이디를 줌)
  const [classMaterials, setClassMaterials] = useState([]);

  //퍼즐, 이미지 묶음 데이터 get 요청으로 받아옴
  useEffect(() => {
    const getClassMaterials = async () => {
      const config = {
        method: "get",
        url: `/api/class/material/${roomName}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      };

      await axios(config)
        .then((response) => {
          console.log("몇번 드러오는지 보자", response.data);
          setClassMaterials(response.data);
          console.log(response.data.image);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getClassMaterials();
  }, []);

  ////////////////////////////////////////////////API 요청부분/////////////////////////////////////////////////////////

  // const data = new FormData();
  // data.append("_id","63c7b57d4424a5f77498335a")

  //   const bringimage = async()=>{
  //     const config = {
  //       method: 'post',
  //       url: `/api/live/image`,
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `${localStorage.getItem('token')}`
  //       },
  //       data : data
  //     };

  //     await axios(config)
  //         .then(response => {
  //           console.log(response.data.image)
  //             setimagearraydata(response.data.image)
  //         }).catch(error => {
  //             console.error(error);
  //         }
  //     );
  //   };

  //   const data2 = new FormData();
  // data2.append("_id","63c7b57d4424a5f77498335a")

  //   const bringpuzzleimage = async()=>{
  //     const config = {
  //       method: 'post',
  //       url: `/api/live/puzzle`,
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `${localStorage.getItem('token')}`
  //       },
  //       data : data2
  //     };

  //     await axios(config)
  //         .then(response => {
  //           setpuzzlearraydata(response.data.puzzle);
  //         }).catch(error => {
  //             console.error(error);
  //         }
  //     );
  //   };

  ////////////////////////////////////////////////API 요청부분/////////////////////////////////////////////////////////

  ///////////////////////////////////////////////신기능 개발 돌입 /////////////////////////////////////////////////////

  // finditem

  // const finditem = (imageURL)=> {
  //   fabric.Image.fromURL(imageURL, function(Image){

  //     var shell = new fabric.Circle({
  //       fill:'',
  //       stroke: 'blue',
  //       strokeWidth: 5,
  //       scaleX: 2,
  //       scaleY: 2,
  //       originX: 'center',
  //       originY: 'center',
  //     });
  //     var clipPath = new fabric.Circle({
  //       absolutePositioned: true,
  //       originX: 'center',
  //       originY: 'center',
  //       scaleX: 2,
  //       scaleY: 2
  //     })
  //   });

  //   function animate(){
  //     abort = fabric.util.animate({
  //       // startValue: 0,
  //       // endValue: 360 * scalar,
  //       // duration: 1000,
  //       easing: fabric.util.ease.easeInOutSine,
  //       onChange: function (value) {
  //         shell.set('angle', value);
  //         // clipPath.set('angle', value);
  //         Image.set('dirty', true);
  //       },
  //       // onComplete: function () {
  //       //   scalar += Math.sign(scalar);
  //       //   scalar *= -1;
  //       //   animate();
  //       // }
  //     });
  //   }

  // }

  //     Image.scale(0.4);
  //     object = Image
  //     object.set({id: uuid()})
  //     canvas.add(object);
  //     emitAddImage({url: imageURL, id: object.id})
  //     canvas.renderAll()
  //   })
  // }

  /////////////////////////////////////////////////////////////////테스트중/////////////////////////////////////////////////////////
  // const finditem = () => {
  //   // fabric.Object.prototype.transparentCorners = false;
  //   // var radius = 300;
  //   canvas.preserveObjectStacking = true;

  // var url = 'https://img.hankyung.com/photo/202208/03.30968100.1.jpg'

  //   fabric.Image.fromURL(url, function(img) {
  //     var scalar = 1, abort;
  //     var path = 'M 230 230 A 45 45, 0, 1, 1, 275 275 L 275 230 Z';
  //     var shell = new fabric.Path(path, {
  //       fill: '',
  //       stroke: 'blue',
  //       strokeWidth: 5,
  //       scaleX: 2,
  //       scaleY: 2,
  //       lockScalingX: true,
  //       lockScalingY: true,
  //       lockSkewingX: true,
  //       lockSkewingY: true,
  //       originX: 'center',
  //       originY: 'center',
  //     })
  //     var clipPath = new fabric.Path(path, {
  //       absolutePositioned: true,
  //       originX: 'center',
  //       originY: 'center',
  //       scaleX: 2,
  //       scaleY: 2
  //     })

  //     function animate() {
  //       abort = fabric.util.animate({
  //         startValue: 0,
  //         endValue: 360 * scalar,
  //         duration: 1000,
  //         easing: fabric.util.ease.easeInOutSine,
  //         onChange: function (value) {
  //           shell.set('angle', value);
  //           clipPath.set('angle', value);
  //           img.set('dirty', true);
  //         },
  //         onComplete: function () {
  //           scalar += Math.sign(scalar);
  //           scalar *= -1;
  //           animate();
  //         }
  //       });
  //     }

  //     img.scale(0.5).set({
  //       left: 200,
  //       top: 180,
  //       clipPath: clipPath
  //     });
  //     shell.on('moving', ({ e, transform, pointer }) => {
  //       //  only because they are absolutePositioned
  //       clipPath.setPositionByOrigin(shell.getCenterPoint(), 'center', 'center');
  //       img.set('dirty', true);
  //     });
  //     shell.on('rotating', () => {
  //       clipPath.set({ angle: shell.angle });
  //       img.set('dirty', true);
  //     });
  //     shell.on('selected', () => {
  //       abort();
  //     });
  //     shell.on('deselected', () => {
  //       scalar = 1;
  //       animate()
  //     });
  //     img.clipPath = clipPath;
  //     canvas.add(img, shell);
  //     canvas.setActiveObject(img);

  //     animate();
  //   });
  // };

  /////////////////////////////////////////////////////////////////테스트중/////////////////////////////////////////////////////////

  ////////////////////////////////////////////////드래그앤드랍/////////////////////////////////////////////////////////

  const DragandDrop = (e) => {
    // settempurl(e.target.src)
    e.stopPropagation();
    let tempurl = e.target.src;
    console.log(tempurl, "테스트용콘솔");
    // canvas.on("mouse:move", function(e){
    //   console.log(e.pointer)
    // })
    console.log(e.clientX, e.clientY);
    let object;
    fabric.Image.fromURL(tempurl, function (Image) {
      Image.scale(0.4);
      object = Image;
      console.log(object);
      // console.log(((object.height)*0.8))
      object.set({
        left: e.clientX - object.width * 0.278,
        top: e.clientY - object.height * 0.425,
        originX: "left",
        originY: "top",
        id: uuid(),
      });
      // object.set({left : e.clientX - ((object.width) * 0.5), top : e.clientX, id: uuid()})
      canvas.add(object);
      emitAddImage({
        url: tempurl,
        id: object.id,
        left: object.left,
        top: object.top,
      });
      canvas.renderAll();
    });
  };

  const prevent = (e) => {
    e.preventDefault();
  };

  ////////////////////////////////////////////////드래그앤드랍/////////////////////////////////////////////////////////
  ///////////////////////////////////////////////신기능 개발 돌입 /////////////////////////////////////////////////////

  const erasemode = () => {
    canvas.freeDrawingBrush = new fabric.EraserBrush(canvas);
    canvas.freeDrawingBrush.width = parseInt(widthvalue);
  };
  const pencilmode = () => {
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.width = parseInt(widthvalue);
    canvas.freeDrawingBrush.color = colorvalue;
    canvas.renderAll();
  };
  const changeWidth = (e) => {
    setWidthvalue(e.target.value);
    canvas.freeDrawingBrush.width = parseInt(widthvalue);
  };
  const changeColor = (e) => {
    setColorvalue(e.target.value);
    canvas.freeDrawingBrush.color = colorvalue;
    canvas.renderAll();
  };
  const initCanvas = () =>
    new fabric.Canvas("canv", {
      isDrawingMode: false,
      height: 1920,
      width: 4000,
    });

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  // useEffect(() => {
  //   bringimage()
  //   bringpuzzleimage()
  // }, [])

  useEffect(() => {
    if (canvas) {
      canvas.on("object:modified", function (options) {
        if (options.target) {
          const modifiedObj = {
            obj: options.target,
            id: options.target.id,
          };
          emitModify(modifiedObj);
        }
      });

      canvas.on("object:moving", function (options) {
        if (options.target) {
          const modifiedObj = {
            obj: options.target,
            id: options.target.id,
          };
          emitModify(modifiedObj);
        }
      });

      // canvas.on("mouse:move", function(e){
      //   console.log(e.pointer)
      // })

      canvas.on("path:created", function (options) {
        if (options.path) {
          options.path.set({ id: uuid() });

          const addedPath = {
            path: options.path,
            id: options.path.id,
          };
          emitAddP(addedPath);
        }
      });
      modifyObj(canvas);
      addObj(canvas);
      deleteObj(canvas);
      clearObj(canvas);
      addPObj(canvas);
      addimageObj(canvas);
    }
  }, [canvas]);

  const addImage = (imageURL) => {
    let object;
    fabric.Image.fromURL(imageURL, function (Image) {
      Image.scale(0.4);
      object = Image;
      object.set({ id: uuid() });
      canvas.add(object);
      emitAddImage({ url: imageURL, id: object.id });
      canvas.renderAll();
    });
  };

  socket.on("puzzleStart", function (data) {
    setShowimagePuzzlediv(true);
    setpuzzleurl(data);
  });

  return (
    //!리턴
    <div className="App">
      <div id="buttonGroup">
        {/* 팬/도형 토글 */}
        <DrawToggle
          canvas={canvas}
          setShow={setShow}
          setdrawmodeonoff={setdrawmodeonoff}
          size="small"
        ></DrawToggle>

        {/* 리셋 */}
        {hostBool ? (
          <>
            <NewCanvas canvas={canvas} emitClear={emitClear}></NewCanvas>
            {/* 선택 삭제 */}
            <Deletes
              drawmodeonoff={drawmodeonoff}
              canvas={canvas}
              emitDelete={emitDelete}
            ></Deletes>

            {/* 도형 묶음 */}
            <div className="figuresContiner">
              <Button onClick={showFigureBundleHandler}>
                {/* <CategoryIcon /> */}
                도형모음
              </Button>
              {showFigureBundle ? (
                <div className="figuresChilgyoBox">
                  <Figures
                    canvas={canvas}
                    colorvalue={colorvalue}
                    emitAdd={emitAdd}
                    showFigureBundleHandler={showFigureBundleHandler}
                  ></Figures>
                  <Chilgyo
                    drawmodeonoff={drawmodeonoff}
                    emitAdd={emitAdd}
                    canvas={canvas}
                    showFigureBundleHandler={showFigureBundleHandler}
                  ></Chilgyo>
                </div>
              ) : null}
            </div>

            {!drawmodeonoff && (
              <Button
                key="pencil"
                type="button"
                className="navBtn"
                name="pencil"
                onClick={pencilmode}
              >
                <BorderColorIcon />
              </Button>
            )}

            {!drawmodeonoff && (
              <Button
                key="erase"
                type="button"
                className="navBtn"
                name="eraser"
                onClick={erasemode}
              >
                <Crop32Icon />
              </Button>
            )}

            <ImageBundle
              showimage={showimage}
              setShowimage={setShowimage}
              showimagePuzzle={showimagePuzzle}
              setShowimagePuzzle={setShowimagePuzzle}
            ></ImageBundle>

            <PuzzleBundle
              showimage={showimage}
              setShowimage={setShowimage}
              showimagePuzzle={showimagePuzzle}
              setShowimagePuzzle={setShowimagePuzzle}
              setShowimagePuzzlediv={setShowimagePuzzlediv}
            ></PuzzleBundle>
          </>
        ) : null}

        <input
          key="color"
          type="color"
          className="color"
          onChange={changeColor}
          defaultValue="#000000"
          id="drawing-color"
        ></input>

        {/* <span className='info'>{widthvalue}</span> */}
        {show && (
          <input
            type="range"
            onChange={changeWidth}
            defaultValue={widthvalue}
            min="1"
            max="150"
          ></input>
        )}
      </div>

      {showimage && (
        <div>
          <ScrollContainer className="scroll-container" activationDistance="10">
            <ul className="list">
              {classMaterials.image.map((a, i) => {
                return (
                  <li className="item" key={"imageitem" + i}>
                    <img
                      className="image"
                      draggable="true"
                      onDragOver={prevent}
                      onDragEnd={DragandDrop}
                      src={a.image}
                      onClick={bringimageinhtml}
                      alt="이미지"
                    ></img>
                  </li>
                );
              })}
            </ul>
          </ScrollContainer>
        </div>
      )}

      {/* {showimage && <div>
        <ScrollContainer className="scroll-container" activationDistance = "10">
            <ul className="list">
        {
        imagearraydata.map((a,i) => {
          return <li className="item" key = {'imageitem'+i}>
              <img className="image" src={a.image} onClick = {bringimageinhtml}></img>
      </li>
        })}
        </ul>
        </ScrollContainer>
      </div>} */}

      {showimagePuzzle && (
        <div>
          <ScrollContainer className="scroll-container" activationDistance="10">
            <ul className="list">
              {classMaterials.puzzle.map((b, i) => {
                return (
                  <li className="item" key={"puzzleitem" + i}>
                    <img
                      className="puzzleimage"
                      src={b.image}
                      onClick={bringimageinhtmlPuzzle}
                      alt="puzzle"
                    ></img>
                  </li>
                );
              })}
            </ul>
          </ScrollContainer>
        </div>
      )}

      {/* {showimagePuzzle && <div>
        <ScrollContainer className="scroll-container" activationDistance = "10">
            <ul className="list">
        {
        puzzlearraydata.map((b,i) => {
          return <li className="item" key = {'puzzleitem'+i}>
              <img className="puzzleimage" src={b.image} onClick = {bringimageinhtmlPuzzle}></img>
            </li>
        })}
        </ul>
        </ScrollContainer>
      </div>} */}

      {/* 퀴즈! */}
      <Quiz></Quiz>

      {showimagePuzzlediv && (
        <Puzzle puzzleurl={puzzleurl} setpuzzleurl={setpuzzleurl}></Puzzle>
      )}
      <div>
        <canvas id="canv" />
      </div>
    </div>
  );
}

export default Canvas;
