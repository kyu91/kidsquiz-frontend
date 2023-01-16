import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {
    useLocation,
  } from 'react-router-dom';


import axios from 'axios';
import { Link } from 'react-router-dom';
import './component_style.css';

import backEndUri from '../backEndUri';




export default function Boards() {

    const [boards, setBoards] = React.useState([]);

    React.useEffect(() => {
        const getBoards = async()=>{
            const config = {
                method: 'get',
                url: `/api/class`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`

                },
            };
            await axios(config)
                
                .then(response => {
                    console.log(response.data);

                    setBoards(response.data);
                }).catch(error => {
                    console.error(error);
                }
            );
        }
        getBoards();
    }, []);

    const location = useLocation();
    const token = localStorage.getItem('token');
    React.useEffect(() => {
        if (location.pathname === '/class') {
          
          if (!token) {
            // Redirect to the /class page
            window.location.href = '/login';
          } 
        }
      }, [location.pathname]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 800,
          height: 200,
        },
      }}
    >
        <Paper elevation={3} className='createClassButton'>
            <Button variant="contained" component={Link} to = "/class/new">강의 생성</Button>   
        </Paper>
        {
            boards.map((board, index) => {
                
                return (
                    <Paper elevation={3} key={index} >
                        <Paper variant="outlined" component="img" src = {board.thumbnail} 
                            sx={{
                                m: 1,
                                width: 180,
                                height: 180,
                                float: 'left',
                            }} />
                        {/* <img src={board.thumbnail}></img> */}
                        <h2>제목 : {board.title}</h2>
                        <p>시작시간 : {board.startDateTime}</p>
                        <p>참여 학생 : {board.studentMaxNum} 명</p>
                        <Button href={`/live/${board._id}`}>강의실 바로 가기 </Button>
                        
                        
                    </Paper>
                )
            }
            )
        }
    </Box>
  );
}