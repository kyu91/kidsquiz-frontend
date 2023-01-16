import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import 'dayjs/locale/fr';
import 'dayjs/locale/ru';
import 'dayjs/locale/de';
import 'dayjs/locale/ar-sa';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Button from '@mui/material/Button';
import axios from 'axios';
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
    const handleChangeFile = (event) => {
        setFiles(event.target.files[0]);
    };

    //2줄 추가
    //const formData = new FormData();
    //formData.append('imageFile', fileData);

    // 서브밋
    const onhandlePost = async(data)=>{
      const config = {
          method: 'post',
          url: '/api/material/puzzle',
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `${localStorage.getItem('token')}`
          },
          data : data
        };
        console.log("🚀🚀🚀🚀", data)
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
      const data = new FormData();
      data.append("title", event.target.title.value) ;
      data.append("image", files);
        //title: event.target.title.value,
        // thumbnail: files,
        // studentMaxNum: radio
      
      console.log('12312123123123',data);
      onhandlePost(data);
    };
  
  return (
    <>
    <ResponsiveAppBar></ResponsiveAppBar>
    <React.Fragment>
      <Typography variant="h4" mt={6}>
        교구 생성
      </Typography>
      <Grid container spacing={3} component="form" encType="multipart/form-data" onSubmit={handleSubmit}>
        {/* <Grid item xs={12}>
          <TextField
            required
            id="title"
            name="title"
            label="교구 제목"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid> */}

        {/* 입장인원선택 라디오 */}
        <Grid item xs={12}>
            {/* <Typography variant="p" mt={2}>
                교구 선택
            </Typography> */}
            <p/>
            <RadioGroup 
                row 
                sx={{ my: 3 }} 
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
                {
                  radio == 1 ? 
                  <div>
                  <br/>
                  <p>
              <Grid container spacing={3} component="form" encType="multipart/form-data" onSubmit={handleSubmit}>          
              <TextField
                required
                id="title"
                name="title"
                label="Title"
                fullWidth
                autoComplete="given-name"
                variant="standard"
              />
              </Grid>
                {/*이미지 업로드 */}
                <Grid item xs={12}>
                <Stack direction="row" alignItems="center">
                <Typography variant="p" mt={2}>
                  {files.length > 0 ? files[0].name : '이미지를 업로드해주세요.'}
                </Typography>
                <Button variant="contained" component="label">
                  Upload File
                  <input hidden accept="image/*" name="image" type="file" ref={inputRef} onChange={handleChangeFile}/>
                </Button>
                </Stack>
              </Grid>
              </p>  </div> : null
                    
                }

            </RadioGroup>
        </Grid>
          {/*이미지 업로드 */}
          {/* <Grid item xs={12}>
          <Stack direction="row" alignItems="center">
          <Typography variant="p" mt={2}>
            {files.length > 0 ? files.name : '이미지를 업로드해주세요.'}
          </Typography>
          <Button variant="contained" component="label">
            Upload File
            <input hidden accept="image/*" type="file" ref={inputRef} onChange={handleChangeFile}/>
          </Button>
          </Stack>
        </Grid> */}

        <Grid item xs={12}>
          <Stack spacing={2} direction="row">
            <Button variant="outlined" href='/material'>취소</Button>
            <Button 
              //href='/material'
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