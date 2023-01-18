import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './component_style.css';
import { Typography } from '@mui/material';


export default function MaterialList() {
    const [materialList, setMaterialList] = React.useState([]);


    
    
    React.useEffect(() => {
        const getMaterial = async()=>{
            const config = {
                method: 'get',
                url: '/api/classMaterial',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`

                },
            };
            await axios(config)
                
                .then(response => {
                  setMaterialList(response.data.classMaterial);

                }).catch(error => {
                    console.error(error.toJSON);
                }
            );
        }
        getMaterial();
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
        },
      }}
    >
        <Paper elevation={3} className='createClassButton'
          sx={{
            m: 1,
            width: '35em',
            height: 200,
            float: "left",
          
          }}
          style={{textAlign: 'center'}}>
            <Typography variant="h3" style={{width: "100%", fontSize: "1.4em", marginBottom: "1em"}}>
              교구를 생성해 보세요</Typography>
            <Button 
              variant="contained" 
              component={Link} 
              to = "/material/list"
              style={{width: "10em", fontSize: "1em", fontWeight: "bold"}}>교구 모음</Button>
        </Paper>
        {
          materialList.map((material, index) => {

            
            return (
              <Paper  elevation={3} key={index} 
                sx={{
                  m: 1,
                  width: '35em',
                  height: 200,
                  float: "left",
                }}>
                <Paper 
                  variant='outlined'
                  component="img" 
                  src ={material.image}
                  sx={{
                    m: 1,
                    width: 180,
                    height: 180,
                    float: "left",
                    
                  }}></Paper>
                <h2 style={{marginTop: '4%', fontSize: '2em'}}>{material.title} </h2>
                <p style={{marginTop: '4%', marginBottom: '2%', fontSize: '1.1em'}}></p>
              </Paper>
            )
          })
        }             
    </Box>
  );
}