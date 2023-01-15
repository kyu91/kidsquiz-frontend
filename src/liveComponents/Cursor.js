import React, { useEffect, useState, useContext } from "react";
import socket from "./socketExport";
import QuillCursors from 'quill-cursors';

function Cursor({ }) {
    const [cursorX, setCursorX] = useState(null); 
    const [cursorY, setCursorY] = useState(null); 
    const [style, setStyle] = useState(null); 

    // function move(p) {
    //     setCursorX(p[0])
    //     setCursorY(p[1])
    // }
    // const setCoordinates = (x,y) => {
    //     // You don't need whitespace in here, I added it for readability
    //     // I would recommend using something like EmotionJS for this
    //         return `position:absolute;   
    //                 left: "${x}px";         
    //                 top: "${y}px";`
    //     }

    // useEffect(() => {
    //     document.addEventListener('mousemove', (e) => {
    //         const newStyle = setCoordinates(e.target.screenX, e.target.screenY);
    //         setStyle(newStyle);

    //     //    move([e.clientX - 500, e.clientY - 500])
    //     })
    //   }, [])
    let x = 1000
    let y = 900
    setStyle(`position:absolute;left: "${x}px";top: "${y}px";`)

  return (
    <>
        {/* <div>
            <span> 마우스 {cursorX}, {cursorY} </span>

        </div> */}
      <span style={style}>
        마우스 {cursorX}, {cursorY}
      </span>
    </>
  );
}

export default Cursor