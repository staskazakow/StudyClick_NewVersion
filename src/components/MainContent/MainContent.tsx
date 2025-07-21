import React from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
  text-align: center;
  color: #ffff;
  font-weight: 300;
  font-family:sans-serif;
  & > h1 {
  @media (max-width:600px){
  font-size:22px;
  }
  }

`;


const MainContent: React.FC = () => {
  return (
    <MainContainer style={{fontFamily:"Montserrat Alternates"}}> 
      <h1 style={{fontWeight:"300",color:"#B2CEE2"}}>Добро пожаловать в Mindsy</h1>
      <p style={{color:"#ECECE5",fontSize:"30px"}}>Чем помочь сегодня?</p>
    </MainContainer >
  );
};

export default MainContent;
