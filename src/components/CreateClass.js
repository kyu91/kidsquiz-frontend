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






export default function CreateClass() {
    //날짜
    const [datePickerValue, setDatePickerValue] = React.useState(dayjs('2021-01-01'));
    const [timePickerValue, setTimePickerValue] = React.useState(dayjs('2021-01-01'));
    const date = datePickerValue.set('hour', timePickerValue.hour())
                            .set('minute', timePickerValue.minute())
                            .set('second', timePickerValue.second());

    const formattedDate = date.format('YYYY-MM-DD HH:mm:ss');


    //라디오 버튼
    const [radio, setRadio] = React.useState(0);
    const handleChange = (event) => {
        setRadio(event.target.value);
    };

    //비밀번호
    const [password, setPassword] = React.useState('');
    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };


    //교구선택
    const [materials, setMaterial] = React.useState('');
    const handleChangeMaterial = (event) => {
      setMaterial(event.target.value);
    };

    //파일 업로드
    const [files, setFiles] = React.useState([]);
    const inputRef = React.useRef();
    const handleChangeFile = (event) => {
      setFiles(event.target.files);
    };

    //서브밋
    const onhandlePost = async(data)=>{
      const config = {
          method: 'post',
          url: '/api/class/new',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
          },
          data: data
      };
      await axios(config)
          .then(response => {
              alert('강의가 생성되었습니다.');
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
        startDateTime: formattedDate,
        classKey: password,
        classMaterial: materials,
        thumbnail: files,
        studentMaxNum: radio
      };
      console.log(data);
      onhandlePost(data);
    };

  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <React.Fragment>
      <Typography variant="h4" mt={2}>
        라이브 생성
      </Typography>
      <Grid container spacing={3} component="form" onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <TextField
            required
            id="title"
            name="title"
            label="강의 제목"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>

        {/* 날짜 선택 툴 */}
        <Grid item xs={12}>
            <Stack spacing={3}>
                <Typography variant="p" mt={2}>
                    날짜 선택
                </Typography>
                <DatePicker
                value={datePickerValue}
                onChange={(newValue) => setDatePickerValue(newValue)}
                renderInput={(params) => <TextField {...params} />}
                />
                <TimePicker
                value={timePickerValue}
                onChange={(newValue) => setTimePickerValue(newValue)}
                renderInput={(params) => <TextField {...params} />}
                />
            </Stack>
        </Grid>

        {/* 입장인원선택 라디오 */}
        <Grid item xs={12}>
            <Typography variant="p" mt={2}>
                입장 인원
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
                    label="1명"
                    value={1}
                />
                <Radio
                    color="info"
                    size="md"
                    variant="outlined"
                    label="2명"
                    value={2}
                />
                <Radio
                    color="info"
                    size="md"
                    variant="outlined"
                    label="3명"
                    value={3}
                />
                <Radio
                    color="info"
                    size="md"
                    variant="outlined"
                    label="4명"
                    value={4}
                />
            </RadioGroup>
        </Grid>

        {/* 입장 비밀번호 */}
        <Grid item xs={12}>
          <TextField
            id="classKey"
            name="classKey"
            label="입장 비밀번호"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            onChange={handleChangePassword}
          />
        </Grid>

        {/* 교구 선택 */}
        <Grid item xs={12}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">교구선택</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={materials}
                label="Age"
                onChange={handleChangeMaterial}
              >
                <MenuItem value={10}>호랑이 이야기</MenuItem>
                <MenuItem value={20}>햇님달님</MenuItem>
                <MenuItem value={30}>이미지 묶음</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>

        {/* 섬네일 이미지 업로드 */}
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center">
          <Typography variant="p" mt={2}>
            {files.length > 0 ? files[0].name : '섬네일 이미지를 업로드해주세요.'}
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
    </LocalizationProvider>
  );
}