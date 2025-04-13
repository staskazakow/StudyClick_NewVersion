import React from 'react';
import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';
import ChatInput from './components/ChatInput/ChatInput';
import styled from 'styled-components';
import { Route, Routes } from 'react-router';
import Registration from './components/Registration/Registration';

const AppContainer = styled.div`
  background: #13233D;
  width:100%;
  color: white;
  height:100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between
 
`;
const MainWrapper = styled.div`
display:flex;
height:100vh;
justify-content: space-between;
flex-direction: column
`
const Main = () => {
  return (
    <div style={{height:"100vh"}}>
      <MainWrapper>
      <Header />

          {/* <MainContent /> */}
          <ChatInput />
        {/* </div> */}
      </MainWrapper>
    </div>

  )
}
const App: React.FC = () => {
  return (
    <AppContainer>
      <Routes>
        <Route path='/registration' element={<Registration />} />
        <Route path='/' element={<Main/>}/>
      </Routes>

    </AppContainer>
  );
};

export default App;
