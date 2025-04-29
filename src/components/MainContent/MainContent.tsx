import React, { JSX, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { state } from '../../redux_toolkit/store';
import { Chat } from '../../redux_toolkit/reducers/ChatSlice';

const MainContainer = styled.div`
  text-align: center;
  margin: 50px;
  color: #ffff;
  font-weight: 300;
  font-family:sans-serif;
`;

const MainContent: React.FC = () => {
  const message_data:Array<Chat> = useSelector((state:state) => state.chat.messages_data)
  console.log(message_data)
  return (
    <MainContainer>
      {message_data.length == 0 &&  
      <div>
      <h1 style={{fontWeight:"300",fontFamily:"sans-serif"}}>Добро пожаловать в Study Click</h1>
      <p style={{color:"#C3BFBF",}}>Чем помочь сегодня?</p>
      </div>
      }
      

    </MainContainer >
  );
};

export default MainContent;
