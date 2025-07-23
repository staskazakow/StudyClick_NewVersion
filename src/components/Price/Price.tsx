import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router'; // Используем react-router-dom для NavLink

// Импорт WrapperAbout и Back из вашего файла About (убедитесь, что они корректно импортируются)
import { WrapperAbout, Back } from '../About/About';
import Footer from '../Footer/Footer';

// Максимальная ширина контейнера для карточек
const MAX_CONTAINER_WIDTH = '1280px'; 

// Контейнер для всех карточек тарифов
const CardsContainer = styled.div`
    display: flex;
    justify-content: center; /* Центрирует карточки */
    gap: 24px; /* Отступы между карточками, как на макете */
    padding: 20px; /* Общие внутренние отступы */
    max-width: ${MAX_CONTAINER_WIDTH}; /* Ограничиваем ширину контейнера */
    margin: 40px auto 80px auto; /* Центрируем контейнер на странице с отступами */

    @media (max-width: 1300px) {
        gap: 20px;
        padding: 15px;
    }

    @media (max-width: 1024px) {
        flex-direction: column; /* Карточки располагаются вертикально на планшетах */
        align-items: center; /* Центрируем карточки */
        gap: 25px;
        padding: 15px;
    }

    @media (max-width: 768px) {
        padding: 10px; /* Меньше отступов на мобильных */
        gap: 20px;
        margin: 30px auto 60px auto;
    }

    @media (max-width: 480px) {
        padding: 10px;
        gap: 15px;
        margin: 20px auto 40px auto;
    }
`;

// Стили для каждой карточки тарифа
const Card = styled.div`
    background-color: #ECECE5;
    border-radius: 30px; /* Скругление как на макете */
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.08); /* Две тени для глубины */
    padding: 20px; /* Паддинг как на макете */
    width: 250px; /* Фиксированная ширина карточки (уменьшил для 4-х в ряд) */
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out; /* Плавное увеличение при наведении */
    min-height: 480px; /* Для выравнивания высоты карточек */
    justify-content: space-between; /* Распределение контента по вертикали */

    &:hover {
        transform: translateY(-5px); /* Небольшой подъем карточки при наведении */
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15), 0 8px 20px rgba(0, 0, 0, 0.1); /* Более выраженная тень */
    }

    @media (max-width: 1024px) { /* На планшетах */
        width: 320px; /* Увеличиваем ширину */
        padding: 25px;
        min-height: 500px;
    }

    @media (max-width: 768px) { /* На более мелких планшетах */
        width: 85%; /* На планшетах карточки занимают большую часть ширины */
        padding: 25px;
        min-height: auto; /* Высота авто, чтобы не было слишком больших пустых мест */
    }

    @media (max-width: 480px) {
        width: 95%; /* На мобильных занимают почти всю ширину */
        padding: 20px;
    }
`;

// Стили для заголовка тарифа (например, "Бесплатно", "Тариф...")
const CardTitle = styled.h3`
    font-family: 'Montserrat Alternates', sans-serif; /* Шрифты, если есть */
    font-size: 18px;
    font-weight: 400;
    color: #000000;
    margin-bottom: 10px;
    line-height: 1.2;

    @media (max-width: 480px) {
        font-size: 16px;
        margin-bottom: 8px;
    }
`;

// Стили для цены
const PriceText = styled.p`
    font-family: 'Montserrat Alternates', sans-serif;
    font-size: 32px;
    font-weight: 700;
    color: #000000;
    margin-top: 15px;
    margin-bottom: 20px;

    @media (max-width: 480px) {
        font-size: 28px;
        margin-top: 10px;
        margin-bottom: 15px;
    }
`;

// Стили для описания тарифа
const DescriptionText = styled.p`
    font-family: 'Montserrat Alternates', sans-serif;
    font-size: 14px;
    color: #333333;
    line-height: 1.4;
    margin-bottom: 20px;
    min-height: 60px; /* Задаем минимальную высоту для выравнивания */
    display: flex;
    align-items: center; /* Центрируем текст по вертикали */
    justify-content: center; /* Центрируем текст по горизонтали */

    @media (max-width: 480px) {
        font-size: 12px;
        margin-bottom: 15px;
        min-height: 50px;
    }
`;

// Стили для списка функций
const FeaturesList = styled.ul`
    list-style: none; /* Убираем стандартные маркеры списка */
    padding: 0;
    margin-top: 15px; /* Отступ сверху для списка */
    margin-bottom: 25px;
    text-align: left; /* Выравниваем текст списка по левому краю */
    width: 100%; /* Список занимает всю ширину карточки */
    
    li {
        font-family: 'Montserrat Alternates', sans-serif;
        font-size: 13px;
        color: #333333;
        margin-bottom: 8px;
        position: relative;
        padding-left: 25px; /* Отступ для иконки */
        line-height: 1.3;

        &:last-child {
            margin-bottom: 0;
        }

        &::before {
            content: '✓'; /* Простой символ галочки, как на макете */
            position: absolute;
            left: 0;
            top: 0px; /* Для выравнивания галочки по центру текста */
            color: #6299D0; /* Синий цвет галочки */
            font-size: 16px;
            font-weight: 700;
        }

        @media (max-width: 480px) {
            font-size: 11px;
            margin-bottom: 6px;
            padding-left: 20px;
        }
    }
`;

// Стили для кнопки действия
const ActionButton = styled.button`
    background-color: #6299D0; /* Синий фон, как на макете */
    color: #13233D;
    border: none;
    border-radius: 20px; /* Скругление кнопки */
    padding: 10px 20px;
    font-size: 15px;
    font-weight: 400;
    // cursor: pointer;
    transition: background-color 0.2s ease-in-out, transform 0.1s ease-in-out;
    min-width: 150px; /* Минимальная ширина кнопки */
    margin-top: auto; /* Прижимает кнопку к низу карточки */

    &:hover {
        background-color: #4A7BAA;
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(0);
    }

    @media (max-width: 480px) {
        font-size: 13px;
        padding: 8px 16px;
        min-width: 120px;
    }
`;

const TokensText = styled.p`
    font-family: 'Montserrat Alternates', sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: #000000;
    margin-top: 10px;
    margin-bottom: 20px;

    @media (max-width: 480px) {
        font-size: 14px;
        margin-top: 8px;
        margin-bottom: 15px;
    }
`;
const HelpText = styled.div`
font-size:6px;
font-family: Montserrat Alternates;
font-weight: 400;
font-style: Regular;
font-size: 7px;
line-height: 100%;
letter-spacing: 0%;
text-align: center;
color:#444444;
cursor:pointer;
`

const Price = () => {
  return (
    <div>
    <WrapperAbout> {/* Ваш компонент обертка */}
        <Back to={"/"}>Назад</Back> {/* Ваша кнопка назад */}
        <h1 style={{ 
            fontFamily: 'Montserrat Alternates', 
            color: 'white', 
            textAlign: 'center', 
            marginBottom: '40px', 
            fontSize: '38px', 
            fontWeight: '700' 
        }}>Тарифные планы</h1> {/* Заголовок */}

        <CardsContainer>
            {/* Карточка "Бесплатно" */}
            <Card>
                <CardTitle>Бесплатно</CardTitle>
                <DescriptionText style={{marginBottom:"70px"}}>
                    Свой мини-преподаватель в кармане, креативный ассистент и педагог-репетитор в одном чатике.
                </DescriptionText>
                <PriceText>0 рублей</PriceText>
                <ActionButton>Текущий план</ActionButton>
                <TokensText>30 000 токенов</TokensText>
                <FeaturesList>
                    <li>Написать примерно 40-50 страниц текста</li>
                    <li>Около 100-150 сообщений в чате</li>
                    <li>1-2 кода на Python, Scratch, JavaScript — с объяснениями и комментариями</li>
                </FeaturesList>
                <HelpText>Мне нужна помощь с оплатой или выставлением счета</HelpText>
            </Card>

            {/* Карточка "Тариф «Завтрак с UU»" */}
            <Card>
                <CardTitle>Тариф «Завтрак с UU»</CardTitle>
                <DescriptionText  style={{marginBottom:"50px"}}>
                    Отличный вариант для ежедневного общения, «пошутить-поработать» и вкусно залипнуть в текстах.
                </DescriptionText>
                <PriceText>499 ₽</PriceText>
                <ActionButton>Базовый</ActionButton>
                <TokensText>1 000 000 токенов</TokensText>
                <FeaturesList>
                    <li>Можно задать примерно 300-400 нормальных вопросов</li>
                    <li>Написать книгу объемом 150-200 страниц текста</li>
                    <li>Получить 100-150 хороших ответов в стиле «мини-эссе»</li>
                </FeaturesList>
                <HelpText>Мне нужна помощь с оплатой или выставлением счета</HelpText>

            </Card>

            {/* Карточка "Тариф «ИИ не уходит в отпуск»" */}
            <Card>
                <CardTitle>Тариф «ИИ не уходит в отпуск»</CardTitle>
                <DescriptionText>
                    Это уже уровень «У меня есть свой ИИ-редактор, психолог, маркетолог и оракул — всё в одном лице». Можно вести блог, компанию и не сходить с ума.
                </DescriptionText>
                <PriceText>999 ₽</PriceText>
                <ActionButton>Расширенный</ActionButton>
                <TokensText>2 500 000 токенов</TokensText>
                <FeaturesList>
                    <li>Напишите книгу объёмом 400+ страниц</li>
                    <li>Напишите цельный курс по экономике, с тестами и примерами</li>
                    <li>Эквивалентно: 15000-20000 коротких взаимодействий с UU</li>
                </FeaturesList>
                <HelpText>Мне нужна помощь с оплатой или выставлением счета</HelpText>

            </Card>

            {/* Карточка "Тариф «Корпорация Разума»" */}
            <Card>
                <CardTitle>Тариф «Корпорация Разума»</CardTitle>
                <DescriptionText>
                    Один тариф — и у вас под рукой интеллектуальный помощник, готовый поддержать рабочие задачи 24/7 без лишних затрат на команду и время.
                </DescriptionText>
                <PriceText>1499 ₽</PriceText>
                <ActionButton>Премиум</ActionButton>
                <TokensText>5 000 000 токенов</TokensText>
                <FeaturesList>
                    <li>Генерация всех постов в соцсетях на год вперёд (и ещё останется)</li>
                    <li>Примерно 3750 000 слов или 8000-10000 страниц текста</li>
                    <li>Эквивалентно: 30000-40000 полных взаимодействий с UU</li>
                </FeaturesList>
                <HelpText>Мне нужна помощь с оплатой или выставлением счета</HelpText>
            </Card>
        </CardsContainer>
    </WrapperAbout>
    <Footer></Footer>
    </div>
  );
};

export default Price;