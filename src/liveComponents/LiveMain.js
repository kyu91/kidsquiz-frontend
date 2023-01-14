import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import GuestVideo from './GuestVideo';
import HostVideo from './HostVideo';
import Box from '@mui/material/Box';
import LiveNav from './LiveNav';
import Canvas from './Canvas';

import './live_style.css';



const LiveMain = () => {
    const history = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem('token');
    const guestKey = localStorage.getItem('guestKey');


    //게스트 이름과 고유키를 저장할 배열
    const [guestNames, setGuestNames] = React.useState([['김석규', '123'], ['김석규2', '1234']]);

    
    //로컬스토리지에서 name 가져오기
    const name = localStorage.getItem('gusetName');
    const key = localStorage.getItem('guestKey');

    

    React.useEffect(() => {
        if (!token && guestKey) {
            return 
        }else if (token && !guestKey) {
            return
        }
        else if(!token && !guestKey) {
            history(`${location.pathname}/intro`);
        }

        for (let i = 0; i < guestNames.length; i++) {
            if (guestNames[i].key === key) {
                return;
            }
        }
        
    }, []);


 
  return (

    <div>

        <GuestVideo guestNames={guestNames}></GuestVideo>

        <Box
            className='canvarsContiner'
            
            sx={{
                maxWidth: '100%',
                maxHeight: '100%',
            }}
        >
            <div className = "navPosition">
                <LiveNav></LiveNav>
            </div>
            <div className = "canvarsPosition">
                <Canvas></Canvas>
            </div>
            <div className = "hostVideoPosition">
                <HostVideo guestNames={guestNames}></HostVideo>
            </div>    
        </Box>

    </div>

  )
}

export default LiveMain