import React from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
  text-align: center;
  margin: 50px;
  color: #ffff;
  font-weight: 500;
  font-family:sans-serif;
`;

const MainContent: React.FC = () => {
  return (
    <MainContainer>
      <h1>Добро пожаловать в Study Click</h1>
      <p>Чем помочь сегодня?</p>
    </MainContainer>
  );
};

export default MainContent;
