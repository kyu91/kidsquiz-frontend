import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import GuestVideo from './GuestVideo';
import HostVideo from './HostVideo';
import Box from '@mui/material/Box';
import LiveNav from './LiveNav';
import Canvas from './Canvas';
// import Cursor from './Cursor'

import './css/live_style.css';
import zIndex from '@mui/material/styles/zIndex';



const LiveMain = () => {
    const history = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem('token');
    const guestKey = localStorage.getItem('guestKey');

    //호스트가 링크로 들어갈때 주소 가져오기
    const updatedUrl = location.pathname.replace('/intro', '');
    //방이름 추출
    const roomName = updatedUrl.split('/')[2];


    const useNavStyle = React.useRef(null);
    //토큰이 없다면 useNavStyle요소를 숨김
    const navStyle = {
        display: token ? 'block' : 'none',
        zIndex: 20 
    }


    React.useEffect(() => {
        if (!token && guestKey) {
            return 
        }else if (token && !guestKey) {
            localStorage.setItem('roomName', roomName);
            return
        }
        else if(!token && !guestKey) {
            history(`${location.pathname}/intro`);
        }
    }, []);


 
  return (

    <div>
        <Box
            className='canvarsContiner'
            
            sx={{
                maxWidth: '100%',
                maxHeight: '100%',
            }}>
            {/* <div className = "navPosition" ref={useNavStyle} style={navStyle}>
                <LiveNav></LiveNav>
            </div> */}
            <div className = "canvarsPosition">
                <Canvas style = {{zIndex :'8'}}></Canvas>
            </div>
            <div className = "hostVideoPosition">
                <GuestVideo></GuestVideo>
            </div>    
            {/* <div className = "multiCursor">
                <Cursor></Cursor>
            </div> */}
        </Box>

    </div>

  )
}

export default LiveMain