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
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                        </button>
                        <button id="hostMecamera" className="off">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.6 11.6L22 7v10l-6.4-4.5v-1zM4 5h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2z"/></svg>
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