import styled, { keyframes } from "styled-components";
import { Button } from "./chatInput.styles";

export const breakpoints = {
  mobile: '1000px',
  tablet: '1024px',
};

interface StyledProps {
  isCollapsed?: boolean;
  isOpen?: boolean;
}

export const Wrapper = styled.div`
    overflow-y:hidden;
    display: flex;
    height: 100vh;
    width: 100vw;
    background-color: #B2CEE2;
    flex-direction: column;
    position: relative;
    transition: all 0.3s ease;
    box-sizing: border-box;
    @media (max-width: ${breakpoints.mobile}) {
      flex-direction: column;
      height: auto;
      min-height: 100vh;
      padding: 10px;
      gap: 10px;
    }
  `;
export const StyledFileInput = styled.input`
    /* Make the file input invisible but still interactable */
    opacity: 0;
    position: absolute;
    z-index: -1; /* Ensure it's behind the label/button */
    width: 0.1px;
    height: 0.1px;
    overflow: hidden;
    pointer-events: none; /* Prevent it from interfering with other elements */
  `;
export const MobileSidebar = styled.div`
   display:flex;
   flex-direction:column;
   align-items:center;
   gap:25px;
   @media(max-width:1000px){
   flex-direction:row;
   align-items:center;
  //  padding-bottom:105px;
   }
  `
export const ChatWindow = styled.div<StyledProps>`
  /* Базовые стили, общие для всех разрешений */
  background-color: #ECECE5;
  box-shadow: 1px 0px 10px 1px #13233D;
  overflow: hidden;
  flex-shrink: 0; /* Предотвращает сжатие контейнера, если родительский элемент - flex */
  display: flex;
  flex-direction: column;
  z-index: 10000;
  width:250px;
  padding-top:${({ isOpen }) => isOpen ? "" : "20px"};
  /* Плавный переход для всех анимируемых свойств */
  transition: max-width 0.35s ease-in-out, max-height 0.35s ease-in-out, padding 0.35s ease-in-out, opacity 0.3s ease-in-out;
 
  /* Стили для больших экранов (Desktop) */
  @media(min-width: 1001px) {
    height: ${({ isOpen }) => isOpen ? "93vh" : "91vh"};
    height: 100vh;
    
    /* Анимация ширины через max-width */
    max-width: ${({ isOpen }) => isOpen ? "300px" : "50px"};
  
  }

  /* Стили для маленьких экранов (Mobile/Tablet) */
  @media (max-width: 1000px) {
    width: 100%; /* На мобильных устройствах компонент всегда пытается занять всю ширину */
    border-radius: 10px;
    overflow-y:hidden;
    padding:0;
    /* Анимация высоты через max-height. Значение должно быть больше ожидаемой высоты контента */
    max-height: ${({ isOpen }) => isOpen ? "20vh" : "8vh"}; 
  }
`;

export const CollapseButton = styled.button<StyledProps>`
    width: 24px;
    height: 24px;
    color: white;
    background-color: transparent;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    z-index: 1;
    transition: left 0.3s ease, right 0.3s ease, background-color 0.3s ease;
    img {
      width: 20px;
      height: 20px;
      transform: ${({ isCollapsed }) => isCollapsed ? 'rotate(180deg)' : 'rotate(0)'};
      transition: transform 0.3s ease;
    }
    @media (max-width: ${breakpoints.mobile}) {
      display: none;
    }
  `;

export const NavBlock = styled.div`
    display: flex;
    gap:10px;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #eee;
    @media (max-width: ${breakpoints.mobile}) {
    }
  `;


export const ArrowLeft = styled.div<StyledProps>`
    cursor: pointer;
    padding: 5px;
    transition: opacity 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    @media(max-width:768px){
      margin:0;
      transform:rotate(180deg)
    }
    img {
      max-width: 20px;
      max-height: 20px;
    }
    &:hover {
      opacity: 0.8;
    }
    img {
      width: 20px;
      height: 20px;
      transform: ${({ isOpen }) => isOpen ? 'rotate(180deg)' : 'rotate(0)'};
      transition: transform 0.3s ease;
    }
  `;

export const Chats = styled.div`
    flex-grow: 1;
    color: #333;
    padding: 2px;
    overflow-y: auto;
    overflow-x:hidden;
    height:80vh;
    @media (max-width: ${breakpoints.mobile}) {
      // padding: 15px;
      height:17vh;
    }
       &::-webkit-scrollbar {
    width: 12px; /* Ширина полосы прокрутки */
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1; /* Цвет фона дорожки */
  }

  &::-webkit-scrollbar-thumb {
    background: #13233D; /* Цвет бегунка */
    border-radius: 6px; /* Закругление углов бегунка */
  }
    & > div {
      // padding: 10px;
      margin-bottom: 10px;
      border-radius: 10px;
      background-color: #ECECE5;
      cursor: pointer;
      transition: background-color 0.2s;
      &:hover {
        background-color: #e0e0d7;
      }
    }
  `;
export const TokenBlock = styled.div`
  box-shadow: 0px 0px 4px 0px #13233D;
  height:7vh;
  display:flex;
  justify-content: flex-start;
  gap:11px;
  >img{
    margin-top:13px;
    margin-left:23px;
    width:20px;
    height:20px;
    padding:7px;
    background-color:#13233D;
    border-radius:50%;
    cursor:pointer;
  }
  >div{
  display:flex;
  align-items: center;
  margin-bottom:3px;
  }
  `
export const DialogWindow = styled.div<StyledProps>`
    flex-grow: 1;
    height:100vh;
    background-color: #ECECE5;
    display: flex;
    flex-direction: row;
    position: relative;
    transition: all 0.3s ease;
    
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    @media (max-width:1000px) {
      flex-direction: column;
      height: auto;
      flex-grow: 1;
      min-height: 0;
      border-radius: 10px;
    }
  `;

export const Dialog = styled.div<StyledProps>`
    display: flex;
    flex-direction: column;
    padding: 20px;
    flex-grow: 1;
    overflow-y: auto;
    background-color:white;
    position: relative;
    @media (max-width: 1000px) {
      border-right: none
      padding: 15px;
      flex-grow: 1;
      min-height: 40vh;
      // width: 100%;
      overflow-y: auto;
    }
  `;

export const Prompt = styled.div<StyledProps>`
    position: relative;
    display: flex;
    box-shadow: 1px 0px 10px 0px #13233D;
    flex-direction: column;
    width: ${({ isCollapsed }) => (isCollapsed ? '0' : 'clamp(160px, 18vw, 300px)')};
    padding: ${({ isCollapsed }) => (isCollapsed ? '20px 0' : '20px')};
    transition: all 0.3s ease;
    overflow: hidden;
    flex-shrink: 0;
    @media (max-width: 1000px) {
    box-shadow:none;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      width: 84vw;
      & > button{
      width:50vw;
      }
      align-items:center;
      min-width: 0;
      max-width: none;
      height: ${({ isCollapsed }) => (isCollapsed ? '0' : 'auto')};
      max-height: ${({ isCollapsed }) => (isCollapsed ? '0' : '30vh')};
      min-height: 0;
      padding: ${({ isCollapsed }) => (isCollapsed ? '0 15px' : '15px')};
      overflow-y: auto;
    }
  `;
export const ButtonChat = styled(Button)`
padding:1px 6px 1px 6px;
 transition: background-color 0.3s;
&:hover {
 background-color:rgb(179, 179, 179); // Цвет кнопки при наведении
}
`
export const StyledButtonChat = styled(ButtonChat)`
 background-color: transparent; // Цвет кнопок
  color: #2b2d42;
  border: none;
  border-radius: 20px;
  font-weight:400;
  padding: 10px 15px;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      display: block;
    }
    @media (max-width: ${breakpoints.mobile}) {
      width: auto;
    }
  `;

export const MessageBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    flex-grow: 1;
    width: 100%;
    overflow: hidden;
    @media (max-width: ${breakpoints.mobile}) {
      height: auto;
      min-height: 0;
    }
  `;

export const InputBlock = styled.input`
    border-radius: 30px;
    border: none;
    padding: 10px 20px;
    width: 100%;
    box-sizing: border-box;
    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2);
    }
      @media (max-width: ${breakpoints.mobile}) {
      width: 90%;
    }
  `;

export const HeaderBlock = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    box-shadow: 0 5px 5px -5px #888888;
    padding-bottom:2px;
    @media (max-width: 1000px) {
      flex-direction: column;
      align-items: stretch;
      margin-bottom: 15px;
      gap: 10px;
      width: 100%;
    }
  `;

export const FieldsBtn = styled.div`
    padding: 8px 40px;
    background: #13233D;
    border-radius: 30px;
    font-family:Montserrat Alternates;
    font-weight:400;
    line-height: 100%;
    font-size:15px;
    letter-spacing: 0%;
    color: #ECECE5;
    cursor: pointer;
    flex-shrink: 0;
    text-align: center;
    @media (max-width: ${breakpoints.mobile}) {
      margin-bottom: 0;
      padding: 8px 10px;
      width:75vw;
    }
  `;

export const PlanUpped = styled.div`
    padding: 11px 18px;
    background-color: #13233D;
    border-radius: 30px;
    color: white;
    flex-shrink: 0;
    text-align: center;
    font-size: 0.9em;
    font-family: Montserrat Alternates;
font-weight: 400;
font-style: Regular;
font-size: 15px;
leading-trim: NONE;
line-height: 100%;
letter-spacing: 0%;
transition:all 0.2s;
  &:hover{
  background-color:#3A4F99;
  }
  `;

export const Messages = styled.div`
    overflow-y: auto;
    flex-grow: 1;
    margin-bottom: 10px;
    padding: 0 10px 0 0;
    display: flex;
    flex-direction: column;
    @media (max-width: ${breakpoints.mobile}) {
      padding-right: 5px;
    }
    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  `;

export const AssistantsList = styled.ul`
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
    margin: 10px 0 0 0;
    gap: 8px;
    background: #fff;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    overflow-y: auto;
    max-height: 35vh;
    width:15vw;
    @media (max-width: ${breakpoints.mobile}) {
      height: 20vh;
      width:90%;
    }
  `;

export const LogoCont = styled.div`
  display:flex;
  align-items:center;
    img{
      width:47px;
      height:35px;
    }
  `
export const ToogleButton = styled.button`
  background: #13233D;
  color: white;
  padding: 10px 15px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s ease;
  textAlign: center;
`
export const PromptsWrapper = styled.div`
display:flex;
flex-direction:column;
margin-top:6px;

`
export interface PromptItem {
  example: string,
  field:number,
  id:number
}
export const Asisstant = styled.li`
    color: black;
    padding: 8px 12px;
    background: #13233D33;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.2s;
    text-align: center;
    &:hover {
      background-color: #13233D55;
    }
  `;

export const MessagesItem = styled.div`
    padding: 8px 12px;
    border-radius: 15px;
    margin-bottom: 10px;
    word-break: break-word;
    max-width: 80%;
    color: black;
    line-height: 1.4;
    margin-right:4px;
    /* Default for user messages */
    align-self: flex-end;
    &.assistant {
      // background-color: #B2CEE2;
      align-self: flex-start;
    }
    @media (max-width: ${breakpoints.mobile}) {
      max-width: 85%;
      margin-right:10px;
    }
  `;



export const LoadingDotsContainer = styled.div`
    display: flex;
    align-items: center;
  `;

export const loadingDotsAnimation = keyframes`
    0%, 80%, 100% {
      transform: scale(0);
      opacity: 0;
    }
    40% {
      transform: scale(1.0);
      opacity: 1;
    }
  `;

export const Dot = styled.span`
    display: inline-block;
    width: 8px;
    height: 8px;
    margin: 0 2px;
    background-color: currentColor; // Будет использовать цвет текста MessagesItem.assistant (черный)
    border-radius: 50%;
    animation: ${loadingDotsAnimation} 1.4s infinite ease-in-out both;
    &:nth-child(1) {
      animation-delay: -0.32s;
    }
    &:nth-child(2) {
      animation-delay: -0.16s;
    }
    &:nth-child(3) {
      animation-delay: 0s;
    }
  `;

export const MessageWrapper = styled.div`

  display:flex;
  flex-direction:row  ;
  @media(max-width:1000px){
    flex-direction:column;
  }
  `