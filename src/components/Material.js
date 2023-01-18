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
import { Typography } from '@mui/material';


export default function Materials() {

    //const [materials, setMaterials] = React.useState([]);
    const [Puzzles, setPuzzles] = React.useState([]);
    const [MultipleChoices, setMultipleChoices] = React.useState([]);
    const [justImages, setJustImages] = React.useState([]);
    
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
                    setPuzzles(response.data.puzzle);
                    setMultipleChoices(response.data.multipleChoice);
                    setJustImages(response.data.image);

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


      //!메인 리턴!
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          // m: 1,
        },
      }}
    >
      {/* 생성버튼 박스 */}
        <Paper elevation={3} className='createClassButton'
          sx={{
            m: 1,
            width: '35em',
            height: 200,
            float: "left",
          }}
          style={{textAlign: 'center'}}
        >
          <Typography variant="h3" style={{width: "100%", fontSize: "1.4em", marginBottom: "1em"}}>교구를 생성해 보세요</Typography>
            <Button 
              variant="contained" 
              component={Link} 
              to = "/material/new"
              style={{width: "10em", fontSize: "1em", fontWeight: "bold"}}
            >교구 생성</Button>
        </Paper>

        {/* 퍼즐 리스트 */}
        {
          Puzzles.map((Puzzle, index) => {
            return (
              <Paper elevation={3} key={'paper'+index} 
                sx={{
                  m: 1,
                  width: '35em',
                  height: 200,
                  float: "left",
                }}>
                <Paper 
                  variant='outlined'
                  component="img" 
                  src ={Puzzle.image}
                  sx={{
                    m: 1,
                    width: 180,
                    height: 180,
                    float: "left",
                    
                  }}></Paper>
                <h2 style={{marginTop: '4%', fontSize: '2em'}}>{Puzzle.title} </h2>
                <p style={{marginTop: '4%', marginBottom: '2%', fontSize: '1.1em'}}>
                  퍼즐 교구
                </p>
              </Paper>
            )
          })
        }

        {/* 퀴즈 리스트 */}
        {
          MultipleChoices.map((MultipleChoice, index) => {
            console.log(MultipleChoice);
            return (
              <Paper elevation={3} key={'MultipleChoice'+ index} 
                sx={{
                  m: 1,
                  width: '35em',
                  height: 200,
                  float: "left",
                }}>
                <Paper variant='outlined' component="img" src ={MultipleChoice.firstChoice}
                sx={{
                  m: 1,
                  width: 180,
                  height: 180,
                  float: "left",
                  
                }}></Paper>
                <h2 style={{marginTop: '4%', fontSize: '2em'}}>{MultipleChoice.question} </h2>
                <p style={{marginTop: '4%', marginBottom: '2%', fontSize: '1.1em'}}>
                  퀴즈 교구
                </p>
              </Paper>
            )
          })
        }

        {/* 이미지 리스트 */}
        {
          justImages.map((Image, index) => {
            console.log(Image);

            return (
              <Paper elevation={3} key={'justImages'+ index} 
                sx={{
                  m: 1,
                  width: '35em',
                  height: 200,
                  float: "left",
                }}>
                <Paper variant='outlined' component="img" src ={Image.image}
                  sx={{
                    m: 1,
                    width: 180,
                    height: 180,
                    float: "left",
                  }}></Paper>
                  <h2 style={{marginTop: '4%', fontSize: '2em'}}>이미지 교구</h2>
              </Paper>
            )
          })
        }
               
    </Box>
  );
}