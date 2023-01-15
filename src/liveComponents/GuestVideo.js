import React from 'react';
import './css/live_style.css'
import axios from 'axios';




//컨트롤러 임포트
import MediasoupController from '../controller/MediasoupController';

const controller = MediasoupController();

const GuestVideo =  () => {
    const hostToken = localStorage.getItem('token');
    const roomName = localStorage.getItem('roomName');
    const guestName = localStorage.getItem('guestName');

    const [hostName, setHostName] = React.useState('');

    const [hostBool, setHostBool] = React.useState(false);

    //호스트 이름, 토큰확인 해서 이 방의 호스트인지 확인
    console.log('호스트 토큰', hostToken);

    const getHost = async(roomName, hostToken)=>{
        const config = {
            method: 'get',
            url: `/api/class/host?room=${roomName}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${hostToken}`,

            },
        };
        await axios(config)
            
            .then(response => {
                console.log(response.data);
                setHostName(response.data.name);
                setHostBool(response.data.result);
            }).catch(error => {
                console.error(error);
            }
        );
    }
    
    React.useEffect( () => {
        if (hostToken){
            getHost(roomName, hostToken);
        }
        
        
        controller.init(hostName, guestName, hostBool);
    }, [])



  return (
<>
             
        <div id = 'video'>
            <div className = "mainTable">
                <div>
                    <div id = "videoPosition" className='localColumn'>
                        <div >
                            <video id="localVideo" autoPlay muted>
                            </video>
                            <div>
                                <p id="userName"> 선생님 </p>
                                <p id = "토큰있음"></p>
                                <button id="mute">
                                    음소거
                                </button>
                                <button id="camera">
                                    카메라끄기
                                </button>
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
    </>
  )
}

export default GuestVideo