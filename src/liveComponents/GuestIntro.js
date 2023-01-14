import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CardCover from '@mui/material/CardMedia';
import { NavLink } from 'react-router-dom';
import Modal from '@mui/material/Modal';
//store.js improt


import { useLocation } from 'react-router-dom';



// import useStore from '../store';

//모달
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



const GuestIntro = () => {
    // const {names, setNames} = useStore();
    // console.log(names);

    //현재URL에서 /intro를 제거
    const location = useLocation();
    const updatedUrl = location.pathname.replace('/intro', '');

    //사용자가 들어올때마다 고유 키를 생성
    const guestKey = Math.random().toString(36).substr(2, 9);

    //방이름을 추출
    const roomName = updatedUrl.split('/')[2];



    const handleSubmit = (e) => {
      e.preventDefault();   
      
      //로컬스토리지에 이름과 고유키를 저장
      localStorage.setItem('guestName', e.target.name.value);
      localStorage.setItem('guestKey', guestKey);
      localStorage.setItem('roomName', roomName);

    }
    

    //모달
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
      setOpen(false);
      window.location.reload();
    }

    

       
  return (
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
          />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleOpen}
            >
              입장하기
            </Button>

            {/* 모달 */}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  환영합니다.
                </Typography>
                <NavLink to={updatedUrl}>강의실 이동</NavLink>
              </Box>
            </Modal>
        </Box>
      </Box>
    </Container>
  )
}

export default GuestIntro