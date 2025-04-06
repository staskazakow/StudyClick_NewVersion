import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background: #13233D;
 // Темно-синий цвет фона
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  color: white;

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
  background-color: #d9d9d9; // Цвет кнопок
  color: #2b2d42;
  border: none;
  border-radius: 20px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #b0b0b0; // Цвет кнопки при наведении
  }

  @media (max-width: 600px) {
    width: 100%; // Кнопки занимают 100% ширины на мобильных
    padding: 12px; // Увеличение отступов для мобильных
    text-align: center; // Центрирование текста
  }
`;
const FuncBlock = styled.div`
display:flex;
align-items: center
`

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <FuncBlock>
        <Button>Новый чат</Button>
      <Title>Study Click</Title>
      </FuncBlock>
      <ButtonContainer>
        <Button>Регистрация</Button>
        <Button>Войти</Button>
      </ButtonContainer>
    </HeaderContainer>
  );
};

export default Header;
