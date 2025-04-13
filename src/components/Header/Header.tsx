import React from 'react';
import styled from 'styled-components';
import message from "../../image/message.png"
import { NavLink } from 'react-router';
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
  font-size: 24px; // Размер шрифта заголовка
  font-weight: 500;
  font-family:sans-serif;
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
  border-radius: 10px;
  font-weight:400;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color:rgb(252, 252, 252); // Цвет кнопки при наведении
  }

  @media (max-width: 600px) {
    width: 100%; // Кнопки занимают 100% ширины на мобильных
    padding: 12px; // Увеличение отступов для мобильных
    text-align: center; // Центрирование текста
  }
`;
const ButtonChat = styled(Button)`
padding:1px 6px 1px 6px;
 transition: background-color 0.3s;
&:hover {
 background-color:rgb(179, 179, 179); // Цвет кнопки при наведении
}
`
const ButtonIn = styled(Button)`
background:#000000;
color:white;
transition:0.3s;
&:hover {
   background-color:rgb(19, 19, 19);
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
align-items: center
`

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <FuncBlock>
        <ButtonChat><img src={message} title='New Chat' alt="" /></ButtonChat>
      <Title>Study Click</Title>
      </FuncBlock>
      <ButtonContainer>
        <NavLink to={"/registration"}>
        <ButtonReg>Регистрация</ButtonReg>

        </NavLink>
        <ButtonIn>Войти</ButtonIn>
      </ButtonContainer>
    </HeaderContainer>
  );
};

export default Header;
