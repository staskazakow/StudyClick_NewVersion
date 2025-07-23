import { Dispatch } from '@reduxjs/toolkit';
import React, { SetStateAction } from 'react';
import { NavLink } from 'react-router';
import styled from 'styled-components';

// 1. Оверлей - фон, который затемняет страницу
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6); /* Полупрозрачный черный фон */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* Выше, чем основной контент, но ниже самого модального окна */
`;

// 2. Обертка для самого модального окна
const ModalWrapper = styled.div`
  background-color: #13233D; /* Цвет фона модального окна из Figma */
  border-radius: 20px; /* Скругление углов, как на макете */
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4); /* Тени для объема */
  padding: 30px; /* Внутренние отступы */
  max-width: 500px; /* Максимальная ширина на десктопах */
  width: 90%; /* Занимает 90% ширины экрана на меньших разрешениях */
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative; /* Для позиционирования внутренних элементов, если потребуется */

  @media (max-width: 768px) {
    padding: 25px;
    border-radius: 15px; /* Меньше скругление на планшетах */
  }

  @media (max-width: 480px) {
    padding: 20px;
    border-radius: 10px; /* Еще меньше скругление на мобильных */
  }
`;

// 3. Заголовок модального окна
const ModalTitle = styled.h2`
  font-family: 'Montserrat Alternates', sans-serif; /* Если используете */
  font-size: 28px;
  font-weight: 700;
  color: #FFFFFF; /* Белый цвет текста */
  margin-bottom: 20px;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
    margin-bottom: 10px;
  }
`;

// 4. Описание/текст под заголовком
const ModalDescription = styled.p`
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #E0E0E0; /* Светло-серый цвет текста */
  margin-bottom: 30px;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 25px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    margin-bottom: 20px;
  }
`;

// 5. Кнопка "Войти" (с синим фоном)
const PrimaryButton = styled(NavLink)`
  background-color: #6299D0; /* Синий фон, как на макете */
  color: #13233D; /* Темный текст на кнопке */
  border: none;
  border-radius: 25px; /* Скругление */
  padding: 12px 30px;
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  width: 100%; /* Занимает всю ширину */
  max-width: 300px; /* Максимальная ширина */
  margin-bottom: 15px;
  text-decoration:none;
  &:hover {
    background-color: #4A7BAA;
  }

  @media (max-width: 480px) {
    padding: 10px 20px;
    font-size: 15px;
    max-width: 250px;
  }
`;

// 6. Кнопка "Зарегистрироваться бесплатно" (светлый фон)
const SecondaryButton = styled(PrimaryButton)` /* Наследует стили от PrimaryButton */
  background-color: #ECECE5; /* Светлый фон */
  color: #13233D; /* Темный текст */

  &:hover {
    background-color: #d1d1cc;
  }
`;

// 7. Текст "Не входить"
const SkipText = styled.p`
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #E0E0E0; /* Светло-серый текст */
  margin-top: 20px;
  cursor: pointer;
  text-decoration: underline; /* Подчеркивание как на макете */

  &:hover {
    color: #FFFFFF;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    margin-top: 15px;
  }
`;

// Пропсы для компонента Modal
interface ModalProps {
  isOpen: boolean;
  setIsOpen:any
}

const Modal = ({isOpen,setIsOpen}:ModalProps) => {
  // useEffect для пред
  // отвращения скролла основного контента, когда модалка открыта
  return (
    <div>
        {isOpen ?<Overlay> {/* Закрытие по клику на оверлей */}
      <ModalWrapper onClick={(e) => e.stopPropagation()}> {/* Предотвращаем закрытие при клике внутри модалки */}
        <ModalTitle>Рады, что вы с нами в Mindsy!</ModalTitle>
        <ModalDescription>
          Чтобы раскрыть весь потенциал сервиса — войдите в аккаунт или
          зарегистрируйтесь. Загружайте файлы, изображения и получайте еще более
          точные и полезные ответы!
        </ModalDescription>
        <PrimaryButton to={"/login"}>Войти</PrimaryButton>
        <SecondaryButton to={"/register"}>Зарегистрироваться бесплатно</SecondaryButton>
        <SkipText onClick={() => setIsOpen(false)}>Не входить</SkipText> {/* Закрыть без действия */}
      </ModalWrapper>
    </Overlay> : null}
    </div>
  );
};

export default Modal;