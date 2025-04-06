import React from 'react';
import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';
import ChatInput from './components/ChatInput/ChatInput';
import styled from 'styled-components';

const AppContainer = styled.div`
  background: #13233D;
  width:100%;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
 
`;

const App: React.FC = () => {
  return (
    <AppContainer>
      <div>
      <Header />
      <MainContent />
      </div>
      <ChatInput />
    </AppContainer>
  );
};

export default App;
