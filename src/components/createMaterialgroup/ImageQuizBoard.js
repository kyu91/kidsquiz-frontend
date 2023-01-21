import React from "react";
import { Grid, Typography, TextField, Stack, Button } from "@mui/material";
import { onhandlePostImgQuiz } from "./createMaterialPost";

const ImageQuizBoard = ({ radio, files, setFiles, inputRef }) => {

  //이미지퀴즈 submit
  const handleSubmitImg = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("question", event.target.question.value);
    data.append("category", radio);
    for (let file of files) {
      data.append("image", file);
    }
    data.append("answer", event.target.answer.value);
    onhandlePostImgQuiz(data);
  };
  const handleChangeFile2 = (event) => {
    console.log("테스트테스트", event.target.files)
    setFiles(event.target.files);
  };
  return (
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
        style={{ marginBottom: "2rem" }}
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
        style={{ marginBottom: "2rem" }}
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
        style={{ marginBottom: "2rem" }}
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
        style={{ marginBottom: "2rem" }}
      />
      <Grid item xs={12}>
        <Typography variant="h5" mt={2}>
          이미지 업로드 2개*
        </Typography>
        <Stack direction="row" alignItems="center">
          <Button
            variant="contained"
            component="label"
            style={{ fontSize: "1rem", marginRight: "1em" }}
          >
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
          <Typography
            variant="h6"
            mt={2}
            style={{ color: "#c0c0c0", marginLeft: "1em" }}
          >
            {files
              ? files.name
              : "퀴즈로 사용할 이미지 두 개를 업로드해주세요."}
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack spacing={2} direction="row">
          <Button
            variant="outlined"
            href="/material"
            type="submit"
            fullWidth
            style={{ fontSize: "1.2rem" }}
          >
            취소
          </Button>
          <Button
            //href='/material'
            variant="contained"
            type="submit"
            fullWidth
            style={{ fontSize: "1.2rem" }}
          >
            등록
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ImageQuizBoard;
