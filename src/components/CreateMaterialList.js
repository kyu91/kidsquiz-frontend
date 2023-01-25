import * as React from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { TextField } from "@mui/material";
import { Grid } from "@mui/material";
import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Checkbox from '@mui/material/Checkbox';

export default function CreateMaterialList() {
  //추가
  // 1️⃣ onChange함수를 사용하여 이벤트 감지, 필요한 값 받아오기
  const [puzzleList, setpuzzleList] = useState([]);
  const [quizList, setQuizList] = useState([]);
  const [imageList, setImageList] = useState([]);

  //퍼즐 값
  const onCheckedPuzzleElement = (e) => {
    let puzzleCopy = [...puzzleList];

    puzzleCopy.push(e._id);
    setpuzzleList(puzzleCopy);
    console.log("퍼즐카피", puzzleCopy);
  };
  //퀴즈 값
  const onCheckedQuizElement = (e) => {
    let quizCopy = [...quizList];

    quizCopy.push(e._id);
    setQuizList(quizCopy);
    console.log("퀴즈카피", quizCopy);
  };
  //이미지 값
  const onCheckedImageElement = (e) => {
    let imageCopy = [...imageList];

    imageCopy.push(e._id);
    setImageList(imageCopy);
    console.log("이미지카피", imageCopy);
  };

  //SUCCESS 클릭시
  const handleSubmitList = (event) => {
    const form = {
      title: event.target.title.value,
      puzzle: puzzleList,
      multipleChoice: quizList,
      image: imageList,
    };
    console.log("이건 몇번찍히니?", form);
    onhandlePostList(form);
    event.preventDefault();
  };
  //밑에임
  const onhandlePostList = async (forms) => {
    let config = {
      method: "post",
      url: "/api/classMaterial",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },

      data: forms,
    };
    console.log("🚀🚀🚀🚀", forms);
    await axios(config)
      .then((response) => {
        alert("모음집이 생성되었습니다.");
        window.location.reload();
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //추가

  const [Puzzles, setPuzzles] = React.useState([]);
  const [MultipleChoices, setMultipleChoices] = React.useState([]);
  const [justImages, setJustImages] = React.useState([]);

  //get 하는 부분
  React.useEffect(() => {
    const getPuzzles = async () => {
      const config = {
        method: "get",
        url: "/api/material",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      };
      await axios(config)
        .then((response) => {
          setPuzzles(response.data.puzzle);
          setMultipleChoices(response.data.multipleChoice);
          setJustImages(response.data.image);
        })
        .catch((error) => {
          console.error(error.toJSON);
        });
    };
    getPuzzles();
  }, []);

  const location = useLocation();
  const token = localStorage.getItem("token");
  React.useEffect(() => {
    if (location.pathname === "/material") {
      if (!token) {
        // Redirect to the /class page
        window.location.href = "/login";
      }
    }
  }, [location.pathname]);

  //!메인리턴
  return (
    <React.Fragment>
      <Grid
        container
        component="form"
        encType="multipart/form-data"
        onSubmit={handleSubmitList}
      >
        <Typography variant="h4">교구묶음 생성</Typography>

        <TextField
          required
          id="title"
          name="title"
          label="교구묶음 제목"
          fullWidth
          autoComplete="given-name"
          variant="standard"
          sx={{ mt: 2, mb: 2 }}
        />

        {
          <Grid item xs={3}>
            <Stack spacing={2} direction="row">
              <Button variant="outlined" href="/material">
                취소
              </Button>
              <Button
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
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            // m: 1,
          },
        }}
      >
        {/* 퍼즐 리스트 */}
        {Puzzles.map((Puzzle, index) => {
          return (
            <Box
              key={index}
              sx={{
                textAlign: "center",
              }}
            >
              <Box
                elevation={0}
                sx={{
                  m: 1,
                  width: "15rem",
                  height: "15rem",
                  borderRadius: "1.5rem",
                  background: "#f8f8ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "1rem",
                }}
              >
                <Paper
                  elevation={0}
                  component="img"
                  src={
                    Puzzle.image ||
                    "https://kidsquizbucket.s3.ap-northeast-2.amazonaws.com/%E2%80%94Pngtree%E2%80%94toys+box_8877082.png"
                  }
                  sx={{
                    width: "13rem",
                    height: "13rem",
                    borderRadius: "1.5rem",
                    background: "#f8f8ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #dde0ea",
                  }}
                ></Paper>
              </Box>
              <Button
                variant="text"
                component={Box}
                style={{ width: "10em", fontSize: "1em" }}
              >
                [퍼즐] {Puzzle.title}
              </Button>
              <p style={{ fontSize: "1em" }}></p>
              <Checkbox
                type="checkbox"
                value={Puzzle.data}
                onClick={() => {
                  onCheckedPuzzleElement(Puzzle);
                }}
              />
            </Box>
          );
        })}

        {/* 퀴즈 리스트 */}
        {MultipleChoices.map((MultipleChoice, index) => {
          return (
            <Box
              key={index}
              sx={{
                textAlign: "center",
              }}
            >
              <Box
                elevation={0}
                sx={{
                  m: 1,
                  width: "15rem",
                  height: "15rem",
                  borderRadius: "1.5rem",
                  background: "#f8f8ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "1rem",
                }}
              >
                <Paper
                  elevation={0}
                  component="img"
                  src={
                    MultipleChoice.image ||
                    "https://kidsquizbucket.s3.ap-northeast-2.amazonaws.com/%E2%80%94Pngtree%E2%80%94toys+box_8877082.png"
                  }
                  sx={{
                    width: "13rem",
                    height: "13rem",
                    borderRadius: "1.5rem",
                    background: "#f8f8ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #dde0ea",
                  }}
                ></Paper>
              </Box>
              <Button
                variant="text"
                component={Box}
                style={{ width: "10em", fontSize: "1em" }}
              >
                [퀴즈] {MultipleChoice.question}
              </Button>
              <h2 style={{ fontSize: "1em" }}></h2>
              <Checkbox
                type="checkbox"
                value={MultipleChoice.data}
                onClick={() => {
                  onCheckedQuizElement(MultipleChoice);
                }}
              />
            </Box>
          );
        })}

        {/* 퀴즈 리스트 */}
        {justImages.map((Image, index) => {
          return (
            <Box
              key={index}
              sx={{
                textAlign: "center",
              }}
            >
              <Box
                elevation={0}
                sx={{
                  m: 1,
                  width: "15rem",
                  height: "15rem",
                  borderRadius: "1.5rem",
                  background: "#f8f8ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "1rem",
                }}
              >
                <Paper
                  elevation={0}
                  component="img"
                  src={
                    Image.image ||
                    "https://images.chosun.com/resizer/5UBvfTU-pa3fiMELyLWDZ1QVPLs=/530x576/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/JC53LPAYARPTIYHZKBA5BHT7MA.png"
                  }
                  sx={{
                    width: "13rem",
                    height: "13rem",
                    borderRadius: "1.5rem",
                    background: "#f8f8ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #dde0ea",
                  }}
                ></Paper>
              </Box>
              <Button
                variant="text"
                component={Box}
                style={{ width: "10em", fontSize: "1em" }}
              >
                {"[이미지]"}
              </Button>
              <div style={{ fontSize: "1em" }}></div>
              <Checkbox
                type="checkbox"
                value={Image.data}
                onClick={() => {
                  onCheckedImageElement(Image);
                }}
              />
            </Box>
          );
        })}
      </Box>
    </React.Fragment>
  );
}
