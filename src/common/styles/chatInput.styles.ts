import styled from "styled-components";

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 80vh; /* Занимает всю высоту viewport */
    justify-content: flex-end; /* Контент прижат к низу */
    padding: 20px; /* Общие отступы */
    box-sizing: border-box; /* Учитываем паддинги в размерах */
    width: 100%;
    
    @media (max-width: 768px) {
        padding: 10px; /* Меньше паддинга на мобильных */
    }
`;

export const MessageWrapper = styled.div`
    width: 100%;
    max-width: 80vw; /* Максимальная ширина на десктопах */
    flex-grow: 1; /* Растягивается, чтобы занять всё доступное пространство */
    overflow-y: auto; /* Скролл для сообщений */
    margin-bottom: 10px;
    box-sizing: border-box;
    align-self: center; /* Центрируем по горизонтали */

    &::-webkit-scrollbar-thumb {
        background-color: white;
        border-radius: 4px;
    }
    &::-webkit-scrollbar {
        width: 8px;
    }

    @media (max-width: 768px) {
        max-width: 95vw; /* Увеличиваем ширину на планшетах/мобильных */
    }
`;

export const InputContainer = styled.div`
    background-color: #ECECE5;
    border-radius: 20px;
    padding: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 640px; /* Ограничение ширины на десктопах */
    box-sizing: border-box;
    margin: 0 auto; /* Центрирование */

    @media (max-width: 768px) {
        border-radius: 15px; /* Меньше скругление на мобильных */
    }
`;

export const TextArea = styled.textarea<{ hasFocus: boolean }>`
    flex: 1;
    background-color: #ECECE5;
    width: 100%;
    border: none;
    outline: none;
    border-radius: 15px; /* Меньше скругление */
    padding: 10px;
    font-size: 16px;
    margin-bottom: 10px; /* Уменьшен отступ */
    resize: none;
    overflow-y: auto;
    max-height: 200px; /* Максимальная высота */
    box-shadow: ${({ hasFocus }) => (hasFocus ? '0 0 5px #007bff' : 'none')};
    box-sizing: border-box;

    @media (max-width: 600px) {
        font-size: 14px;
        padding: 8px;
        max-height: 120px;
    }
`;

export const Button = styled.button`
    background-color: #B2CEE2;
    color: #000000;
    border: none;
    border-radius: 20px;
    padding: 10px 12px;
    cursor: pointer;
    font-size: 13px;
    transition: background 0.2s;
    display: flex;
    align-items: center;
    gap: 5px; /* Уменьшен гэп */

    &:hover {
        background-color: #a1c0d3;
    }

    @media (max-width: 600px) {
        padding: 8px 10px;
        font-size: 12px;
        gap: 3px;
    }

    & > img {
        width: 15px;
        height: 15px; /* Добавлена высота для img */
    }
`;
export const Search = styled(Button)`
`;

export const FileInput = styled.input`
    display: none;
`;

export const BtnWrapper = styled.div`
    display: flex;
    gap: 8px; /* Уменьшен гэп для компактности */
    flex-wrap: wrap; /* Кнопки будут переноситься на новую строку */
    align-items: center;
    justify-content: flex-start; /* Выравнивание кнопок слева */

    @media (max-width: 600px) {
        gap: 6px; /* Ещё меньше гэп на очень маленьких экранах */
    }
`;

interface HelperDropdownProps {
    isOpen: boolean;
}

export const HelperDropdown = styled.div<HelperDropdownProps>`
    position: absolute;
    bottom: calc(100% + 5px); /* Над кнопкой с небольшим отступом */
    left: 0; /* Выравнивание по левому краю кнопки */
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    z-index: 10;
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    padding: 10px;
    min-width: 200px;
    max-height: 30vh;
    overflow-y: auto;

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    li {
        padding: 8px 12px;
        cursor: pointer;
        border-radius: 5px;
        &:hover {
            background-color: #B2CEE2;
        }
    }
`;

export const InputDecor = styled.div`
    margin-top: 10px;
    width: max-content;
    height: auto; /* Высота определяется контентом */
    padding: 8px; /* Немного уменьшен паддинг */
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: linear-gradient(180deg, rgba(210, 224, 239, 0.1), rgba(186, 221, 253, 0.5) 50%, rgba(154, 187, 227, 0.2) 100%);
    box-shadow: 0 2px 10px rgba(98, 153, 208, 0.5);
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    align-self: center; /* Центрируем по горизонтали */

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: inherit;
        filter: blur(15px); /* Уменьшен блюр для лучшей производительности на мобильных */
        z-index: 1;
    }
    > * {
        position: relative;
        z-index: 2;
    }

    @media (max-width: 768px) {
    display:none;
        border-radius: 15px; /* Меньше скругление */
        padding: 6px; /* Ещё меньше паддинг */
        gap: 6px;
         max-width: 640px; /* Та же максимальная ширина, что у InputContainer */
    }
`;

export const FooterChatInput = styled.footer`
    display: flex;
    gap: 32px; /* Уменьшен гэп для десктопов */
    margin-top: 20px;
    flex-wrap: wrap; /* Футерные ссылки будут переноситься */
    justify-content: center; /* Центрирование */
    align-self: center; /* Центрируем по горизонтали */

    a {
        color: white;
        font-size: 14px;
        text-decoration: none;
        white-space: nowrap; /* Не даем ссылкам переноситься по словам */
    }

    @media (max-width: 600px) {
        gap: 16px;
        a {
            font-size: 12px;
            padding: 2px 5px; /* Небольшой паддинг для удобства нажатия */
        }
    }
`;

export const Info = styled.div`
    background: transparent;
    color: #fff;
    border-radius: 16px; /* Более округлые кнопки-инфо */
    padding: 8px 16px;
    font-size: 14px;
    cursor: pointer;
    transition: background 0.2s, box-shadow 0.2s;
    
    &:hover {
        background: rgba(255,255,255,0.15);
        box-shadow: 0 0 8px rgba(255, 255, 255, 0.3); /* Более заметная тень при ховере */
    }
    @media (max-width: 600px) {
        font-size: 11px;
        padding: 6px 12px;
        border-radius: 12px;
    }
`;

export interface field {
    id: number,
    name: string
}

export const HelperButton = styled(Button)`
  position: relative;
  display: inline-flex; /* Используем inline-flex для того, чтобы не занимать всю ширину */
`;
