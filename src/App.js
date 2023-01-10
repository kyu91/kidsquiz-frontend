import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import SignIn from './components/SignIn';
import {
  Route,
  Routes,
} from 'react-router-dom';
import Boards from './components/Boards';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import CreateClass from './components/CreateClass';

import LiveMain from './liveComponents/LiveMain';




function App() {


  return (
    <>
      <React.Fragment>
        <CssBaseline />
        
          <Routes>
            
            {/* 로그인 페이지 라우터 */}
            <Route path="/login" element={
              <Container maxWidth="sm">
              <SignIn></SignIn>
              </Container>
            }/>
            

            
            {/* 강의 목록 페이지 라우터 */}
            <Route path="/class" element={
         
                <Container maxWidth="sm">
                <ResponsiveAppBar></ResponsiveAppBar>
                <Boards></Boards>
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
          
          </Routes>
        
      </React.Fragment>
    </>
  );
}

export default App;
