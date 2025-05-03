import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';
import ChatInput from './components/ChatInput/ChatInput';
import styled, { keyframes } from 'styled-components';
import { href, Route, Routes } from 'react-router';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import { useRefreshTokenMutation } from './redux_toolkit/api/authApi';
import { useActions } from './common/useActions';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { state } from './redux_toolkit/store';
import LoginApp from './components/LoginApp/LoginApp';
import Profile from './components/Profile/Profile';
import Settings from './components/Profile/Settings';
import { Chat } from './redux_toolkit/reducers/ChatSlice';

const AppContainer = styled.div`
  font-family: "Inter", sans-serif;
  font-weight:400;
  margin:0;
  background: #13233D;
  width: 100%;
  color: black;
  font-size:20px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const MainWrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: space-between;
  flex-direction: column;
`;

// Keyframes for the loading animation
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Styled component for the loading spinner
export const LoadingSpinner = styled.div`
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-top: 5px solid #fff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${rotate} 2s linear infinite;
  margin: 20px auto; /* Center the spinner */
`;

// Styled component for the loading overlay
export const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensure it's on top of everything */
`;

const Main = () => {
   const message_data:Array<Chat> = useSelector((state:state) => state.chat.messages_data)

  return (
    <div style={{ height: "100vh" }}>
      
        <MainWrapper>
          <Header />
          {message_data.length == 0 && <MainContent />}
          <ChatInput />
        </MainWrapper>
    </div>
  );
};

const App: React.FC = () => {
  const [getAuth, { isLoading }] = useRefreshTokenMutation();
  const { setAuth } = useActions();
  useEffect(() => {
    const isAuth = async () => {
      try {
        const { data } = await getAuth(Cookies.get("refresh"));
        if (data) {
          setAuth(true);
          if (!localStorage.getItem('accessToken')) {
            localStorage.setItem('accessToken', data.access)
          }
        } 
      } catch (error) {
        setAuth(false);
        console.error("Failed to authenticate:", error);
      }
    };
    isAuth()
  }, []);
  const auth = useSelector((state: state) => state.app.auth)
  return (
    <AppContainer>
      {isLoading ? (
        <LoadingOverlay>
          <LoadingSpinner />
        </LoadingOverlay>
      ) : (
        <Routes>
        <Route path='/register' element={<Registration />} />
        <Route path='/login' element={<Login />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/profile' element={<Profile />} />
        <Route
          path='/'
          element={auth ? <LoginApp /> : <Main/>}
        />
      </Routes>
      )} 

    </AppContainer>
  );
};

export default App;
