import React from 'react';
import styled from 'styled-components';
import { ArrowLeft } from '../LoginApp/LoginApp';
import left from "../../image/BackArrow.png"
import { NavLink } from 'react-router';
// --- Styled Components ---

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 20px; /* Added padding for overall spacing */
    background-color: #B2CEE2; /* Background color from Figma */
    min-height: 100vh; /* Ensure it covers the full viewport height */
    box-sizing: border-box; /* Include padding in element's total width and height */
`;

const MainTitle = styled.h1`
    font-size: 36px; /* Adjust font size */
    color: #333; /* Dark text color */
    margin-bottom: 40px; /* Space below the title */
    text-align: center; /* Center align text */

    @media (max-width: 768px) {
        font-size: 28px;
        margin-bottom: 30px;
    }
`;

const CardsContainer = styled.div`
    display: grid; /* Use Grid for layout */
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); /* Responsive grid columns */
    gap: 23px; /* Space between grid items */
    width: 100%;
    max-width: 1200px; /* Limit max width of the container */
    justify-items: center; /* Center grid items within their cells */

    @media (max-width: 1240px) {
        grid-template-columns: 1fr 1fr; /* Stack items on smaller screens */
    }
    @media (max-width: 768px) {
        grid-template-columns: 1fr; /* Stack items on smaller screens */
    }
`;

const Card = styled.div`
    display: flex; /* Still use flexbox for internal content stacking */
    flex-direction: column;
    background-color: #ffffff; /* White background for cards */
    border-radius: 16px; /* Rounded corners for cards */
    padding: 30px; /* Padding inside cards */
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); /* Subtle shadow */
    text-align: center; /* Center align text within the card */
    box-sizing: border-box; /* Include padding and border in element's total width and height */
    width: 100%; /* Card takes full width of its grid cell */
    max-width: 320px; /* Keep max-width on the card itself */

    @media (max-width: 1240px) {
        max-width: 480px; /* Stack items on smaller screens */
    }
    @media (max-width: 768px) {
       max-width: 400px; /* Optional: limit max width even when full-width grid on small screens */
    }
`;

const CardTitle = styled.h3`
    font-size: 20px; /* Font size for card title */
    color: #333; /* Dark text color */
    margin-top: 0;
    margin-bottom: 10px; /* Space below title */
`;

const CardDescription = styled.p`
    font-size: 14px; /* Font size for description */
    color: #555; /* Grey text color */
    margin-bottom: 20px; /* Space below description */
`;

const TokensAmount = styled.div`
    font-size: 28px; /* Larger font size for token amount */
    font-weight: bold; /* Bold text */
    color: #333; /* Dark text color */
    margin-bottom: 20px; /* Space below token amount */
`;
interface CardProps{
     primary:boolean
    }
const CardButton = styled.button<CardProps>`
    background-color: ${props => props.primary ? '#007bff' : '#333'}; /* Blue for active, dark grey for others */
    color: white; /* White text color */
    border: none;
    border-radius: 8px; /* Rounded corners for button */
    padding: 12px 20px; /* Padding inside button */
    font-size: 16px; /* Font size for button */
    cursor: pointer;
    margin-bottom: 20px; /* Space below button */
    transition: background-color 0.3s ease; /* Smooth transition */

    &:hover {
         background-color: ${props => props.primary ? '#0056b3' : '#555'}; /* Darker color on hover */
    }

    &:disabled {
        background-color: #cccccc; /* Grey out when disabled */
        cursor: not-allowed;
    }
`;

const FeaturesList = styled.ul`
    text-align: left; /* Left align list items */
    padding-left: 20px; /* Indent the list */
    margin-bottom: 20px; /* Space below the list */
`;

const FeatureItem = styled.li`
    font-size: 14px; /* Font size for list items */
    color: #555; /* Grey text color */
    margin-bottom: 8px; /* Space between list items */
`;

const SmallText = styled.p`
    font-size: 12px; /* Smaller font size */
    color: #777; /* Lighter grey */
    margin-top: auto; /* Push to the bottom of the card */
`;

// --- Tariff Data (Example) ---
const tariffs = [
    {
        title: 'Бесплатно',
        description: 'Свой мини-преподаватель в кармане, креативный ассистент и педагог-репетитор в одном чатике.',
        tokens: '30 000 токенов',
        buttonText: 'Текущий план',
        features: [
            'Написать примерно 40-50 страниц текста',
            'Около 100-150 сообщений в чате',
            '1-2 кода на Python, Scratch, JavaScript — с объяснениями и комментариями'
        ],
        isPrimary: true, // Indicates the current/active plan
        smallText: 'Мне нужна помощь с оплатой или выставлением счета'
    },
    {
        title: 'Тариф «Завтрак с ИИ»',
        description: 'Отличный вариант для ежедневного общения, «пошутить-поработать» и вкусно залипнуть в текстах.',
        tokens: '1 000 000 токенов',
        buttonText: 'Перейти на базовый',
        features: [
            'Можно задать примерно 300-400 нормальных вопросов',
            'Написать книгу объемом 150-200 страниц текста',
            'Получить 100-150 хороших ответов в стиле «мини-эссе»'
        ],
        isPrimary: false,
        smallText: 'Мне нужна помощь с оплатой или выставлением счета'
    },
    {
        title: 'Тариф «ИИ не уходит в отпуск»',
        description: 'Это уже уровень «У меня есть свой ИИ-редактор, психолог, маркетолог и оракул — всё в одном лице». Можно вести блог, компанию и не сходить с ума.',
        tokens: '2 500 000 токенов',
        buttonText: 'Перейти на расширенный',
        features: [
            'Напишите книгу объёмом 400+ страниц',
            'Напишите цельный курс по экономике, с тестами и примерами',
            'Эквивалентно: 15 000-20 000 коротких взаимодействий с ИИ'
        ],
        isPrimary: false,
        smallText: 'Мне нужна помощь с оплатой или выставлением счета'
    },
    {
        title: 'Тариф «Корпорация Разума»',
        description: 'Генерация всех постов в соцсетях на год вперёд (и ещё останется)',
        tokens: '5 000 000 токенов',
        buttonText: 'Перейти на премиум',
        features: [
            'Примерно 3 750 000 слов или 8000-10 000 страниц текста',
            'Эквивалентно: 30 000-40 000 полных взаимодействий с ИИ'
        ],
        isPrimary: false,
        smallText: 'Мне нужна помощь с оплатой или выставлением счета'
    },
];

// --- Component ---

const TariffPage = () => {
    return (
        <PageContainer>
            <ArrowLeft>
                <NavLink to={"/"}>
                    
                <img src={left} alt="" />
                </NavLink>
            </ArrowLeft>
            <MainTitle>Обновите свой план</MainTitle>
            <CardsContainer>
                {tariffs.map((tariff, index) => (
                    <Card key={index}>
                        <CardTitle>{tariff.title}</CardTitle>
                        <CardDescription>{tariff.description}</CardDescription>
                        <TokensAmount>{tariff.tokens}</TokensAmount>
                        <CardButton primary={tariff.isPrimary} disabled={tariff.isPrimary}>
                            {tariff.buttonText}
                        </CardButton>
                         <p>Вы можете:</p> {/* Text before the list */}
                        <FeaturesList>
                            {tariff.features.map((feature, i) => (
                                <FeatureItem key={i}>{feature}</FeatureItem>
                            ))}
                        </FeaturesList>
                        <SmallText>{tariff.smallText}</SmallText>
                    </Card>
                ))}
            </CardsContainer>
        </PageContainer>
    );
};

export default TariffPage;
