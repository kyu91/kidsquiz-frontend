import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CardMedia from '@mui/material/CardMedia';

const HostVideo = () => {
  return (
    <>
    <div>
        <div id="videoColumn" className="mainTable">
            <div id="hostCol" className="localColumn">
                <p id="hostName"></p>
                <audio id="hostMeAudio" autoPlay></audio>
                <video id="hostMe" autoPlay muted></video>
                <div className="controllers">
                    <div className="micAndVid">
                        <button id="hostMemute" className="off">
                           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4zM22 9l-6 6M16 9l6 6"/></svg>
                        </button>
                        <button id="hostMecamera" className="off">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 2l19.8 19.8M15 15.7V17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2h.3m5.4 0H13a2 2 0 0 1 2 2v3.3l1 1L22 7v10"/></svg>
                            </button>
                    </div>
                </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default HostVideo