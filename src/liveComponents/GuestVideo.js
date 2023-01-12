import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CardMedia from '@mui/material/CardMedia';


import MediasoupController from '../controller/MediasoupController';

const controller = MediasoupController();

// const ENDPOINT = "http://13.125.34.115:4000/";

const GuestVideo =  () => {
    
    
    React.useEffect(() => {
        
        //로컬스토리지에 저장된 이름과 방이름을 가져옴
        const guestName = localStorage.getItem('gusetName');
        const roomName = localStorage.getItem('roomName');
        
        console.log('드가기전')
        const initCall = async () => {
            await controller.init(roomName, guestName);
        };
        
        initCall();
        console.log('드가기후')
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
            <table>
                <tbody>
                    <tr>
                        <td>
                            <video id="localVideo" autoPlay muted ></video>
                            <div style={{textAlign: 'center'}}>
                                <span id="userName"> 유진 👻   </span>
                                <button id="mute"> <i id="muteIcon"></i></button><span> </span>
                                <button id="camera"><i id="cameraIcon"></i></button><span> </span>
                            </div>
                        </td>
                        <td>
                            <div id="videoContainer"></div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p></p>
        </div>
             
   
    </Box>
  )
}

export default GuestVideo