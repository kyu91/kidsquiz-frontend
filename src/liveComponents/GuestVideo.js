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
      <div id="videos">
          <div id="videoContainer" className="remoteColumn">
            <div id="guestMeWrap">
              <audio id="guestMeAudio" autoPlay></audio>
              <video id="guestMe" autoPlay muted></video>
              <div className="controllers">
                <div className="micAndVid">
                 <p id="localUserName"> </p>
                  <button id="guestMemute" className="off">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4zM22 9l-6 6M16 9l6 6"/></svg>
                  </button>
                  <button id="guestMecamera" className="off">
                     <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 2l19.8 19.8M15 15.7V17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2h.3m5.4 0H13a2 2 0 0 1 2 2v3.3l1 1L22 7v10"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div> 
  );
};

export default GuestVideo;
