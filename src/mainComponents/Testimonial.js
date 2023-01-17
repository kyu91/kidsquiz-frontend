import React from 'react';
import { Typography, Box, Card, CardContent, Grid } from '@mui/material';
import { Avatar } from '@mui/material';
import useStyles from '../styles/styles';

const Testimonial = () => {
  const classes = useStyles();
  const reviews = [
    {
      id: 1,
      name: '노유나 선생님',
      statement:
        '코로나 시국에 마스크를 쓰고 있어서 아이들의 언어발달이 많이 늦어지는 것을 몸소 경험했습니다. 키즈퀴즈는 아이들이 선생님과 함께 상호 작용 하게하는 좋은 플렛 폼 입니다. ',
      image_url:
        'https://sweta-myteam-website-fm.netlify.app/static/media/avatar-kady.78fc482c.jpg',
      position: '정글 어린이집 선생님',
    },
    {
      id: 2,
      name: '김봉수 어린이',
      statement:
        '유치원에서 수업할때는 선생님말을 알아듣기 어려웠는데 온라인 수업에서는 잘 알아 들을 수 있었어요.',
      image_url:
        'https://sweta-myteam-website-fm.netlify.app/static/media/avatar-aiysha.e119a0c1.jpg',
      position: '5살',
    },
    {
      id: 3,
      name: '오유진 원장님',
      statement:
        '주 1회 온라인으로 아이들 수업을 하고있습니다. 현장에서 수업하는 것보다 아이들이 아주 좋아 합니다. ',
      image_url:
        'https://sweta-myteam-website-fm.netlify.app/static/media/avatar-arthur.098c2e26.jpg',
      position: '정글 어린이집 원장님',
    },
  ];
  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: '20px',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '300px',
        width: '80%',
        margin: '0 auto',
      }}
    >
      <Grid container spacing={3}>
        {reviews.map((review) => (
          <Grid item sm={12} md={4} key={review.id}>
            <Card className={classes.testimonialCard}>
              <CardContent>
                <Typography className={classes.testimonialStatement}>
                  "{review.statement}"
                </Typography>
                <Box sx={{ display: 'flex' }}>
                  <Avatar
                    src={review.image_url}
                    size="large"
                    className={classes.avatar}
                  />
                  <Box>
                    <Typography>{review.name}</Typography>
                    <Typography className={classes.testimonialPosition}>
                      {review.position}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Testimonial;