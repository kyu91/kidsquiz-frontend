import React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';

import useStyles from '../styles/styles';
import { Link } from 'react-router-dom';


const Hero = () => {
  const classes = useStyles();

  return (
    <Box className={classes.heroBox} style={{background: "white"}}>
      <Grid container spacing={1} className={classes.gridContainer} style={{paddingRight: 0, flexWrap: "nowrap"}}>
        <Grid item xs={12} md={4} mr={5}>
          <Typography variant="h3" fontWeight={700} className={classes.title}>
            다양한 교구를 직접 만드는 라이브 교육
          </Typography>
          <Typography variant="h6" className={classes.subtitle} style={{fontStyle: "italic"}}>
            키즈퀴즈는 유아 교육에 필요한 다양한 교구를 선생님이 직접 만들고, 아이들과 상호작용하며 교육 할수 있는 온라인 교육 플랫폼입니다.  
          </Typography>
          <div style={{textAlign: "center"}}>
            <Button
              component={Link}
              variant="contained"
              color="primary"
              sx={{ width: '300px', fontSize: '25px' }}
              to={'/login'}
            >
              로그인 후 이용하기
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} md={8}>
          <img src={'https://www.garmuri.com/files/attach/images/169/121/082/95ca60d3faebb5f3f30502083278f51c.gif'} alt="My Team" className={classes.largeImage} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Hero;