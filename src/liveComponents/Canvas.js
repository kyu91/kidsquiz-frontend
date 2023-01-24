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
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import Tooltip from "@mui/material/Tooltip";

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

  //석규 교구모음 항목 on/off 상태값
  const [showMaterial, setShowMaterial] = useState(false);

  const showMaterialHandler = () => {
    if (showMaterial === false) {
      setShowMaterial(true);
    } else {
      setShowMaterial(false);
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
        setClassMaterials(response.data);
        console.log("바뀐 거 어떻게오나 보자", response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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

    //퍼즐, 이미지 묶음 데이터 get 요청으로 받아옴
    getClassMaterials();
  }, []);

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
        <div className="drowContainer">
          <DrawToggle
            canvas={canvas}
            setShow={setShow}
            setdrawmodeonoff={setdrawmodeonoff}
            size="small"
          ></DrawToggle>

          {/* 드로우 툴 boxs */}
          <div className="drowBox">
            {show && (
              <input
                type="range"
                onChange={changeWidth}
                defaultValue={widthvalue}
                min="1"
                max="150"
              ></input>
            )}
            {!drawmodeonoff && (
              <>
                <Button
                  key="pencil"
                  type="button"
                  className="navBtn"
                  name="pencil"
                  onClick={pencilmode}
                >
                  <BorderColorIcon fontSize="large" />
                </Button>
                <Button
                  key="erase"
                  type="button"
                  className="navBtn"
                  name="eraser"
                  onClick={erasemode}
                >
                  <Crop32Icon fontSize="large" />
                </Button>
              </>
            )}
          </div>
        </div>
        {/* 리셋 */}
        {hostBool ? (
          <>
            <NewCanvas canvas={canvas} emitClear={emitClear}></NewCanvas>
            {/* 선택 삭제 */}
            <Deletes canvas={canvas} emitDelete={emitDelete}></Deletes>

            {/* 교구 모음 */}
            <div className="materialContiner">
              <Tooltip title="교구모음">
                <Button onClick={showMaterialHandler}>
                  <BusinessCenterIcon fontSize="large" />
                </Button>
              </Tooltip>
              {showMaterial ? (
                <div className="materialBox">
                  {/* 도형 묶음 */}
                  <div className="figuresContiner">
                    <Tooltip title="도형모음">
                      <Button onClick={showFigureBundleHandler}>
                        {/* <CategoryIcon /> */}
                        도형모음
                      </Button>
                    </Tooltip>
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
                </div>
              ) : null}
            </div>
          </>
        ) : null}
        <input
          key="color"
          type="color"
          className="color colorPicker"
          onChange={changeColor}
          defaultValue="#000000"
          id="drawing-color"
        ></input>
        {/* 퀴즈! */}
        <Quiz classMaterials={classMaterials}></Quiz>
        {/* <span className='info'>{widthvalue}</span> */}
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
