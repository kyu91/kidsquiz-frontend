import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';


import axios from 'axios';
import { Link } from 'react-router-dom';




export default function Boards() {

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
                    console.log(response);
                    setBoards(response.data);
                }).catch(error => {
                    console.error(error);
                }
            );
        }
        getBoards();
    }, []);
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
        <Paper elevation={3}>
            <Button variant="contained" component={Link} to = "/class/new">강의 생성</Button>   
        </Paper>
        {
            boards.map((board, index) => {
                console.log(board);
                return (
                    <Paper elevation={3} key={index}>
                        <img src='{board.thumbnail}'></img>
                        <h2>{board.title}</h2>
                        <p>{board.startDateTime}</p>
                        <p>{board.studentMaxNum}</p>
                        
                        
                    </Paper>
                )
            }
            )
        }
    </Box>
  );
}