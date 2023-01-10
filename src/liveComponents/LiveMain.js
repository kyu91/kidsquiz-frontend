import * as React from 'react';
import GuestVideo from './GuestVideo';
import HostVideo from './HostVideo';
import Box from '@mui/material/Box';
import LiveNav from './LiveNav';
import Canvas from './Canvas';

import './live_style.css';



const LiveMain = () => {
    
  return (

    <div>

        <GuestVideo></GuestVideo>

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
                <HostVideo></HostVideo>
            </div>    
        </Box>

    </div>

  )
}

export default LiveMain