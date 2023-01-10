import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CardMedia from '@mui/material/CardMedia';

const HostVideo = () => {


  return (
    <Box
        sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'left', //Paper를 가로로 정렬
            // alignContent: 'center', // Paper 요소를 세로로 정렬
            '& > :not(style)': {
            m: 1,
            width: 220,
            height: 180,
            },
        }}
    >
        <Paper elevation={3}>
            <CardMedia
                component="video"
                alt="green iguana"
                height="150"
                src='https://www.w3schools.com/html/mov_bbb.mp4'
                autoPlay
                controls
            />
        </Paper>

    </Box>
  )
}

export default HostVideo