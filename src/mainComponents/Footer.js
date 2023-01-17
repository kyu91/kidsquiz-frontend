import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import useStyles from '../styles/styles';

const Footer = () => {
  const date = new Date().getFullYear();
  const classes = useStyles();

  return (
    <Box sx={{ flexGrow: 1 }} className={classes.footerContainer}>
      <Typography className={classes.footerText}>
        대표이사 오유진
      </Typography>
      <Typography className={classes.footerDate}>&copy; SnowBall</Typography>
    </Box>
  );
};

export default Footer;