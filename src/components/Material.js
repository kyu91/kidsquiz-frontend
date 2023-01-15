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




export default function Materials() {

    //const [materials, setMaterials] = React.useState([]);
    const [Puzzles, setPuzzles] = React.useState([]);
    console.log('0000000',Puzzles)
    React.useEffect(() => {
        const getPuzzles = async()=>{
            const config = {
                method: 'get',
                url: '/api/material',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`

                },
            };
            await axios(config)
                
                .then(response => {
                    console.log("678678678",response.data.Puzzle);

                    setPuzzles(response.data.Puzzle);
                }).catch(error => {
                    console.error(error.toJSON);
                }
            );
        }
        getPuzzles();
    }, []);

    const location = useLocation();
    const token = localStorage.getItem('token');
    React.useEffect(() => {
        if (location.pathname === '/material') {
          
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
        {
          Puzzles.map((Puzzle, index) => {

            
            return (
              <Paper elevation={3} key={index} >
                <Paper variant='outlined' component="img" src ={Puzzle.image}
                sx={{ m:1, width:180, height:180, float:'left'}}></Paper>
                <h2> 제목 : {Puzzle.title} </h2>
                <p> 이미지 : {Puzzle.image}</p>
                <p>row, column : {Puzzle.user}</p>
              </Paper>
            )
          })
        }
               
    </Box>
  );
}