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
    <MainContainer> 
      {/* <div> */}
      <h1 style={{fontWeight:"300",fontFamily:"sans-serif"}}>Добро пожаловать в Guiding Star</h1>
      <p style={{color:"#C3BFBF",}}>Чем помочь сегодня?</p>
      {/* </div> */}
      
      

    </MainContainer >
  );
};

export default MainContent;
