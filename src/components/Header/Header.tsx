import React from 'react';
import styled from 'styled-components';
import message from "../../image/message.png"
import { NavLink } from 'react-router';
import { useSelector } from 'react-redux';
import { state } from '../../redux_toolkit/store';
import { useActions } from '../../common/useActions';
import { useLogOutMutation } from '../../redux_toolkit/api/authApi';
import Cookies from 'js-cookie';
import logo from "../../image/Logo.png"
import { StyledButtonChat } from '../../common/styles/chat.styles';
import { Tooltip } from '../Tooltip/Tooltip';
import { FooterChatInput } from '../../common/styles/chatInput.styles';
const HeaderContainer = styled.header`
  background: #13233D;
 // Темно-синий цвет фона
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  color: white;
  margin-top:20px;
  @media (max-width: 600px) { 
    flex-direction: column; // Изменение направления для мобильных устройств
    align-items: flex-start; // Выравнивание элементов по началу
    padding: 10px; // Отступы для мобильных устройств
  }
`;

const Title = styled.div`
  font-size: 20px; // Размер шрифта заголовка
  font-weight: 500;
  @media (max-width: 600px) {
    font-size: 20px; // Уменьшение размера на мобильных устройствах
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px; // Увеличение расстояния между кнопками

  @media (max-width: 600px) {
    width: 100%; 
    flex-direction: column; // Кнопки располагаются вертикально
    gap: 10px; // Уменьшение расстояния на мобильных устройствах
  }
`;

const Button = styled.button`
  background-color: #C3BFBF66; // Цвет кнопок
  color: #2b2d42;
  border: none;
  border-radius: 20px;
  font-weight:400;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  @media (max-width: 600px) {
    width: 100%; // Кнопки занимают 100% ширины на мобильных
    padding: 12px; // Увеличение отступов для мобильных
    text-align: center; // Центрирование текста
  }
`;

const ButtonIn = styled(Button)`
background:#B2CEE2;
color:black;
transition:0.3s;
&:hover {
    transform:scale(1.05) 
  }
`
const ButtonReg = styled(Button)`
background:#ECECE5;
color:#13233D;
transition:0.3s;

&:hover {
    transform:scale(1.05) 
  }
`
const FuncBlock = styled.div`
display:flex;
align-items: center;
gap:5px;
margin-bottom:10px;
`

const Header: React.FC = () => {
  const auth = useSelector((state: state) => state.app.auth)
  const { setAuth } = useActions()
  const { AddChat } = useActions()
  const [Out] = useLogOutMutation()
  const logOut = () => {
    setAuth(false)
    Out()
    Cookies.remove("refresh")
    localStorage.removeItem('accessToken')
  }

  return (
    <HeaderContainer style={{fontFamily:"Montserrat Alternates"}}>
      <FuncBlock>
        <Tooltip text="Новый чат" position='bottom'>
                  <StyledButtonChat onClick={() => AddChat(1)}>
                    <img style={{width:"40px",height:"40px"}} src={message} alt="Chat" />
                  </StyledButtonChat>
                </Tooltip>
        <div style={{display:"flex",alignItems:"center"}}>
          <img src={logo} alt="logo" />
          <Title>Mindsy</Title>
        </div>
        
      </FuncBlock>
        <FooterChatInput>
                <NavLink to="/about">О нас</NavLink>
                <NavLink to="/terms">Условия</NavLink>
                <NavLink to='/support'>Поддержка</NavLink>
                <NavLink to="/price">Цена</NavLink>
            </FooterChatInput>
      {auth ?
        <div onClick={logOut}>Log out</div>
        : <ButtonContainer>
          <NavLink to={"/register"}>
            <ButtonReg style={{fontFamily:"Montserrat Alternates"}}>Регистрация</ButtonReg>

          </NavLink>
          <NavLink to={"/login"}>

            <ButtonIn style={{fontFamily:"Montserrat Alternates"}}>Войти</ButtonIn>
          </NavLink>
        </ButtonContainer>}

    </HeaderContainer>
  );
};

export default Header;
