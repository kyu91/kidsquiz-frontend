import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CardCover from '@mui/material/CardMedia';

import { useLocation } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();


const GuestIntro = () => {
    const [names, setNames] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(names);
        setNames("");
        
    }

    const location = useLocation();
    const updatedUrl = location.replace('/intro', '');
    window.location.href = `${updatedUrl}`;
    
    
    
    
    
       
  return (
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
      <CardCover sx={{ width: 320 }}>
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
      </CardCover>
        <Typography component="h5" variant="h6">
          환영합니다!
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="name"
            label="이름을 입력해 주세요"
            type="text"
            id="name"
            autoComplete="current-password"
            onChange={(e) => {
                setNames(e.target.value);
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {}}
          >
            입장하기
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  </ThemeProvider>
  )
}

export default GuestIntro