import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CardMedia from '@mui/material/CardMedia';
import {htmlaudioOn, htmlcameraOn} from "./icon.js"

import {multiCursor} from '../controller/MediasoupController';

const HostVideo = () => {
  return (
    <>
    <div>
        <div id="videoColumn" className="mainTable">
                <button id="hostMultiCursor" onClick={multiCursor} className="inactive">멀티커서 ON</button>
            <div id="hostCol" className="localColumn">
                <p id="hostName"></p>
                <audio id="hostMeAudio" autoPlay></audio>
                <video id="hostMe" autoPlay muted></video>
                <div className="controllers">
                    <div className="micAndVid">
                        <button id="hostMemute" className="on">{htmlaudioOn}</button>
                        <button id="hostMecamera" className="on"> {htmlcameraOn} </button>
                    </div>
                </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default HostVideo