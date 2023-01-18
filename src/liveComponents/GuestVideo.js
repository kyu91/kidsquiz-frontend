import React from "react";
import "./css/live_style.css";
import axios from "axios";


//컨트롤러 임포트
import MediasoupController from "../controller/MediasoupController";

const controller = MediasoupController();


const GuestVideo = () => {
  React.useEffect(() => {
    controller.init();
  }, []);

  return (
    <>
      <div id="videos">
          <div id="videoContainer" className="remoteColumn">
            <div id="guestMeWrap">
              <video id="guestMe" autoPlay muted></video>
              <div className="controllers">
                <p id="localUserName">  </p>
                <div className="micAndVid">
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
