import React from 'react';
import Box from '@mui/material/Box';
import './css/live_style.css'
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';



//컨트롤러 임포트
import MediasoupController from '../controller/MediasoupController';

const controller = MediasoupController();

const GuestVideo =  () => {
    const guestName = localStorage.getItem('guestName');
    //토큰이 있는 비디오는 좌측 아래에 보여야 하고 guestKey가 있는 비디오는 우측 위에 보여야 한다.
    const token = localStorage.getItem('token');
    const guestKey = localStorage.getItem('guestKey');

    const [guestNames, setGuestNames] = React.useState([]);
    const [guestKeys, setGuestKeys] = React.useState([]);

    const videoPositionRef = React.useRef(null);

    
    React.useEffect( () => {
        
        controller.init();
    }, [])



  return (
    // <Box
    //     sx={{
    //         display: 'flex',
    //         flexWrap: 'wrap',
    //         justifyContent: 'center', //Paper를 가로로 정렬
    //         // alignContent: 'center', // Paper 요소를 세로로 정렬
    //         '& > :not(style)': {
    //         m: 1,
    //         mb: 5,
    //         width: 1/5,
    //         height: 160,
    //         },
    //     }}
    // >
<>
             
        <div id = 'video'>
            <div className = "mainTable">
                <div>
                    <div id = "videoPosition" className='localColumn'>
                        <div >
                            <video id="localVideo" autoPlay muted>
                            </video>
                            <div>
                                 <span id="userName"> {guestName ? guestName : "🌼 선생님"} </span>
                                {/* <button id="mute"> <i id="muteIcon" className="fa-solid fa-microphone"></i> 마이크 </button><span> </span> */}
                                
                                <button id="mute">
                                     
                                </button>
                                <button id="camera">
                                <VideocamIcon id="muteIcon"></VideocamIcon> 
                                </button>
                                
                                {/* <button id="camera"><i id="cameraIcon" className="fa-solid fa-video"></i> 카메라 </button><span> </span> */}
                            </div>
                        </div>
                    </div>
                    
                    <div className='remoteColumn'>
                        <div id="videoContainer"> 
                        
                            
                        </div>
                    </div>     
                </div>
            </div>
        </div>
             
   
    {/* </Box> */}
    </>
  )
}

export default GuestVideo