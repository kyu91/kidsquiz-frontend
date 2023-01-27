import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardCover from '@mui/material/CardMedia';

import axios from 'axios';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        SnowBall
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignIn() {

    const onhandlePost = async(data)=>{
      const config = {
          method: 'post',
          url: `/api/login`,
          headers: {
            'Content-Type': 'application/json',
          },
          data : data
        };
        
        await axios(config)
          .then(response => {
              alert('로그인 성공');
              //토큰 저장
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('name', response.data.name);
              window.location.href = '/class';
              
              }
          ).catch(error => {
              console.error(error);
          }
      );
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
        email: data.get('email'),
        password: data.get('password'),
        });

        onhandlePost(data);
    };


  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
      <CardCover sx={{ width: 400 }}>
        <Button component={Link} href="/">
          <img
            src="https://kidsquizbucket.s3.ap-northeast-2.amazonaws.com/kidsquiz_logo.png"
            loading="lazy"
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Button>
      </CardCover>
        <Typography component="h1" variant="h5" style={{marginBottom: "30px"}}>
          로그인
        </Typography>
        <Box 
          component="form" 
          onSubmit={handleSubmit}
          noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="이메일 입력"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="비밀번호 입력"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="계정 기억하기"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            style={{fontSize: "20px"}}
          >
            로그인
          </Button>
          <Grid container>
            <Grid item>
              <Link href="join" variant="body2">
                {"회원이 아니신가요? 회원가입"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    
    </>

  );
}