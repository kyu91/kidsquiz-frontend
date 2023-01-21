import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";

import axios from "axios";
import { Link } from "react-router-dom";
import "./component_style.css";
import { Typography } from "@mui/material";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import { border } from '@mui/system';

export default function Materials() {
  //const [materials, setMaterials] = React.useState([]);
  const [Puzzles, setPuzzles] = React.useState([]);
  const [MultipleChoices, setMultipleChoices] = React.useState([]);
  const [justImages, setJustImages] = React.useState([]);

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

  //!메인 리턴!
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          // m: 1,
        },
      }}
    >
      {/* 생성버튼 박스 */}
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Button
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
          }}
          component={Link}
          to="/material/new"
        >
          <AddToPhotosIcon
            sx={{
              color: "#dde0ea",
              width: "4rem",
              height: "4rem",
            }}
          ></AddToPhotosIcon>
        </Button>
        <Button
          variant="text"
          component={Link}
          to="/material/new"
          style={{ width: "10em", fontSize: "1em" }}
        >
          새 교구 만들기
        </Button>
      </Box>

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
                
              }}>
              <Paper
                elevation={0}
                component="img"
                src={Puzzle.image || "https://images.chosun.com/resizer/5UBvfTU-pa3fiMELyLWDZ1QVPLs=/530x576/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/JC53LPAYARPTIYHZKBA5BHT7MA.png"}
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
            <h2 style={{ fontSize: "1em" }}></h2>
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
            
          }}>
            
          <Paper
            elevation={0}
            component="img"
            src={MultipleChoice.image || "https://images.chosun.com/resizer/5UBvfTU-pa3fiMELyLWDZ1QVPLs=/530x576/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/JC53LPAYARPTIYHZKBA5BHT7MA.png"}
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
          >
          </Paper>
        </Box>
        <Button
          variant="text"
          component={Box}
          style={{ width: "10em", fontSize: "1em" }}
        >
          [퀴즈] {MultipleChoice.question}
        </Button>
      </Box>
    );
  
  })}

      {/* 이미지 리스트 */}
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
            
          }}>
            
          <Paper
            elevation={0}
            component="img"
            src={Image.image || "https://images.chosun.com/resizer/5UBvfTU-pa3fiMELyLWDZ1QVPLs=/530x576/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/JC53LPAYARPTIYHZKBA5BHT7MA.png"}
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
          >
            
          </Paper>
        </Box>
        <Button
          variant="text"
          component={Box}
          style={{ width: "10em", fontSize: "1em" }}
        >
          {"[이미지]"}
        </Button>
      </Box>
    );
  })}
  
  
    
    </Box>
  );
}
