import * as React from "react";
import "dayjs/locale/fr";
import "dayjs/locale/ru";
import "dayjs/locale/de";
import "dayjs/locale/ar-sa";
import Button from "@mui/material/Button";
import axios from "axios";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useLocation} from 'react-router-dom';
import { useState } from "react";
import { TextField } from "@mui/material";
import { Grid } from "@mui/material";
import {Stack} from "@mui/material";



export default function CreateMaterialList() {
    //추가
    // 1️⃣ onChange함수를 사용하여 이벤트 감지, 필요한 값 받아오기
    const [puzzleList, setpuzzleList] = useState([]);
    const [quizList, setQuizList] = useState([]);
    const [imageList, setImageList] = useState([]);
    
    //퍼즐 값
    const onCheckedPuzzleElement = (e) => {
        let puzzleCopy = [...puzzleList];

        puzzleCopy.push(e._id)
        setpuzzleList(puzzleCopy);
        console.log("퍼즐카피", puzzleCopy)
        };
    //퀴즈 값
    const onCheckedQuizElement = (e) => {
        let quizCopy = [...quizList];

        quizCopy.push(e._id)
        setQuizList(quizCopy);
        console.log("퀴즈카피", quizCopy)
        };
    //이미지 값
    const onCheckedImageElement = (e) => {
        let imageCopy = [...imageList];

        imageCopy.push(e._id)
        setImageList(imageCopy);
        console.log("이미지카피", imageCopy)
        };
    


    //SUCCESS 클릭시
    const handleSubmitList = (event) => {
    
        let titleIs = (event.target.title.value)
        console.log("몇번 찍히니")
        
        // const data = new FormData();
        // data.append("title", event.target.title.value);
        // data.append("image", imageList);
        // data.append("puzzle", puzzleList);
        // data.append("multipleChoice", quizList);

        const form = {title : event.target.title.value,puzzle : {objectId:puzzleList}, 
        multipleChoice : {objectId:quizList}, image : {objectId:imageList}}
        console.log("이건 몇번찍히니?", form)
        // console.log("askdnasdklasnd", token)
        // console.log("타이틀입니다", event.target.title.value)
        onhandlePostList(form)
        event.preventDefault();
    };
    //밑에임
        const onhandlePostList = async (forms) => {
            console.log("qweqweqweqweqweqweqw",forms)
            if (forms.puzzle.length === 0 || forms.multipleChoice.length === 0 || forms.image.length === 0){
              console.log("리스트 없다")
              return
            }
            let config = {
              method: "post",
              url: "/api/classMaterial",
              headers: {
                "Content-Type": "application/json",
                Authorization: `${localStorage.getItem("token")}`,
              },
              
               data : forms,
            };
            console.log("🚀🚀🚀🚀", forms);
            await axios(config)
              .then((response) => {
                // alert("모음집이 생성되었습니다.");
                console.log(response);
              })
              .catch((error) => {
                console.error(error);
              });
          };
        
        //이거 살리면 됨
        // axios.post("/api/classMaterial", 
        //     {headers: {
        //     "Content-Type": "application/json",
        //     'Authorization': `${localStorage.getItem("token")}`}
        //   },{form}).then(response=>(console.log(response)));
        // 여기까지
        // axios.post("/api/classMaterial", {
        //     headers: {
        //       "Content-Type": "application/json",
        //       Authorization: `${localStorage.getItem("token")}`
        //     },
        //     body:({
        //         title:event.target.title.value,
        //         puzzle:{objectId:puzzleList}, 
        //         multipleChoice:{objectId:quizList}, 
        //         image:{objectId:imageList}
        //     })
        // }

        //)
          

        // console.log(form);
        // onhandlePost(data);
        //밑에거 살려
      //};

    //   const onhandlePostList = async (form) => {
    //     const config = {
    //       method: "post",
    //       url: "/api/classMaterial",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `${localStorage.getItem("token")}`,
    //       },
    //       form: form,
    //     };
    //     console.log("🚀🚀🚀🚀", form);
    //     await axios(config)
    //       .then((response) => {
    //         alert("모음집이 생성되었습니다.");
    //         console.log(response);
    //       })
    //       .catch((error) => {
    //         console.error(error);
    //       });
    //   };

            

    
    //추가


    const [Puzzles, setPuzzles] = React.useState([]);
    const [MultipleChoices, setMultipleChoices] = React.useState([]);
    const [justImages, setJustImages] = React.useState([]);
    
    //get 하는 부분
    React.useEffect(() => {
      const getPuzzles = async()=>{
        const config = {
            method: 'get',
            url: '/api/material',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`

            },
        };
        await axios(config)
            
            .then(response => {
                setPuzzles(response.data.puzzle);
                setMultipleChoices(response.data.multipleChoice);
                setJustImages(response.data.image);

            }).catch(error => {
                console.error(error.toJSON);
            }
        );
      }
      getPuzzles();
    }, []);

    const location = useLocation();
    const token = localStorage.getItem('token');
    React.useEffect(() => {
        if (location.pathname === '/material') {
          
          if (!token) {
            // Redirect to the /class page
            window.location.href = '/login';
          } 
        }
      }, [location.pathname]);



//!메인리턴
  return (
    <>
      <ResponsiveAppBar></ResponsiveAppBar>
      <React.Fragment>
      <Grid
        container
        spacing={3}
        component="form"
        encType="multipart/form-data"
        onSubmit={handleSubmitList}
      >
        <TextField
          required
          id="title"
          name="title"
          label="Title"
          fullWidth
          autoComplete="given-name"
          variant="standard"
        />


        {
          <Grid item xs={3}>
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
        <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 800,
          height: 200,
        },
      }}
    >
        {
          Puzzles.map((Puzzle, index) => {

            
            return (
            
              <Paper elevation={3} key={index} >
                <input type="checkbox"
                    value={Puzzle.data}
                     onClick={() => {
                        onCheckedPuzzleElement(Puzzle);
                     }} />

                <Paper variant='outlined' component="img" src ={Puzzle.image}
                sx={{ m:1, width:180, height:180, float:'left'}}></Paper>
                <h2> 제목 : {Puzzle.title} </h2>
                <p> 이미지 : {Puzzle.image}</p>
                <p>row, column : {Puzzle.user}</p>
              </Paper>
            )
          })
        }
        {
          MultipleChoices.map((MultipleChoice, index) => {

            
            return (
              <Paper elevation={3} key={index} >
                                <input type="checkbox"
                    value={MultipleChoice.data}
                    onClick={() => {
                        console.log("찍히나요?",MultipleChoice)
                        onCheckedQuizElement(MultipleChoice);
                     }} />
                <Paper variant='outlined' component="img" src ={MultipleChoice._id}
                sx={{ m:1, width:180, height:180, float:'left'}}></Paper>
                <h2> 제목 : {MultipleChoice.question} </h2>
                <p> 퀴즈1 : {MultipleChoice.secondChoice}</p>
                <p> 퀴즈2 : {MultipleChoice.secondChoice}</p>
              </Paper>
            )
          })
        }
          {
          justImages.map((Image, index) => {

            
            return (
              <Paper elevation={3} key={index} >
                                <input type="checkbox"
                    value={Image.data}
                    onClick={() => {
                        console.log("찍히나요?",Image)
                        onCheckedImageElement(Image);
                     }} />
                <Paper variant='outlined' component="img" src ={Image}
                sx={{ m:1, width:180, height:180, float:'left'}}></Paper>
                <h2> 이미지 : {Image.image} </h2>
              </Paper>
            )
          })
        }
               
    </Box>
  
      </React.Fragment>
    </>
  );
}