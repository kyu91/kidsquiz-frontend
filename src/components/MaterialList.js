import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./component_style.css";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import { requirePropFactory } from "@mui/material";



export default function MaterialList() {
  const [materialList, setMaterialList] = React.useState([]);

  React.useEffect(() => {
    const getMaterial = async () => {
      const config = {
        method: "get",
        url: "/api/classMaterial",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      };
      await axios(config)
        .then((response) => {
          setMaterialList(response.data.classMaterial);
        })
        .catch((error) => {
          console.error(error.toJSON);
        });
    };
    getMaterial();
  }, []);

  const location = useLocation();
  const token = localStorage.getItem("token");
  React.useEffect(() => {
    if (location.pathname === "/material") {
      if (!token) {
        window.location.href = "/login";
      }
    }
  }, [location.pathname]);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {},
      }}
    >
      <Box sx={{
        textAlign: "center",
      }}>
        <Button elevation={0}
                sx={{
                  m: 1,
                  width: '15rem',
                  height: '15rem',
                  borderRadius: "1.5rem",
                  background: "#f7f7fa",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                component={Link}
                to="/material/list">
          <AddToPhotosIcon
            sx={{
              color: "#dde0ea",
              width: "4rem",
              height: "4rem"
            }}></AddToPhotosIcon>
        </Button>
        <Button
          variant="text"
          component={Link}
          to="/material/list"
          style={{width: "10em", fontSize: "1em"}}>
            새 교구 모음 만들기
        </Button>
      </Box>
      {
        materialList.map((material, index) => {
        return (
          <Box key={index} sx={{
            textAlign: "center"
          }}>
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
              <Paper elevation={0}
                    component="img"
                    src={!material.image? material.image : 'https://kidsquizbucket.s3.ap-northeast-2.amazonaws.com/upload/1674238515687_7875399.png'}
                    sx={{
                      padding: "3.75em",
                      width: "13rem",
                      height: "13rem",
                      borderRadius: "1.5rem",
                      background: "#f8f8ff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid #dde0ea",
                    }}>
              </Paper>
            </Box>
            <Button
              variant="text"
              component={Box}
              style={{width: "10em", fontSize: "1em"}}>{material.title}</Button>
            <h2 style={{fontSize: '1em'}}></h2>
          </Box>
        );
      })}
    </Box>
  );
}
