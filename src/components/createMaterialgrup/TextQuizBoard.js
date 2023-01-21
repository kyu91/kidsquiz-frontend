import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {onhandlePostTextQuiz} from "./createMaterialPost.js";


const TextQuizBoard = ({radio}) => {
    //텍스트 퀴즈 드가자!
    const handleSubmitTextQuiz = (event) => {
      event.preventDefault();
      let data = new FormData();
      data.append("question", event.target.question.value);
      data.append("category", radio);
      data.append("firstChoice", event.target.firstChoice.value);
      data.append("secondChoice", event.target.secondChoice.value);
      data.append("answer", event.target.answer.value);
      console.log('포스트 하기 전에 잘담기나',data)
      onhandlePostTextQuiz(data);
    };
  return (
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
        style={{ marginBottom: "2rem" }}
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
        style={{ marginBottom: "2rem" }}
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

export default TextQuizBoard;
