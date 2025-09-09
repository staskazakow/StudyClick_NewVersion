import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';
import ChatInput from './components/ChatInput/ChatInput';
import styled, { keyframes } from 'styled-components';
import { Route, Routes } from 'react-router';
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
import { Message } from './redux_toolkit/reducers/ChatSlice';
import TariffPage from './components/Pass/Pass';
import About from './components/About/About';
import Terms from './components/Terms/Terms';
import Support from './components/Support/Support';
import Price from './components/Price/Price';
import Modal from './components/Modal/Modal';

const AppContainer = styled.div`
overflow-x:hidden;
  overflow-y:hidden;
  font-weight:400;
  margin:0;
  background: #13233D;
  width: 100%;
  color: black;
  font-size:20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: 'Montserrat Alternates', sans-serif;
    background-color: #blue;
  
`;

export const MainWrapper = styled.div`
  display: flex;
  height: 100vh;
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
export const FooterINN = styled.div`
display:flex;
justify-content:center;
color:#c8ccd1;
font-size:14px;
color:black;
`
const Main = () => {
  const message_data:Array<Message> = useSelector((state:state) => state.chat.messages_data)
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []); // пустой массив зависимостей — только при МОНТАЖе
  return (
    <div style={{ height: "100vh" }}>
      <MainWrapper>
        <Header />
        <div style={{display:'flex',flexDirection:'column',height:"100vh",justifyContent:"flex-end"}}>
          {message_data.length === 0 && <MainContent />}
          <ChatInput />
          <Modal isOpen={isOpen} setIsOpen={setIsOpen}/>
        </div>
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
  // const isLoading = false ----- раскоментируй если нужно поменять что то ,где сервер не нужен
  // const auth = false
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
        <Route path='/tarif' element ={<TariffPage/>}/>
        <Route path='/api/payments/callback/' element ={<TariffPage/>}/>
        <Route path='/about' element ={<About/>}/>
        <Route path='/terms' element ={<Terms/>}/>
        <Route path='/support' element ={<Support/>}/>
        <Route path='/price' element = {<Price/>} />
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
