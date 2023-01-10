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

function App() {

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
          
          </Routes>
        
      </React.Fragment>
    </>
  );
}

export default App;
