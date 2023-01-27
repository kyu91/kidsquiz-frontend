import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import CardCover from '@mui/material/CardMedia';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://kidsquiz.kr/">
        We are kidsquiz ༼ つ ◕_◕ ༽つ
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default function SignUp() {


  const [inputValue, setInputValue] = React.useState();

  const handleChange = e => {
    let number = e.target.value;
    if (number.length === 10) {
      number = (number.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
    }
    if (number.length === 13) {
      number = (number.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
    }
    setInputValue(number);
  }


  const onhandlePost = async (data) => {
    const config = {
      method: 'post',
      url: '/api/join',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    };

    await axios(config)
      .then(response => {
        console.log(response.data);
        alert("회원가입이 완료되었습니다.");
        window.location.href = "/login";
      }
      ).catch(error => {
        console.error(error);
      }
      );
  }



  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log("데이터 확인", data);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      name: data.get('name'),
      phoneNumber: data.get('phoneNumber'),

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
        <Typography component="h1" variant="h5" style={{ marginBottom: "30px" }}>
          회원가입
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate sx={{ mt: 1 }}
       
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="이메일"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="비밀번호"
            type="password"
            id="password"
            autoComplete="new-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="이름"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="phoneNumber"
            label="전화번호"
            type="phoneNumber"
            id="phoneNumber"
            autoComplete="phoneNumber"
            onChange={handleChange}
            value={inputValue}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            style={{ fontSize: "20px" }}
          >
            회원가입
          </Button>
          <Grid container>
            <Grid item>
              <Link href="login" variant="body2">
                {"이미 회원이신가요?"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />

    </>
  );
}

