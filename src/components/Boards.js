import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
import { Link } from "react-router-dom";
import "./component_style.css";
import { Typography } from "@mui/material";

export default function Boards() {
  const [boards, setBoards] = React.useState([]);

  React.useEffect(() => {
    const getBoards = async () => {
      const config = {
        method: "get",
        url: `/api/class`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      };
      await axios(config)
        .then((response) => {
          console.log(response.data);

          setBoards(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getBoards();
  }, []);

  const location = useLocation();
  const navigate = useNavigate()
  const token = localStorage.getItem("token");
  React.useEffect(() => {
    if (location.pathname === "/class") {
      if (!token) {
        // Redirect to the /class page
        window.location.href = "/login";
      }
    }
  }, [location.pathname]);

  const [roomName, setRoomName] = React.useState('');
  const hostToken = localStorage.getItem("token");

  const [hostBool, setHostBool] = React.useState(false);

  //호스트 이름, 토큰확인 해서 이 방의 호스트인지 확인
  

  const getHost = async (hostToken, roomNmes) => {
    const params = { room: roomNmes };
    const config = {
      method: "get",
      url: `/api/class/host`,
      params,
      headers: {
        "Content-Type": "application/json",
        Authorization: `${hostToken}`,
      },
    };
    await axios(config)
      .then((response) => {
        const isHost = response.data.result 
        localStorage.setItem("hostBool", isHost);
        setHostBool(response.data.result);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const onClickHandlerHostBool = async(e) => {
    console.log("✅ 호스트 체크 합시다")
    if (hostToken) {
        setRoomName(e._id);
        await getHost(hostToken, e._id);
    }
    
    localStorage.setItem("roomName", e._id);
    // navigate(`/live/${e._id}`);
    window.open(`/live/${e._id}`);
  };

  //!메인 리턴
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
      <Paper elevation={3} className="createClassButton"
        sx={{
          m: 1,
          width: '35em',
          height: 200,
          float: "left",
          
        }}
        style={{textAlign: 'center'}}>
        <Typography variant="h3" style={{width: "100%", fontSize: "1.4em", marginBottom: "1em"}}>지금바로 손쉽게 화상강의를 생성해 보세요</Typography>
        <Button variant="contained" component={Link} to="/class/new"
          style={{width: "10em", fontSize: "1em", fontWeight: "bold"}}>
          
          강의 생성
        </Button>
      </Paper>
      {boards.map((board, index) => {
        return (
          <Paper elevation={3} key={index}
            sx={{
              m: 1,
              width: '35em',
              height: 200,
              float: "left",
            }}>
            <Paper
              variant="outlined"
              component="img"
              src={board.thumbnail}
              sx={{
                m: 1,
                width: 180,
                height: 180,
                float: "left",
              }}
            />
            {/* <img src={board.thumbnail}></img> */}
            <h2 style={{marginTop: '4%', fontFamily:'Noto Sans KR',fontSize: '1.8em'}}>{board.title}</h2>
            <p style={{marginTop: '4%', fontFamily:'Noto Sans KR', fontSize: '1.1em'}}>시작시간 : {board.startDateTime.substr(0,10)} {board.startDateTime.substr(11,5)}</p>
            <p style={{marginTop: '3%', fontFamily:'Noto Sans KR',marginBottom: '2%', fontSize: '1.1em'}}>참여학생 : {board.studentMaxNum} 명</p>
            <Button variant="outlined" style={{width: "20em", fontSize: "1em", fontWeight: "bold"}}
              onClick={()=>{
                onClickHandlerHostBool(board)
            }}
              
            > 강의실 바로 가기
            </Button>
          </Paper>
        );
      })}
    </Box>
  );
}
