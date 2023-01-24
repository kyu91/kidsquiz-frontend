import React from "react";
import "./css/live_style.css";
import axios from "axios";
import {htmlaudioOn, htmlcameraOn} from "./icon.js"

//컨트롤러 임포트
import MediasoupController from "../controller/MediasoupController";
const controller = MediasoupController();

const GuestVideo = () => {
  React.useEffect(() => {
    controller.init();
  }, []);

  return (
      <div id="videos">
          <div id="videoContainer" className="remoteColumn">
            <div id="guestMeWrap">
              <audio id="guestMeAudio" autoPlay></audio>
              <video id="guestMe" autoPlay muted></video>
              <div className="controllers">
                <div className="micAndVid">
                 <p id="localUserName"> </p>
                  <button id="guestMemute" className="on"> {htmlaudioOn} </button>
                  <button id="guestMecamera" className="on"> {htmlcameraOn}</button>
                </div>
              </div>
            </div>
          </div>
        </div> 
  );
};

export default GuestVideo;
