import React from "react";
import "./css/live_style.css";
import axios from "axios";


//컨트롤러 임포트
import MediasoupController from "../controller/MediasoupController";

const controller = MediasoupController();

const GuestVideo = () => {

//   const hostToken = localStorage.getItem("token");
//   const roomName = localStorage.getItem("roomName");
//   const [hostName, setHostName] = React.useState("");
//   const [hostBool, setHostBool] = React.useState(false);
//   const [isHost, setisHost] = React.useState(null);
//   const [guest, setguest] = React.useState(null);

  //호스트 이름, 토큰확인 해서 이 방의 호스트인지 확인
//   const params = { room: roomName };

//   const getHost = async (hostToken) => {
//     const config = {
//       method: "get",
//       url: `/api/class/host`,
//       params,
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `${hostToken}`,
//       },
//     };
//     await axios(config)
//       .then((response) => {
//         console.log("response!! : ", response);
//         // setHostName(response.data.name);
//         // setHostBool(response.data.result);
//         // localStorage.setItem("hostBool", response.data.result);
//         localStorage.getItem("hostBool");

//         console.log("localStorage에 저장한 hostBool값", hostBool);

//         setisHost(response.data.result);
//         if (isHost) {
//           setHostName(response.data.name);
//         }
//         // else {
//         //     setguest(response.data.name);
//         // }
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

  React.useEffect(() => {
    // if (hostToken) {
    //   getHost(hostToken);
    // }
    // localStorage.setItem("hostBool", hostBool);
    controller.init();
  }, []);

  return (
    <>
      <div id="videos">
        <div id="videoColumn" className="mainTable">
          {/* <div id = "videoPosition" className='localColumn'> */}
          <div id="hostCol" className="localColumn">
            <video id="hostMe" autoPlay muted></video>
            <div>
              <p id="hostName"></p>
              <button id="mute">음소거</button>
              <button id="camera">카메라끄기</button>
            </div>
          </div>
          <div id="videoContainer" className="remoteColumn">
            <div id="guestMeWrap">
              <video id="guestMe" autoPlay muted></video>
              <div>
                <p id="localUserName">  </p>
                <button id="mute">음소거</button>
                <button id="camera">카메라끄기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GuestVideo;
