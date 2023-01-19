import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Button from "@mui/material/Button";
import axios from "axios";
import { grey, blue } from '@mui/material/colors';


export default function CreateMaterial() {
  //봉수의 코드 칼부림
  //텍스트 퀴즈 드가자!
  const handleSubmitTextQuiz = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("question", event.target.question.value);
    data.append("category", radio);
    data.append("firstChoice", event.target.firstChoice.value);
    data.append("secondChoice", event.target.secondChoice.value);
    data.append("answer", event.target.answer.value);
    //title: event.target.title.value,
    // thumbnail: files,
    // studentMaxNum: radio
    console.log({
      question: data.get("question"),
      category: data.get("category"),
      firstChoice: data.get("firstChoice"),
      secondChoice: data.get("secondChoice"),
      answer: data.get("answer"),
    });
    onhandlePostTextQuiz(data);
  };

  const onhandlePostTextQuiz = async (data) => {
    const config = {
      method: "post",
      url: "/api/material/multipleChoice",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${localStorage.getItem("token")}`,
      },
      data: data,
    };
    console.log("🚀🚀🚀🚀", data);
    await axios(config)
      .then((response) => {
        alert("텍스트 퀴즈가 생성되었습니다.");
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // 이미지 객관식 입니다. 꼭 해야합니다 그래야만 합니다.

  const handleChangeFile2 = (event) => {
    setFiles(event.target.files);
  };

  const handleSubmitImg = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("question", event.target.question.value);
    data.append("category", radio);
    for (const file of files) {
        data.append('image', file)
     }
    data.append("answer", event.target.answer.value);

    console.log({
      question: data.get("question"),
      category: data.get("category"),
      image: data.get("image"),
      answer: data.get("answer"),
    });
    onhandlePostImg(data);
  };



  const onhandlePostImg = async (data) => {
    const config = {
      method: "post",
      url: "/api/material/multipleChoice",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${localStorage.getItem("token")}`,
      },
      data: data,
    };
    console.log("🚀🚀🚀🚀", data);
    await axios(config)
      .then((response) => {
        alert("이미지 퀴즈가 생성되었습니다.");
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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

  ///그냥 이미지 넣는거임
  const onhandlePostImages = async (data) => {
    const config = {
      method: "post",
      url: "/api/material/image",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${localStorage.getItem("token")}`,
      },
      data: data,
    };
    console.log("🚀🚀🚀🚀", data);
    await axios(config)
      .then((response) => {
        alert("이미지가 생성되었습니다.");
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmitJustImage = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("image", files);
    //title: event.target.title.value,
    // thumbnail: files,
    // studentMaxNum: radio

    console.log("12312123123123", files);
    onhandlePostImages(data);
  };

  // 서브밋
  const onhandlePost = async (data) => {
    const config = {
      method: "post",
      url: "/api/material/puzzle",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${localStorage.getItem("token")}`,
      },
      data: data,
    };
    console.log("🚀🚀🚀🚀", data);
    await axios(config)
      .then((response) => {
        alert("교구가 생성되었습니다.");
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("title", event.target.title.value);
    data.append("image", files);
    //title: event.target.title.value,
    // thumbnail: files,
    // studentMaxNum: radio

    console.log("12312123123123", data);
    onhandlePost(data);
  };

  return (
    <>
      <React.Fragment>
        <Typography variant="h4" mt={6}>
          교구 생성
        </Typography>
        <Typography variant="h6" mt={2} style={{marginBottom: '20px', color: '#808080'}}>
          강의를 위한 교구를 생성해 주세요.
        </Typography>
        {/* 입장인원선택 라디오 */}
        <Grid item xs={5}>
          
          <RadioGroup
            row
            sx={{ my: 3 }}
            name="controlled-radio-buttons-group"
            onChange={handleChange}
            value={radio}
            style={{ width: '100%' }}
          >
            <div>
            <Radio
              color="info"
              size="md"
              variant="outlined"
              label="글자 퀴즈"
              value={1}
              sx={{
                color: blue[900],
                '&.Mui-checked': {
                  color: blue[600],
                },
              }}
              style={{ width: '7em' }}
            />
            <Radio
              color="info"
              size="md"
              variant="outlined"
              label="그림 퀴즈"
              value={2}
              sx={{
                color: blue[900],
                '&.Mui-checked': {
                  color: blue[600],
                },
              }}
              style={{ width: '7em' }}
            />
            <Radio
              color="info"
              size="md"
              variant="outlined"
              label="퍼즐"
              value={3}
              sx={{
                color: blue[900],
                '&.Mui-checked': {
                  color: blue[600],
                },
              }}
              style={{ width: '7em' }}
            />
            <Radio
              color="info"
              size="md"
              variant="outlined"
              label="이미지"
              value={4}
              sx={{
                color: blue[900],
                '&.Mui-checked': {
                color: blue[600],
                
                },
              }}
              style={{ width: '7em' }}
            />
            </div>
            
          </RadioGroup>
          {radio == 4 ? (
              
                <Grid
                  container
                  spacing={3}
                  component="form"
                  encType="multipart/form-data"
                  onSubmit={handleSubmitJustImage}
                >
                  {/* 교구 이미지 업로드 환경 */}
                  <Grid item xs={12}>
                    <Stack direction="row" alignItems="center">
                      <Typography variant="p" mt={2}>
                        {files.name ? files.name : "수업에 사용할 이미지를 업로드해주세요."}
                      </Typography>
                      <Button variant="contained" component="label">
                        Upload File
                        <input
                          hidden
                          accept="image/*"
                          name="image"
                          type="file"
                          ref={inputRef}
                          onChange={handleChangeFile}
                        />
                      </Button>
                    </Stack>
                  </Grid>

                  {
                    <Grid item xs={12}>
                      <Stack spacing={2} direction="row">
                        <Button variant="outlined" href="/material">
                          취소
                        </Button>
                        <Button
                          //href='/material'
                          variant="contained"
                          type="submit"
                          fullWidth
                          sx={{ mt: 3, mb: 2 }}
                        >
                          등록
                        </Button>
                      </Stack>
                    </Grid>
                  }
                </Grid>
              
            ) : null}
            {radio == 3 ? (
              
                  <Grid
                    container
                    spacing={0}
                    component="form"
                    encType="multipart/form-data"
                    onSubmit={handleSubmit}
                  >
                    <Typography variant="h5" mt={2}>
                      퍼즐 제목*
                    </Typography>
                    <TextField
                      required
                      id="title"
                      name="title"
                      label="퍼즐제목을 입력해주세요."
                      fullWidth
                      autoComplete="given-name"
                      variant="standard"
                      style={{ marginBottom: '2rem' } }
                    />
                     {/* 나중에 밑에 지우면 됨 */}
                    <TextField
      
                      id="columns"
                      name="columns"
                      label="행을 입력해주세요."
                      fullWidth
                      autoComplete="given-name"
                      variant="standard"
                      style={{ marginBottom: '2rem' } }
                    />
                    <TextField
                  
                      id="rows"
                      name="row"
                      label="열을 입력해주세요."
                      fullWidth
                      autoComplete="given-name"
                      variant="standard"
                      style={{ marginBottom: '2rem' } }
                    />

                    
                    {/* 퍼즐 이미지 업로드 */}
                    <Grid item xs={12}>
                      
                      <Typography variant="h5" mt={2}>
                        퍼즐 이미지 업로드
                      </Typography>
                      <Stack direction="row" alignItems="center" style={{ marginBottom: '1em'  }}>
                        <Button variant="contained" component="label">
                          Upload File
                          <input
                            hidden
                            accept="image/*"
                            name="image"
                            type="file"
                            ref={inputRef}
                            onChange={handleChangeFile}
                          />
                        </Button>
                        <Typography variant="h6" mt={2} style={{color: '#c0c0c0', marginLeft: '1em'}}>
                        {files.name ? files.name : "퀴즈로 사용할 이미지 두 개를 업로드해주세요."}
                      </Typography>
                      </Stack>
                    </Grid>

                    {
                      <Grid item xs={12}>
                        <Stack spacing={2} direction="row">
                        <Button 
                          variant="outlined" 
                          href="/material"
                          type='submit'
                          fullWidth
                          style={{fontSize: '1.2rem'}}>
                          취소
                        </Button>
                        <Button
                          //href='/material'
                          variant="contained" 
                          type='submit'
                          fullWidth
                          style={{fontSize: '1.2rem'}}
                        >
                          등록
                        </Button>
                        </Stack>
                      </Grid>
                    }
                  </Grid>
                 
               
            ) : null}

            {/* 그림퀴즈 */}
            {radio == 2 ? (
              
                  <Grid
                    container
                    spacing={0}
                    component="form"
                    multiple
                    encType="multipart/form-data"
                    onSubmit={handleSubmitImg}
                  >

                    <Typography variant="h5" mt={2}>
                      문제*
                    </Typography>
                    <TextField
                      required
                      id="question"
                      name="question"
                      label="문제를 입력해주세요."
                      fullWidth
                      autoComplete="given-name"
                      variant="standard"
                      style={{ marginBottom: '2rem' } }
                    />

                    <Typography variant="h5" mt={2}>
                      첫번째 이미지 제목*
                    </Typography>
                    <TextField
                      // required
                      id="image"
                      name="image"
                      label="첫번째 이미지 제목을 입력해주세요."
                      fullWidth
                      autoComplete="given-name"
                      variant="standard"
                      style={{ marginBottom: '2rem' } }
                    />
        
                    <Typography variant="h5" mt={2}>
                      두번째 이미지 제목*
                    </Typography>
                    <TextField
                      // style={{display:'none'}}
                      //   required
                      id="image"
                      name="image"
                      label="두번째 이미지 제목을 입력해주세요."
                      fullWidth
                      autoComplete="given-name"
                      variant="standard"
                      style={{ marginBottom: '2rem' } }
                    />

                    <Typography variant="h5" mt={2}>
                      정답*
                    </Typography>
                    <TextField
                      required
                      id="answer"
                      name="answer"
                      label="숫자로만 입력 하시오. (1 or 2)"
                      fullWidth
                      autoComplete="given-name"
                      variant="standard"
                      style={{ marginBottom: '2rem' } }
                    />

                  {/*이미지 업로드*/}
                  <Grid item xs={12}>   
                    <Typography variant="h5" mt={2}>
                      섬네일 이미지 업로드
                    </Typography>
                    <Stack direction="row" alignItems="center">
                    <Button 
                      variant="contained" 
                      component="label"
                      style={{fontSize: '1rem', marginRight: "1em"}}>
                      Upload File
                      <input
                        hidden
                        accept="image/*"
                        multiple
                        name="image"
                        type="file"
                        ref={inputRef}
                        onChange={handleChangeFile2}
                      />
                      </Button>
                      <Typography variant="h6" mt={2} style={{color: '#c0c0c0', marginLeft: '1em'}}>
                        {files.name ? files.name : "퀴즈로 사용할 이미지 두 개를 업로드해주세요."}
                      </Typography>
                    </Stack>
                  </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={2} direction="row">
                        <Button 
                          variant="outlined" 
                          href="/material"
                          type='submit'
                          fullWidth
                          style={{fontSize: '1.2rem'}}>
                          취소
                        </Button>
                        <Button
                          //href='/material'
                          variant="contained" 
                          type='submit'
                          fullWidth
                          style={{fontSize: '1.2rem'}}
                        >
                          등록
                        </Button>
                      </Stack>
                    
                    </Grid>
                  </Grid>
               
            ) : null}

            {/* 글자퀴즈 */}
            {radio == 1 ? (
              
                  <Grid
                    container
                    spacing={0}
                    component="form"
                    encType="multipart/form-data"
                    onSubmit={handleSubmitTextQuiz}
                  >
                    <Typography variant="h5" mt={2}>
                      문제*
                    </Typography>
                    <TextField
                      required
                      id="question"
                      name="question"
                      label="문제를 입력해 주세요."
                      fullWidth
                      autoComplete="given-name"
                      variant="standard"
                      style={{ marginBottom: '2rem' } }
                    />
                    
                    <Typography variant="h5" mt={2}>
                      첫번째 선택지*
                    </Typography>
                    <TextField
                      required
                      id="firstChoice"
                      name="firstChoice"
                      label="첫번째 문항을 입력해 주세요."
                      fullWidth
                      autoComplete="given-name"
                      variant="standard"
                      style={{ marginBottom: '2rem' } }
                    />
                    
                    <Typography variant="h5" mt={2}>
                      두번째 선택지*
                    </Typography>
                    <TextField
                      required
                      id="secondChoice"
                      name="secondChoice"
                      label="두번째 문항을 입력해 주세요."
                      fullWidth
                      autoComplete="given-name"
                      variant="standard"
                      style={{ marginBottom: '2rem' } }
                    />
                    
                    <Typography variant="h5" mt={2}>
                      정답*
                    </Typography>
                    <TextField
                      required
                      id="answer"
                      name="answer"
                      label="숫자로만 입력 하시오. (1 or 2)"
                      fullWidth
                      autoComplete="given-name"
                      variant="standard"
                      style={{ marginBottom: '2rem' } }
                    />

                    <Grid item xs={12}>
                      <Stack spacing={2} direction="row">
                        <Button 
                          variant="outlined" 
                          href='/class'
                          type='submit'
                          fullWidth
                          style={{fontSize: '1.2rem'}}
                        >
                          취소
                        </Button>
                        <Button
                          variant="contained" 
                          type='submit'
                          fullWidth
                          style={{fontSize: '1.2rem'}}
                        >
                          등록
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
           
            ) : null}
        </Grid>
      </React.Fragment>
    </>
  );
}