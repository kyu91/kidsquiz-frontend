import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import 'dayjs/locale/ru';
import 'dayjs/locale/de';
import 'dayjs/locale/ar-sa';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Button from '@mui/material/Button';
import axios from 'axios';
import { useState } from 'react';
import ResponsiveAppBar from './ResponsiveAppBar';





export default function CreateMaterial() {
    //라디오 버튼
    const [radio, setRadio] = React.useState(0);
    const handleChange = (event) => {
        setRadio(event.target.value);
    };

    //파일 업로드
    const [files, setFiles] = React.useState([]);
    const inputRef = React.useRef();
    function handleChangeFile(event) {
        setFiles(event.target.files);
    }

    //서브밋
    const onhandlePost = async(data)=>{
      const config = {
          method: 'post',
          url: '/api/material',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
          },
          data: data
      };
      await axios(config)
          .then(response => {
              alert('교구가 생성되었습니다.');
              console.log(response);
          }).catch(error => {
              console.error(error);
          }
      );
    };


    const handleSubmit = (event) => {
      event.preventDefault();
      const data = {
        title: event.target.title.value,
        thumbnail: files,
        studentMaxNum: radio
      };
      console.log(data);
      onhandlePost(data);
    };

  
  return (
    <>
    <ResponsiveAppBar></ResponsiveAppBar>
    <React.Fragment>
      <Typography variant="h4" mt={6}>
        교구 생성
      </Typography>
      <Grid container spacing={3} component="form" onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <TextField
            required
            id="title"
            name="title"
            label="교구 제목"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>

        {/* 입장인원선택 라디오 */}
        <Grid item xs={12}>
            <Typography variant="p" mt={2}>
                교구 선택
            </Typography>
            <p/>
            <RadioGroup 
                row 
                sx={{ my: 1 }} 
                name="controlled-radio-buttons-group" 
                onChange={handleChange}
                value={radio}
            >
                <Radio
                    color="info"
                    size="md"
                    variant="outlined"
                    label="퍼즐"
                    value={1}
                />
                <Radio
                    color="info"
                    size="md"
                    variant="outlined"
                    label="객관식"
                    value={2}
                />

            </RadioGroup>
        </Grid>
          {/*이미지 업로드 */}
          <Grid item xs={12}>
          <Stack direction="row" alignItems="center">
          <Typography variant="p" mt={2}>
            {files.length > 0 ? files[0].name : '이미지를 업로드해주세요.'}
          </Typography>
          <Button variant="contained" component="label">
            Upload File
            <input hidden accept="image/*" multiple type="file" ref={inputRef} onChange={handleChangeFile}/>
          </Button>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack spacing={2} direction="row">
            <Button variant="outlined" href='/class'>취소</Button>
            <Button 
              href='/class'
              variant="contained" 
              type='submit'
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >등록</Button>
          </Stack>
        </Grid>
      </Grid>
    </React.Fragment>
    </>
  );
}