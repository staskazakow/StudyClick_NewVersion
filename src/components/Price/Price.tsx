import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router';

import { WrapperAbout, Back } from '../About/About';
import Footer from '../Footer/Footer';
import { HelpFunc } from '../../common/HelpFunc';

// Максимальная ширина контейнера для карточек
const MAX_CONTAINER_WIDTH = '1280px'; 

// Контейнер для всех карточек тарифов
const CardsContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    padding: 20px;
    max-width: ${MAX_CONTAINER_WIDTH};
    margin: 40px auto 80px auto;

    @media (max-width: 1024px) {
        flex-direction: column;
        align-items: center;
        gap: 25px;
    }
`;

// Стили для каждой карточки тарифа
const Card = styled.div`
    background-color: #ECECE5;
    border-radius: 30px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.08);
    padding: 20px;
    width: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    min-height: 520px;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15), 0 8px 20px rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 1024px) {
        width: 320px;
        min-height: 540px;
    }

    @media (max-width: 768px) {
        width: 85%;
        min-height: auto;
    }

    @media (max-width: 480px) {
        width: 95%;
    }
`;

// Контейнер для текстовой части
const CardContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex: 1;
    width: 100%;

    > * {
        margin-bottom: 15px;
    }

    > *:last-child {
        margin-bottom: 0;
    }
`;

const CardTitle = styled.h3`
    font-family: 'Montserrat Alternates', sans-serif;
    font-size: 18px;
    font-weight: 400;
    color: #000000;
    line-height: 1.2;
`;

const PriceText = styled.p`
    font-family: 'Montserrat Alternates', sans-serif;
    font-size: 32px;
    font-weight: 700;
    color: #000000;
    margin: 0;
    margin-bottom:20px;
`;

const DescriptionText = styled.p`
    font-family: 'Montserrat Alternates', sans-serif;
    font-size: 14px;
    color: #333333;
    line-height: 1.4;
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const FeaturesList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: left;
    width: 100%;
    
    li {
        font-family: 'Montserrat Alternates', sans-serif;
        font-size: 13px;
        color: #333333;
        margin-bottom: 8px;
        position: relative;
        padding-left: 25px;
        line-height: 1.3;

        &::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: #6299D0;
            font-size: 16px;
            font-weight: 700;
        }
    }
`;

const ActionButton = styled.button`
    background-color: #6299D0;
    color: #13233D;
    border: none;
    border-radius: 20px;
    padding: 10px 20px;
    font-size: 15px;
    font-weight: 400;
    transition: background-color 0.2s ease-in-out, transform 0.1s ease-in-out;
    min-width: 150px;
    margin-top: auto;

    &:hover {
        background-color: #4A7BAA;
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(0);
    }
`;

const TokensText = styled.p`
    font-family: 'Montserrat Alternates', sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: #000000;
    margin: 0;
    margin-bottom:20px;
`;

const HelpText = styled.div`
    font-size: 10px;
    font-family: Montserrat Alternates;
    font-weight: 400;
    text-align: center;
    color: #444444;
    cursor: pointer;
    margin-top: 10px;
`;

const Price = () => {
 
  return (
    <div>
      <WrapperAbout>
        <Back to={"/"}>Назад</Back>
        <h1 style={{ 
            fontFamily: 'Montserrat Alternates', 
            color: 'white', 
            textAlign: 'center', 
            marginBottom: '40px', 
            fontSize: '38px', 
            fontWeight: '700' 
        }}>Тарифные планы</h1>

        <CardsContainer>
          <Card>
            <CardContent>
              <CardTitle>Бесплатно</CardTitle>
              <DescriptionText>
                Свой мини-преподаватель в кармане, креативный ассистент и педагог-репетитор в одном чатике.
              </DescriptionText>
              <PriceText>0 рублей</PriceText>
              <TokensText>30 000 токенов</TokensText>
              <FeaturesList>
                <li>Написать примерно 40-50 страниц текста</li>
                <li>Около 100-150 сообщений в чате</li>
                <li>1-2 кода на Python, Scratch, JavaScript — с объяснениями и комментариями</li>
              </FeaturesList>
            </CardContent>
            <ActionButton>Текущий план</ActionButton>
            <HelpText onClick={() => HelpFunc()}>Мне нужна помощь с оплатой или выставлением счета</HelpText>
          </Card>

          <Card>
            <CardContent>
              <CardTitle>«Завтрак с ИИ»</CardTitle>
              <DescriptionText>
                Отличный вариант для ежедневного общения, «пошутить-поработать» и вкусно залипнуть в текстах.
              </DescriptionText>
              <PriceText>499 ₽</PriceText>
              <TokensText>1 000 000 токенов</TokensText>
              <FeaturesList>
                <li>Можно задать примерно 300-400 нормальных вопросов</li>
                <li>Написать книгу объемом 150-200 страниц текста</li>
                <li>Получить 100-150 хороших ответов в стиле «мини-эссе»</li>
              </FeaturesList>
            </CardContent>
            <ActionButton>Базовый</ActionButton>
            <HelpText onClick={() => HelpFunc()}>Мне нужна помощь с оплатой или выставлением счета</HelpText>
          </Card>

          <Card>
            <CardContent>
              <CardTitle>«ИИ не уходит в отпуск»</CardTitle>
              <DescriptionText>
                Это уже уровень «У меня есть свой ИИ-редактор, психолог, маркетолог и оракул — всё в одном лице».
              </DescriptionText>
              <PriceText>999 ₽</PriceText>
              <TokensText>2 500 000 токенов</TokensText>
              <FeaturesList>
                <li>Напишите книгу объёмом 400+ страниц</li>
                <li>Напишите цельный курс по экономике, с тестами и примерами</li>
                <li>Эквивалентно: 15000-20000 коротких взаимодействий с ИИ</li>
              </FeaturesList>
            </CardContent>
            <ActionButton>Расширенный</ActionButton>
             <HelpText onClick={() => HelpFunc()}>Мне нужна помощь с оплатой или выставлением счета</HelpText>
          </Card>

          <Card>
            <CardContent>
              <CardTitle>«Корпорация Разума»</CardTitle>
              <DescriptionText>
                Один тариф — и у вас под рукой интеллектуальный помощник, готовый поддержать рабочие задачи 24/7.
              </DescriptionText>
              <PriceText>1499 ₽</PriceText>
              <TokensText>5 000 000 токенов</TokensText>
              <FeaturesList>
                <li>Генерация всех постов в соцсетях на год вперёд (и ещё останется)</li>
                <li>Примерно 3750 000 слов или 8000-10000 страниц текста</li>
                <li>Эквивалентно: 30000-40000 полных взаимодействий с ИИ</li>
              </FeaturesList>
            </CardContent>
            <ActionButton>Премиум</ActionButton>
            <HelpText onClick={() => HelpFunc()}>Мне нужна помощь с оплатой или выставлением счета</HelpText>
          </Card>
        </CardsContainer>
      </WrapperAbout>
      <Footer />
    </div>
  );
};

export default Price;
