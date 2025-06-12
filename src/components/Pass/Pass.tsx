import React, { useEffect } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router'; // Corrected import
import left from "../../image/BackArrow.png"
import { useCreatePaymentMutation } from '../../redux_toolkit/api/yookassaApi';

// --- Styled Components ---

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 20px;
    background-color: #E5F3FF; /* Light Blue background */
    min-height: 100vh;
    box-sizing: border-box;
    font-family: 'Arial', sans-serif; /* Consistent font */
    
`;

const MainTitle = styled.h1`
    font-size: 28px;
    color: #333;
    margin-bottom: 30px;
    text-align: center;
    font-weight: bold; /* Emphasize the title */

    @media (max-width: 768px) {
        font-size: 24px;
        margin-bottom: 20px;
    }
`;

const CardsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    width: 100%;
    max-width: 1200px;
    justify-items: center;
    padding: 0 20px; /* Add horizontal padding */

    @media (max-width: 1240px) {
        grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
     
`;

const Card = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 15px;
    padding: 25px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
    text-align: center;
    box-sizing: border-box;
    width: 100%;
    max-width: 320px;
    border: 2px solid #f0f0f0; /* Subtle border */
    transition:0.5s;

    @media (max-width: 1240px) {
        max-width: 450px;
    }

    @media (max-width: 768px) {
        max-width: 100%;
    }
    &:hover {
        border:2px solid blue;
    }
`;

const CardTitle = styled.h3`
    font-size: 22px;
    color: #333;
    margin-top: 0;
    margin-bottom: 10px;
    font-weight: 600; /* Slightly bolder */
`;

const CardDescription = styled.p`
    font-size: 15px;
    color: #666;
    margin-bottom: 15px;
    line-height: 1.4; /* Improve readability */
`;

const Price = styled.div`
    font-size: 26px;
    font-weight: bold;
    color: black; /* Green price color */
    margin-bottom: 15px;
`;

interface CardButtonProps {
    isPrimary: boolean;
}

const CardButton = styled.button<CardButtonProps>`
    background-color: ${props => props.isPrimary ? '#28a745' : '#13233D'};
    color: white;
    border: none;
    border-radius: 25px;
    padding: 12px 24px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-bottom: 15px;

    &:hover {
        background-color: ${props => props.isPrimary ? '#1e7e34' : '#0056b3'};
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

const FeaturesList = styled.ul`
    text-align: left;
    padding-left: 25px;
    margin-bottom: 20px;
    list-style-type: disc; /* Use filled circles */
`;

const FeatureItem = styled.li`
    font-size: 14px;
    color: #555;
    margin-bottom: 7px;
    line-height: 1.3;
`;

const HelpText = styled.p`
    font-size: 13px;
    color: #777;
    text-align: center;
    margin-top: auto;
`;

const BackButton = styled.div`
    position: absolute;
    top: 20px;
    left: 20px;
    a {
        display: inline-flex;
        align-items: center;
        color: #007bff;
        text-decoration: none;
        font-size: 16px;
        transition: color 0.3s ease;

        &:hover {
            color: #0056b3;
        }
    }
    img {
        width: 24px; /* Adjust image size */
        height: 24px;
        margin-right: 8px; /* Space between image and text */
    }
`;

// --- Tariff Data (Enhanced) ---
const tariffs = [
    {
        title: 'Бесплатно',
        id:1,
        description: 'Свой мини-преподаватель в кармане, креативный ассистент и педагог-репетитор в одном чатике.',
        price: '0 рублей',
        buttonText: 'Текущий план',
        features: [
            '30 000 токенов',
            'Написать примерно 40-50 страниц текста',
            'Около 100-150 сообщений в чате',
            '1-2 кода на Python, Scratch, JavaScript — с объяснениями и комментариями'
        ],
        isPrimary: true,
        helpText: 'Мне нужна помощь с оплатой или выставлением счета'
    },
    {
        title: 'Тариф «Завтрак с ИИ»',
        id:2,
        description: 'Отличный вариант для ежедневного общения, «пошутить-поработать» и вкусно залипнуть в текстах.',
        price: '299 рублей',
        buttonText: 'Перейти на базовый',
        features: [
            '1 000 000 токенов',
            'Можно задать примерно 300-400 нормальных вопросов',
            'Написать книгу объемом 150-200 страниц текста',
            'Получить 100-150 хороших ответов в стиле «мини-эссе»'
        ],
        isPrimary: false,
        helpText: 'Мне нужна помощь с оплатой или выставлением счета'
    },
    {
        title: 'Тариф «ИИ не уходит в отпуск»',
        id:3,
        description: 'Это уже уровень «У меня есть свой ИИ-редактор, психолог, маркетолог и оракул — всё в одном лице». Можно вести блог, компанию и не сходить с ума.',
        price: '499 рублей',
        buttonText: 'Перейти на расширенный',
        features: [
            '2 500 000 токенов',
            'Напишите книгу объёмом 400+ страниц',
            'Напишите цельный курс по экономике, с тестами и примерами',
            'Эквивалентно: 15 000-20 000 коротких взаимодействий с ИИ'
        ],
        isPrimary: false,
        helpText: 'Мне нужна помощь с оплатой или выставлением счета'
    },
    {
        title: 'Тариф «Корпорация Разума»',
        id:4,
        description: 'Генерация всех постов в соцсетях на год вперёд (и ещё останется)',
        price: '899 рублей',
        buttonText: 'Перейти на премиум',
        features: [
            '5 000 000 токенов',
            'Генерация всех постов в соцсетях на год вперёд (и ещё останется)',
            'Примерно 3 750 000 слов или 8000-10 000 страниц текста',
            'Эквивалентно: 30 000-40 000 полных взаимодействий с ИИ'
        ],
        isPrimary: false,
        helpText: 'Мне нужна помощь с оплатой или выставлением счета'
    },
];

// --- Component ---

const TariffPage = () => {
    const [createPayments,{status,data}] = useCreatePaymentMutation()
    const handleButton = (tariff:any) => {
        createPayments({
            subscription_plan_id:tariff.id
        })
    }
    useEffect(() => {
        if (data) {
            window.location.href = data.confirmation_url
        }

    },[data])
    return (
        <PageContainer>
            <BackButton>
                <NavLink style={{color:"black"}} to={"/"}>
                <img src={left} alt="Go Back" />
                 Go Back
                </NavLink>
            </BackButton>
            <MainTitle>Обновите свой план</MainTitle>
            <CardsContainer>
                {tariffs.map((tariff, index) => (
                    <Card key={index}>
                        <CardTitle>{tariff.title}</CardTitle>
                        <CardDescription>{tariff.description}</CardDescription>
                        <Price>{tariff.price}</Price>
                        <CardButton onClick={() => handleButton(tariff)} isPrimary={tariff.isPrimary} disabled={tariff.isPrimary}>
                            {tariff.buttonText}
                        </CardButton>
                        <FeaturesList>
                            {tariff.features.map((feature, i) => (
                                <FeatureItem key={i}>{feature}</FeatureItem>
                            ))}
                        </FeaturesList>
                        <HelpText>{tariff.helpText}</HelpText>
                    </Card>
                ))}
            </CardsContainer>
        </PageContainer>
    );
};

export default TariffPage;

