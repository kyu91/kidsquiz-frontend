import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { sizing } from '@mui/system';
import CardMedia from '@mui/material/CardMedia';


const GuestVideo = () => {
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
            height: 140,
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
                playsInline
                muted
            />
        </Paper>
        <Paper elevation={3}>
            <CardMedia
                component="video"
                alt="green iguana"
                height="150"
                src='https://www.w3schools.com/html/mov_bbb.mp4'
                autoPlay
                playsInline
                muted
            />
        </Paper>
        <Paper elevation={3}>
            <CardMedia
                component="video"
                alt="green iguana"
                height="150"
                src='https://www.w3schools.com/html/mov_bbb.mp4'
                autoPlay
                playsInline
                muted
            />
        </Paper>
        <Paper elevation={3}>
            <CardMedia
                component="video"
                alt="green iguana"
                height="150"
                src='https://www.w3schools.com/html/mov_bbb.mp4'
                autoPlay
                playsInline
                muted
            />
        </Paper>
    </Box>
  )
}

export default GuestVideo