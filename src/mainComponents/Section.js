import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import useStyles from '../styles/styles';

const Section = () => {
  const classes = useStyles();

  const sectionItems = [
    {
      id: 1,
      icon: <EngineeringOutlinedIcon sx={{ fontSize: 100 }} color="primary" />,
      sentence:
        '생생한 화상교육을 통해 선생님의 입모양, 목소리, 표정 등을 통해 아이들의 학습을 돕습니다.',
    },
    {
      id: 2,
      icon: <AllInclusiveIcon sx={{ fontSize: 100 }} color="primary" />,
      sentence:
        '아이들의 학습을 위한 다양한 교구를 직접 만들고, 아이들과 상호작용해보세요.',
    },
    {
      id: 3,
      icon: <PaidOutlinedIcon sx={{ fontSize: 100 }} color="primary" />,
      sentence: '모든 서비스를 무료로 사용해 보세요.',
    },
  ];
  return (
    <Box sx={{ flexGrow: 1, minHeight: '400px' }}>
      <Grid container className={classes.sectionGridContainer}>
        {sectionItems.map((item) => (
          <Grid
            item
            xs={12}
            md={3.5}
            minHeight={300}
            key={item.id}
            className={classes.sectionGridItem}
          >
            {item.icon}
            <Typography>{item.sentence}</Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Section;