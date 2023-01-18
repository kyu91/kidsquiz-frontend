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
                <video id="hostMe" autoPlay muted></video>
                <div className="controllers">
                    <div className="micAndVid">
                        <button id="mute">음소거</button>
                        <button id="camera">카메라끄기</button>
                    </div>
                </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default HostVideo