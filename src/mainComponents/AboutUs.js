import React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import bestTeams from '../images/bestTeams.jpg';
import useStyles from '../styles/styles';

const AboutUs = () => {
  const classes = useStyles();

  return (
    <Box className={classes.aboutUsContainer}>
      <Grid container spacing={6} className={classes.gridContainer}>
        <Grid item xs={12} md={5}>
          <img src='https://www.nhis.or.kr/static/alim/paper/oldpaper/202111/assets/images/sub/sub10_03.gif' 
          alt="My Team" className={classes.largeImage} />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h3" fontWeight={700} className={classes.title}>
            키즈퀴즈의 회원이 아닌가요?
          </Typography>
          <Typography className={classes.aboutUsSubtitle}>
            키즈퀴즈의 라이브 강의를 만들기 위해선 회원가입이 필수 입니다. <br/>지금 무료로 회원가입 하고 이용해 보세요. 
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: '300px', fontSize: '25px' }}
          >
            회원가입
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutUs;