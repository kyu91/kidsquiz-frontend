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
        {/* <div>åå
            <span> 마우스 {cursorX}, {cursorY} </span>

        </div> */}
      <span style={style}>
        마우스 {cursorX}, {cursorY}
      </span>
    </>
  );
}

export default Cursor


// import React, { useEffect, useState, useCallback, useMemo} from "react";
// import socket from "./socket";
// // import useStore from "../for_game/store";
// // import cloneDeep from "lodash/cloneDeep";
// // import MousePointerUsers from "./MousePointerUsers";


// function Cursor({sessionId, participantName}){
//     const [position, setPosition] = useState({});
//     // const {my_index, player_count, gamers} = useStore();
//     let mouse_color;
//     if (player_count>0){
//       let idx = gamers.findIndex((a)=>{
//         if(a.name === participantName){
//           return a;
//         };
//     });
//     if ((idx + 1 ) % 2 == 0){
//       mouse_color = "blue";
//     } else {
//       mouse_color = "red";
//     }
//   };
    
//     let cursor;
//     const mouseFunc = (e) => {
//       let x = e.clientX;
//       let y = e.clientY;
//       const userInfo = {};
//       userInfo[participantName] = {
//         mousePointer: { top: y, left: x },
//         mousecolor : mouse_color
//       };
//       socket.emit("mouse_move", [sessionId, userInfo]);
//     };

//     useEffect(() => {
//       socket.emit("session_join", sessionId);

//       cursor = document.querySelector("#cursor_item");
//       window.addEventListener('mousemove', mouseFunc);
//       return() => {
//         socket.emit("session_leave", [sessionId, participantName])
//         window.removeEventListener("mousemove", mouseFunc);
//       }}, [gamers]);
    
//     useEffect(() => {
//       socket.on("deleteCursor", (participantName) => {
//         setPosition((prev) => {
//           const newState = cloneDeep(prev);
//           delete newState[participantName];

//           return newState;
//         });
//       });
//       return() => {
//         console.log("나간 유저는 : ", participantName);
//         socket.removeAllListeners("deleteCursor");
//         socket.emit("exitShareEditing", [sessionId, participantName]);
//         setPosition({});
//         window.removeEventListener("mousemove", mouseFunc);
//       };
//     }, []);

//     // 다른 유저의 마우스 커서 정보를 받아 온다.
//   const cursorUpdateEvent = useCallback(() => {
//     socket.on("cursor", (userInfo) => {
//       setPosition((prevPosition) => {
//         const newPostion = { ...prevPosition, ...userInfo };
//         return newPostion;
//       })
//     });
//   }, [gamers]);

//   useEffect(() => {
//     cursorUpdateEvent();
//     return () => {
//       socket.removeAllListeners("cursor");
//     };
//   }, [gamers]);

      
//     return (
//       <>
//         <div id="editor-container"></div>
//         <div id="cursor_item"></div>
//         {<MousePointerUsers positions={position}/>}
//       </>
//     );
//   }
  
//   export default Cursor
