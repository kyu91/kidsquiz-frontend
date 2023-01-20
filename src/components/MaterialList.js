import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./component_style.css";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";

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
                    src={!material.image? material.image : "https://images.chosun.com/resizer/5UBvfTU-pa3fiMELyLWDZ1QVPLs=/530x576/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/JC53LPAYARPTIYHZKBA5BHT7MA.png"}
                    sx={{
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
