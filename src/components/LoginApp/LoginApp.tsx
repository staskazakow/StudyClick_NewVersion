import React, { useState, useEffect } from 'react'; // Added useEffect
import styled from 'styled-components';
import user from "../../image/User.png";
import { ButtonChat } from '../Header/Header';
import ChatBtn from "../../image/message.png";
import Left from "../../image/BackArrow.png";
import { useActions } from '../../common/useActions';
import { useSelector } from 'react-redux';
import { state } from '../../redux_toolkit/store';
import { Chat } from '../../redux_toolkit/reducers/ChatSlice';
import { useGetFieldsQuery } from '../../redux_toolkit/api/fieldsAli';
import { field } from '../ChatInput/ChatInput';
import { NavLink } from 'react-router';
import RightArrow from "../../image/RightArrow.svg"

// Определение брейкпоинтов для адаптивности
const breakpoints = {
  mobile: '768px',
  tablet: '1024px',
};

interface StyledProps {
  isCollapsed?: boolean;
  isOpen?: boolean;
}

export const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #B2CEE2;
  flex-direction: row;
  position: relative;
  transition: all 0.3s ease;
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
    padding: 10px;
    gap: 10px; // Отступ между ChatWindow и DialogWindow на мобильных
  }
`;

// Боковая панель чатов
const ChatWindow = styled.div<StyledProps>`
  width: ${({ isOpen }) => isOpen ? '20vw' : '0'};
  // min-width: ${({ isOpen }) => isOpen ? '250px' : '0'};
  max-width: ${({ isOpen }) => isOpen ? '350px' : '0'};
  display: flex;
  flex-direction: column;
  background-color: #ECECE5;
  border-radius: 30px;
  margin-right: ${({ isOpen }) => isOpen ? '20px' : '0'}; // Отступ справа от панели
  transition: all 0.3s ease;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    min-width: 0;
    max-width: none;
    height: ${({ isOpen }) => isOpen ? '25vh' : '0'}; // Уменьшаем высоту на мобильных, /чтобы Dialog занимал больше места
    margin-right: 0; // Убираем правый отступ
    border-radius: 10px;
    flex-shrink: ${({ isOpen }) => isOpen ? 0 : 1}; // Сжимаем до 0 если закрыт
  }
`;

// Кнопка сворачивания правой панели (на десктопе)
const CollapseButton = styled.button<StyledProps>`
  width: 24px;
  height: 24px;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  z-index: 1;
  transition: left 0.3s ease, right 0.3s ease, background-color 0.3s ease; // Анимируем left и right
  img {
    width: 20px;
    height: 20px;
    transform: ${({ isCollapsed }) => isCollapsed ? 'rotate(180deg)' : 'rotate(0)'};
    transition: transform 0.3s ease;
  }

  @media (max-width: ${breakpoints.mobile}) {
     display: none; // Скрываем кнопку сворачивания Prompt на мобильных
  }
`;

const NavBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 15px;
  }
`;

const Logo = styled.div`
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
`;

export const ArrowLeft = styled.div`
  cursor: pointer;
  padding: 5px;
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.8;
  }
`;

const Chats = styled.div`
  flex-grow: 1;
  color: #333;
  padding: 20px;
  overflow-y: auto;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 15px;
  }

  & > div {
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    background-color: #ECECE5;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    cursor: pointer;
    transition: background-color 0.2s;
    &:hover {
      background-color: #e0e0d7;
    }
  }
`;

// Окно диалога и Prompt вместе
const DialogWindow = styled.div<StyledProps>`
  flex-grow: 1; // Занимает оставшееся горизонтальное пространство на десктопе/планшете
  height: 100%;
  background-color: #ECECE5;
  border-radius: 30px;
  display: flex;
  flex-direction: row; // Ряд на десктопе/планшете
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // Corrected box-shadow value
  overflow: hidden;

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column; // Колонка на мобильных
    height: auto; // Высота по контенту
    flex-grow: 1; // Занимает оставшееся вертикальное пространство на мобильных
    min-height: 0; // Снимаем минимальную высоту с DialogWindow
    border-radius: 10px;
  }
`;

// Основная часть диалога (сообщения и ввод)
const Dialog = styled.div<StyledProps>`
  display: flex;
  flex-direction: column;
  padding: 20px;
  flex-grow: 1; // Занимает все доступное пространство в DialogWindow по горизонтали (десктоп) или вертикали (мобильный)
  overflow-y: auto; // Ensure Dialog itself can scroll if content is too tall
  position: relative;

  // На десктопе/планшете Dialog занимает пространство, оставшееся после Prompt
  width: ${({ isCollapsed }: StyledProps) => (isCollapsed ? '100%' : 'auto')};
  border-right: ${({ isCollapsed }: StyledProps) => (isCollapsed ? 'none' : '1px solid black')}; // Разделитель с Prompt

  @media (max-width: ${breakpoints.mobile}) {
    border-right: none;
    border-bottom: ${({ isCollapsed }: StyledProps) => (isCollapsed ? 'none' : '1px solid black')}; // Разделитель с Prompt на мобильных, только если Prompt не свернут
    padding: 15px;
    flex-grow: 1; // Занимает доступное пространство над Prompt на мобильных
    min-height: 40vh; // Минимальная высота, чтобы обеспечить видимость диалога
    width: 100%; // Полная ширина на мобильных
    overflow-y: auto; // Explicitly ensure scroll on mobile
  }
`;

// Правая панель с ассистентами
const Prompt = styled.div<StyledProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: ${({ isCollapsed }) => (isCollapsed ? '0' : '18vw')}; // Responsive width
  // min-width: ${({ isCollapsed }) => (isCollapsed ? '0' : '250px')}; // Minimum width when open
  // max-width: ${({ isCollapsed }) => (isCollapsed ? '0' : '350px')}; // Maximum width when open
  padding: ${({ isCollapsed }) => (isCollapsed ? '20px 0' : '20px')};
  border-left: ${({ isCollapsed }) => (isCollapsed ? 'none' : '1px solid black')};
  transition: all 0.3s ease;
  overflow: hidden; // Keep overflow hidden on the container itself

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    height: ${({ isCollapsed }) => (isCollapsed ? '0' : 'auto')};
    max-height: ${({ isCollapsed }) => (isCollapsed ? '0' : '30vh')}; // Oграничиваем высоту при развернутом
    min-height: 0; // Позволяем сжаться до 0
    border-left: none;
    border-top: ${({ isCollapsed }) => (isCollapsed ? 'none' : '1px solid black')}; // Разделитель сверху на мобильных
    padding: ${({ isCollapsed }) => (isCollapsed ? '0 15px' : '15px')};
    transition: all 0.3s ease, max-height 0.3s ease;
    overflow-y: auto; // Allow Prompt panel itself to scroll if needed on mobile
  }
`;

const StyledButtonChat = styled(ButtonChat)`
  border: none;
  // background: none;

  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: ${breakpoints.mobile}) {
    width:50%;
    
  }
`;

const MessageBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex-grow: 1;

  @media (max-width: ${breakpoints.mobile}) {
    height: auto;
    min-height: 0; // Снимаем мин-высоту, т.к. она задана для Dialog
  }
`;

const InputBlock = styled.input`
  border-radius: 30px;
  border: none;
  padding: 10px 20px;
  margin-top: 10px;
  width: 100%;
  box-sizing: border-box;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2);
  }
`;

const HeaderBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 15px;
    gap: 10px; // Отступ между элементами заголовка на мобильных
    width: 100%; // Take full width on mobile
  }
`;

const FieldsBtn = styled.div`
  padding: 3px 10px;
  background: #D9D9D9;
  border-radius: 30px;
  font-family: Inter;
  line-height: 100%;
  letter-spacing: 0%;
  color: black;
  cursor: pointer;
  flex-shrink: 0;

  @media (max-width: ${breakpoints.mobile}) {
     margin-bottom: 0; // Убираем отступ снизу, т.к. используем gap в HeaderBlock
  }
`;

const PlanUpped = styled.div`
  padding: 4px 10px;
  background-color: #13233D;
  border-radius: 30px;
  color: white;
  flex-shrink: 0;
`;

const Messages = styled.div`
  overflow-y: auto;
  flex-grow: 1;
  margin-bottom: 10px;
  padding-right: 10px; // Keep padding for scrollbar space

  // Add flexible height on mobile
  @media (max-width: ${breakpoints.mobile}) {
    flex-grow: 1; // Still grow to take available space
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

const AssistantsList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  gap: 8px;
  margin-top: 0;
  background: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  overflow-y: auto; // Make the list scrollable if it exceeds max height
  max-height: 20vh; // Limit height of the list within the Prompt panel

  @media (min-width: ${breakpoints.mobile}) {
     max-height: none; // No fixed max height on desktop/tablet
     overflow-y: visible; // No overflow scrolling on desktop/tablet list
  }
`;


const Asisstant = styled.li`
  color: black;
  padding: 8px 12px;
  background: #13233D33;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #13233D55;
  }
`;

const MessagesItem = styled.div`
  color: black;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
  // max-width: 100%;
  word-break: break-word;
  background-color: #D9D9D9;
  padding: 8px 12px;
  border-radius: 15px;
  align-self: flex-end;
  width:max-content;
  &.assistant {
    background-color: #B2CEE2;
    align-self: flex-start;
  }
`;

interface LoginAppProps {}

const LoginApp: React.FC<LoginAppProps> = () => {
  const [message, setMessage] = useState<string>("");
  const [showAssistants, setShowAssistants] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const { AddMessage } = useActions();
  const { data } = useGetFieldsQuery();
  const [isPromptCollapsed, setIsPromptCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // Use state for mobile status

  // Effect to update isMobile state on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia(`(max-width: ${breakpoints.mobile})`).matches);
    };

    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile); // Add listener

    return () => {
      window.removeEventListener('resize', checkMobile); // Clean up listener
    };
  }, []);


  const sendMessage = (): void => {
    if (message.trim() !== "") {
      // Assuming AddMessage can handle the message object
      AddMessage({ describe: message, role: "user" });
      setMessage("");
    }
  };

  const togglePrompt = () => {
    setIsPromptCollapsed(!isPromptCollapsed);
    // Close assistant list when Prompt panel is collapsed
    if (!isPromptCollapsed) {
        setShowAssistants(false);
    }
  };

  const toggleAssistants = (): void => {
    setShowAssistants(prev => !prev);
  };

  const toggleSidebar = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  const message_data: Array<Chat> = useSelector((state: state) => state.chat.messages_data);

  const setStudyId = (id: number, name: string): void => {
    localStorage.setItem("study_field_id", id.toString());
    localStorage.setItem("study_field_name", name);
  };


  return (
    <Wrapper>
      <ChatWindow isOpen={isSidebarOpen}>
        <NavBlock>
          <StyledButtonChat>
            <img src={ChatBtn} alt="Chat" />
          </StyledButtonChat>
          <Logo>Study Click</Logo>
          <ArrowLeft onClick={toggleSidebar}>
            <img src={Left} alt="Toggle Sidebar" />
          </ArrowLeft>
        </NavBlock>
        <Chats>
          {/* Здесь можно маппить реальные чаты */}
          <div>Chat 1</div>
          <div>Chat 2</div>
          <div>Chat 3</div>
          <div>Chat 4</div>
        </Chats>
      </ChatWindow>

      {/* Pass isCollapsed state to DialogWindow */}
      <DialogWindow isOpen={isSidebarOpen}>
        {/* Pass isCollapsed to Dialog to adjust its width/border */}
        <Dialog isCollapsed={isPromptCollapsed}>
          <HeaderBlock>
            {/* Кнопка открытия левой панели, когда она закрыта (только на десктопе) */}
            {!isSidebarOpen && !isMobile && (
              <ArrowLeft onClick={toggleSidebar} style={{ marginRight: '10px' }}>
                <img src={RightArrow} alt="Open Sidebar" />
              </ArrowLeft>
            )}
            {!isSidebarOpen && isMobile && (
              <ArrowLeft onClick={toggleSidebar} style={{ marginRight: '10px' }}>
                <img src={RightArrow} alt="Open Sidebar" />
              </ArrowLeft>
            )}
             {/* Кнопка открытия Prompt на мобильных (показываем, только когда Prompt свернут) */}
            {isMobile && isPromptCollapsed && (
                 <FieldsBtn onClick={togglePrompt} style={{ cursor: 'pointer' }}>
                    Асисстенты
                 </FieldsBtn>
            )}
             {/* Кнопка сворачивания Prompt на мобильных (показываем, только когда Prompt развернут) */}
            {isMobile && !isPromptCollapsed && (
                 <FieldsBtn onClick={togglePrompt} style={{ cursor: 'pointer' }}>
                    Свернуть
                 </FieldsBtn>
            )}

            {/* Кнопка "Сфера обучения" на десктопе/планшете */}
            {!isMobile && <FieldsBtn>Сфера обучения</FieldsBtn>}


            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
             <NavLink style={{textDecoration:"none"}} to={"/tarif"}>
              
               <PlanUpped>Улучшить план</PlanUpped>
              </NavLink>
              <NavLink to={"/profile"} style={{cursor:"pointer"}}>
                <img src={user} alt="User" style={{width: '24px', height: '24px'}} />
              </NavLink>
               {/* Кнопка сворачивания Prompt на десктопе/планшете */}
               {!isMobile && (
                 <CollapseButton
                   isCollapsed={isPromptCollapsed}
                   onClick={togglePrompt}
                 >
                   <img
                     src={isPromptCollapsed ? RightArrow : Left} // Стрелка меняет направление
                     alt={isPromptCollapsed ? "Развернуть Prompt" : "Свернуть Prompt"}
                   />
                 </CollapseButton>
               )}
            </div>
          </HeaderBlock>

          <MessageBlock>
            <Messages>
              {message_data.length > 0 ? (
                message_data.map((e, index) => (
                   // Apply 'assistant' class based on role
                  <MessagesItem key={index} className={e.role === 'assistant' ? 'assistant' : ''}>
                    {e.describe}
                  </MessagesItem>
                ))
              ) : (
                <div>Сообщений не найдено</div>
              )}
            </Messages>
            <InputBlock
              value={message}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Чем помочь?"
            />
          </MessageBlock>
        </Dialog>

         {/* Prompt панель - скрывается на мобильных, если свернута, или отображается под Dialog */}
         {(!isMobile || !isPromptCollapsed) && (
            <Prompt isCollapsed={isPromptCollapsed}>
              {/* Кнопка Ассистенты/Скрыть список (видима только когда Prompt развернут) */}
              {!isPromptCollapsed && (
                <>
                  {/* This button now controls visibility of the AssistantsList */}
                  <button onClick={() => toggleAssistants()} style={{
                      background: '#13233D',
                      color: 'white',
                      padding: '8px 15px',
                      borderRadius: '20px',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '14px',
                      marginBottom: '10px',
                      transition: 'background-color 0.2s ease',
                      // Ensure button takes full width on mobile Prompt
                      width: isMobile ? '100%' : 'auto',
                      textAlign: 'center'
                  }} >{showAssistants ? 'Скрыть ассистентов' : 'Показать ассистентов'}</button>

                  {/* Use the styled component for the list */}
                  {showAssistants && (
                    <AssistantsList>
                      {data && data.map((e: field) => (
                        <Asisstant
                          key={e.id}
                          onClick={() => {
                            setStudyId(e.id, e.name);
                            // Optionally keep assistants list open or close after selection
                            // toggleAssistants(); // Uncomment to close after selection
                          }}
                        >
                          {e.name}
                        </Asisstant>
                      ))}
                    </AssistantsList>
                  )}
                </>
              )}
            </Prompt>
         )}
      </DialogWindow>
    </Wrapper>
  );
};

export default LoginApp;
