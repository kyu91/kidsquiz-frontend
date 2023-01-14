import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import SignIn from './components/SignIn';
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
import Material from './components/Material';
import CreateMaterial from './components/CreateMaterial';

function App() {
    const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const location = useLocation();
  const token = localStorage.getItem('token');
  React.useEffect(() => {
    if (location.pathname === '/') {
      
      if (token) {
        // Redirect to the /class page
        window.location.href = '/class';
      } else {
        // Redirect to the /login page
        window.location.href = '/login';
      }
    }
  }, [location.pathname]);


  return (
    <>
      <React.Fragment>
        <CssBaseline />
        
          <Routes>


            {/* /class로 갔을때 토큰이 있다면 그냥 있고 없다면 로그인 페이지로 보내줘 */}
            <Route path="/class" element={
              <Container maxWidth="sm">
              <ResponsiveAppBar></ResponsiveAppBar>
              <Boards></Boards>
              </Container> 
            }/>

              
              {/* 강의 목록 페이지 라우터
              <Route path="/class" element={
        
              <Container maxWidth="sm">
              <ResponsiveAppBar></ResponsiveAppBar>
              <Boards></Boards>
              </Container>
            
              }/> */}
              
        
              {/* 로그인 페이지 라우터 */}
              <Route path="/login" element={
                <Container maxWidth="sm">
                <SignIn></SignIn>
                </Container>
              }/>
            

              {/* 강의 생성 페이지 라우터 */}
              <Route path="/class/new" element={
                <Container maxWidth="sm">
                  <ResponsiveAppBar></ResponsiveAppBar>
                  <CreateClass></CreateClass>
                </Container>
              }/>
              

            {/* 라이브 페이지 라우터 */}
            <Route path="/live/:id" element={
              <Container maxWidth="xl">
                <LiveMain></LiveMain>
              </Container>
            }/>

            {/* 게스트 입장 인트로 페이지 라우터 */}
            <Route path="/live/:id/intro" element={
              <Container maxWidth="xl">
                <GuestIntro></GuestIntro>
              </Container>
            }/>
          
            {/* 교구생성 기본페이지 */}
            <Route path="/material" element={
              <Container maxWidth="xl">
                <ResponsiveAppBar></ResponsiveAppBar>
                            <Box sx={{ width: '100%' }}>
                              
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
            >
              <Tab value="0" label="교구생성" />
              <Tab value="1" label="교구관리" />
            </Tabs>


            {
            value == 0 ? <div>
              
              <Material></Material>
            </div>: null
            }
            {
            value == 1 ? <div> 내용2</div>: null
            }         
          </Box>             
              </Container>
            }/>    
            {/* 교구공장 */}
            <Route path="/material/new" element={<div><Container><CreateMaterial></CreateMaterial></Container></div>}></Route>
          </Routes>
        
      </React.Fragment>
    </>
  );
}

export default App;
