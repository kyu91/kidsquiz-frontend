import React from 'react';
import Box from '@mui/material/Box';
import useProducerId from '../store';
import './live_style.css'


import MediasoupController from '../controller/MediasoupController';


//
import {io} from "socket.io-client";
import * as mediasoupClient from 'mediasoup-client';
import VideoContainer from '../liveComponents/VideoContainer';
import RemoteMedia from './RemoteMedia';




const controller = MediasoupController();

const socket = io.connect("http://localhost:4000") 


const GuestVideo =  () => {
    const guestName = localStorage.getItem('guestName');
    
    
    React.useEffect(() => {
        console.log('유진아 화이팅');
        controller.init();
        // const initCall = async() => {
        //     controller.init();
        // };
        
        // initCall();
        
    }, [])

  return (
    <Box
        sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center', //Paper를 가로로 정렬
            // alignContent: 'center', // Paper 요소를 세로로 정렬
            '& > :not(style)': {
            m: 1,
            mb: 5,
            width: 1/5,
            height: 160,
            },
        }}
    >

             
        <div id = 'video'>
            <table className = "mainTable">
                <tbody>
                    <tr>
                        <td >
                            <div className='localColumn'>
                                <video id="localVideo" autoPlay muted>
                                </video>
                                <div style={{textAlign: 'center'}}>
                                    <span id="userName"> {guestName} 👻   </span>
                                    <button id="mute"> <i id="muteIcon" className="fa-solid fa-microphone"></i> 마이크 </button><span> </span>
                                    <button id="camera"><i id="cameraIcon" className="fa-solid fa-video"></i> 카메라 </button><span> </span>
                                </div>
                            </div>
                        </td>
                        <td className='remotColumn'>
                            <div id="videoContainer" style={{display: 'flex'}}> 
                            
                                
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
             
   
    </Box>
  )
}

export default GuestVideo