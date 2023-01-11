import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CardMedia from '@mui/material/CardMedia';
import useStore from '../store';




const GuestVideo = ({guestNames}) => {
    const {names, setNames} = useStore();




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
        {
            names.map((guestName, index) => {
                return (
                    <Paper elevation={3} key={index}>
                        <CardMedia
                            component="video"
                            alt="green iguana"
                            height="150"
                            src='https://www.w3schools.com/html/mov_bbb.mp4'
                            autoPlay
                            playsInline
                            muted
                        />
                        <p>{guestName[0]}</p>
                    </Paper>
                )
            })
        }
    </Box>
  )
}

export default GuestVideo