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

import cursor from '../svg/mouse.svg';

// ✨클릭 추가
import { useOthers } from "../liveblocks.config";
import { useUpdateMyPresence } from "../liveblocks.config";
// import { useStorage } from "../liveblocks.config";

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

    //✨라이브 커서 추가
    const others = useOthers();
    const updateMyPresence = useUpdateMyPresence();


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
        
        window.location.reload();
    }, []);

    // Basic cursor component
    // 다른 사용자의 현재 상태 확인
    function Cursor({ x, y }) {
        return (
        <div>
            <img style={{
                position: "absolute",
                transform: `translate(${x}px, ${y}px)`,
                zIndex: 900,
                width : 50,
                height :50
                }}
                src = {cursor}
            />
        </div>

        );
    }

    return (

        //✨updateMyPresence으로 포인터 이동 이벤트가 감지될 때마다 업데이트 된 커서 좌표를 가지고 옴
    <div             
        onPointerMove={(e) =>
        updateMyPresence({ cursor: { x: e.clientX, y: e.clientY } })
    }
    onPointerLeave={() => updateMyPresence({ cursor: null })} >
        {/* 다른 사용자의 현재 상태 확인 */}
        <>
            {others.map(({ connectionId, presence }) =>
            presence.cursor ? (
                <Cursor
                    key={connectionId}
                    x={presence.cursor.x}
                    y={presence.cursor.y}
                />
            ) : null
            )}
        </>
            
        
        <Box
            className='canvarsContiner'
            
            sx={{
                maxWidth: '100%',
                maxHeight: '100%',
            }}>
            {/* <div className = "navPosition" ref={useNavStyle} style={navStyle}>
                <LiveNav></LiveNav>
            </div> */}
            <div>There are {others.count} other users with you in the room.</div>;
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