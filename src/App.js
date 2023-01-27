import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import {
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import Boards from './components/Boards';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import CreateClass from './components/CreateClass';

import LiveMain from './liveComponents/LiveMain';
import GuestIntro from './liveComponents/GuestIntro';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState } from 'react';
import Materials from './components//Material';
import CreateMaterial from './components/createMaterialgroup/CreateMaterial';
import MaterialList from './components/MaterialList';
import CreateMaterialList from './components/CreateMaterialList';


//메인페이지
import Hero from "./mainComponents/Hero";
import Footer from "./mainComponents/Footer";
import Section from "./mainComponents/Section";
import AboutUs from "./mainComponents/AboutUs";
import Testimonial from "./mainComponents/Testimonial";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

//✨다중 마우스 커서 추가
import { ClientSideSuspense } from "@liveblocks/react";
import { RoomProvider } from "./liveblocks.config.js";

//css리셋
import { Reset } from "styled-reset";
import "./index.css";
import Header from "./mainComponents/Header";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme.js";

function App() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const location = useLocation();
  const token = localStorage.getItem("token");
  React.useEffect(() => {
    if (location.pathname === "/") {
      if (token) {
        // Redirect to the /class page
        window.location.href = "/class";
      }
    }
  }, [location.pathname]);

  return (
    <>
      {/* <React.Fragment> */}
      <Reset />
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Routes>
          {/* 메인페이지 라우터 */}
          <Route
            path="/"
            element={
              <>
                <CssBaseline />
                <Header />
                <Hero />
                <Section />
                <AboutUs />
                <Testimonial />
              </>
            }
          />

          {/* /class로 갔을때 토큰이 있다면 그냥 있고 없다면 로그인 페이지로 보내줘 */}
          <Route
            path="/class"
            element={
              <Container
                maxWidth="lg"
                style={{
                  margin: "0 auto",
                }}
              >
                <ResponsiveAppBar></ResponsiveAppBar>
                <Boards></Boards>
              </Container>
            }
          />

          {/* 로그인 페이지 라우터 */}
          <Route
            path="/login"
            element={
              <Container maxWidth="lg">
                <SignIn></SignIn>
              </Container>
            }/>

             {/* 회원가입 */}
           <Route path="/join" element={
            <Container maxWidth="lg" >
            <SignUp/>
          </Container>
          }/>
            

          {/* 강의 생성 페이지 라우터 */}
          <Route
            path="/class/new"
            element={
              <Container maxWidth="lg">
                <ResponsiveAppBar></ResponsiveAppBar>
                <CreateClass></CreateClass>
              </Container>
            }
          />

          {/* 라이브 페이지 라우터 */}
          <Route
            path="/live/:id"
            element={
              <RoomProvider id="1234" initialPresence={{ cursor: null }}>
                {/* 페이지 안에 감싸는거?!? */}
                <ClientSideSuspense fallback={<div>Loading...</div>}>
                  {() => <LiveMain></LiveMain>}
                </ClientSideSuspense>
              </RoomProvider>
            }
          />

          {/* 게스트 입장 인트로 페이지 라우터 */}
          <Route
            path="/live/:id/intro"
            element={
              <Container fixed maxWidth="xl">
                <GuestIntro></GuestIntro>
              </Container>
            }
          />



          {/* 교구생성 기본페이지 */}
          <Route
            path="/material"
            element={
              <Container maxWidth="lg">
                <ResponsiveAppBar></ResponsiveAppBar>
                <Tabs
                  style={{ marginBottom: "1rem" }}
                  value={value}
                  onChange={handleChange}
                >
                  <Tab
                    value={0}
                    label="교구관리"
                    style={{ fontSize: "1.5em" }}
                  />
                  <Tab
                    value={1}
                    label="교구모음관리"
                    style={{ fontSize: "1.5em" }}
                  />
                </Tabs>
                {value == 0 ? (
                  <div>
                    <Materials />
                  </div>
                ) : null}
                {value == 1 ? (
                  <div>
                    <MaterialList />
                  </div>
                ) : null}
              </Container>
            }
          />

          {/* 교구생성 */}
          <Route
            path="/material/new"
            element={
              <Container maxWidth="lg">
                <ResponsiveAppBar></ResponsiveAppBar>
                <CreateMaterial />
              </Container>
            }
          />

          {/* 교구모음 만드는 곳 */}
          <Route
            path="/material/list"
            element={
              <Container maxWidth="lg">
                <ResponsiveAppBar></ResponsiveAppBar>
                <CreateMaterialList />
              </Container>
            }
          />
        </Routes>
        <Footer />
      </ThemeProvider>
      {/* </React.Fragment> */}
    </>
  );
}

export default App;
