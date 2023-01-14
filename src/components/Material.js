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




export default function Material() {

    const [boards, setBoards] = React.useState([]);

    React.useEffect(() => {
        const getBoards = async()=>{
            const config = {
                method: 'get',
                url: '/api/class',
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
            <Button variant="contained" component={Link} to = "/material/new">교구 생성</Button>   
        </Paper>
        
    </Box>
  );
}