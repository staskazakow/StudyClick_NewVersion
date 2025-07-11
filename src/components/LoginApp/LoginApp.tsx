import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import user from "../../image/User.png";
import { ButtonChat } from '../Header/Header';
import ChatBtn from "../../image/message.png";
import { useActions } from '../../common/useActions';
import { useSelector } from 'react-redux';
import { state } from '../../redux_toolkit/store';
import { Chat, Message } from '../../redux_toolkit/reducers/ChatSlice';
import { useGetFieldsQuery } from '../../redux_toolkit/api/fieldsAli';
import { Button, field } from '../ChatInput/ChatInput';
import { NavLink } from 'react-router';
import RightArrow from "../../image/RightArrow.svg"
import { useCreateMessageMutation, useGetChatsQuery } from '../../redux_toolkit/api/chatsApi';
import DialogItem from '../Dialog/Dialog';
import { FooterINN, LoadingOverlay, LoadingSpinner } from '../../App';
import screpka from "../../image/screpka.png"
import logo from "../../image/LogoIn.png"

// Определение брейкпоинтов для адаптивности
const breakpoints = {
  mobile: '1000px',
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
  flex-direction: column;
  position: relative;
  transition: all 0.3s ease;
  padding: 20px;
  box-sizing: border-box;
  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
    padding: 10px;
    gap: 10px;
  }
`;

const ChatWindow = styled.div<StyledProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #ECECE5;
  border-radius: 30px;
  margin-right: ${({ isOpen }) => isOpen ? '20px' : '0'};
  transition: all 0.3s ease;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
  width: ${({ isOpen }) => isOpen ? "min-content" : "0"};
  height: ${({ isOpen }) => isOpen ? "95vh" : "0"};
  @media (max-width: 1000px) {
    min-width: 0;
    max-width: none;
    margin-right: 0;
    border-radius: 10px;
    flex-shrink: ${({ isOpen }) => isOpen ? 0 : 1};
    width: ${({ isOpen }) => isOpen ? "100%" : "0"};
    height: ${({ isOpen }) => isOpen ? "22vh" : "0"};
  }
`;

const CollapseButton = styled.button<StyledProps>`
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

const NavBlock = styled.div`
  display: flex;
  gap:10px;
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

export const ArrowLeft = styled.div<StyledProps>`
  cursor: pointer;
  padding: 5px;
  transition: opacity 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
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
    transform: ${({ isCollapsed }) => isCollapsed ? 'rotate(0)' : 'rotate(180deg)'};
    transition: transform 0.3s ease;
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

const DialogWindow = styled.div<StyledProps>`
  flex-grow: 1;
  height: 95%;
  background-color: #ECECE5;
  border-radius: 30px;
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

const Dialog = styled.div<StyledProps>`
  display: flex;
  flex-direction: column;
  padding: 20px;
  flex-grow: 1;
  overflow-y: auto;
  position: relative;
  border-right: ${({ isCollapsed }: StyledProps) => (isCollapsed ? 'none' : '1px solid black')};
  @media (max-width: 1000px) {
    border-right: none;
    border-bottom: ${({ isCollapsed }: StyledProps) => (isCollapsed ? 'none' : '1px solid black')};
    padding: 15px;
    flex-grow: 1;
    min-height: 40vh;
    width: 100%;
    overflow-y: auto;
  }
`;

const Prompt = styled.div<StyledProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: ${({ isCollapsed }) => (isCollapsed ? '0' : 'clamp(160px, 18vw, 300px)')};
  padding: ${({ isCollapsed }) => (isCollapsed ? '20px 0' : '20px')};
  border-left: ${({ isCollapsed }) => (isCollapsed ? 'none' : '1px solid black')};
  transition: all 0.3s ease;
  overflow: hidden;
  flex-shrink: 0;
  @media (max-width: 1000px) {
    width: 100%;
    min-width: 0;
    max-width: none;
    height: ${({ isCollapsed }) => (isCollapsed ? '0' : 'auto')};
    max-height: ${({ isCollapsed }) => (isCollapsed ? '0' : '30vh')};
    min-height: 0;
    border-left: none;
    border-top: ${({ isCollapsed }) => (isCollapsed ? 'none' : '1px solid black')};
    padding: ${({ isCollapsed }) => (isCollapsed ? '0 15px' : '15px')};
    overflow-y: auto;
  }
`;

const StyledButtonChat = styled(ButtonChat)`
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
   background-color:rgb(65 65 65); // Цвет кнопки при наведении
  &:hover {
 background-color:rgb(17, 9, 9); // Цвет кнопки при наведении
}
  img {
    display: block;
  }
  @media (max-width: ${breakpoints.mobile}) {
    width: auto;
  }
`;

const MessageBlock = styled.div`
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

const InputBlock = styled.input`
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

const HeaderBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: stretch;
    margin-bottom: 15px;
    gap: 10px;
    width: 100%;
  }
`;

const FieldsBtn = styled.div`
  padding: 3px 10px;
  background: #D9D9D9;
  border-radius: 30px;
  font-family: Inter, sans-serif;
  line-height: 1.2;
  letter-spacing: 0%;
  color: black;
  cursor: pointer;
  flex-shrink: 0;
  text-align: center;
  @media (max-width: ${breakpoints.mobile}) {
    margin-bottom: 0;
    padding: 8px 10px;
    width:75vw;
  }
`;

const PlanUpped = styled.div`
  padding: 4px 10px;
  background-color: #13233D;
  border-radius: 30px;
  color: white;
  flex-shrink: 0;
  text-align: center;
  font-size: 0.9em;
`;

const Messages = styled.div`
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

const AssistantsList = styled.ul`
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
  max-height: 50vh;
  width:15vw;
  @media (max-width: ${breakpoints.mobile}) {
     max-height: 20vh;
     width:90%;
  }
`;

const LogoCont = styled.div`
display:flex;
align-items:center;
  img{
    width:47px;
    height:35px;
  }
`

const Asisstant = styled.li`
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
  background-color: #D9D9D9;
  align-self: flex-end;
  &.assistant {
    background-color: #B2CEE2;
    align-self: flex-start;
  }
  @media (max-width: ${breakpoints.mobile}) {
    max-width: 85%;
    margin-right:10px;
  }
`;

type ErrorRes = { data: any; error?: undefined; } | { data?: undefined; error: any; }

const LoadingDotsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const loadingDotsAnimation = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0;
  }
  40% {
    transform: scale(1.0);
    opacity: 1;
  }
`;

const Dot = styled.span`
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

const MessageWrapper = styled.div`
display:flex;
flex-direction:row;
@media(max-width:1000px){
  flex-direction:column;
}
`

interface LoginAppProps { }

export const LoadingDots: React.FC = () => (
  <LoadingDotsContainer>
    <Dot />
    <Dot />
    <Dot />
  </LoadingDotsContainer>
);

// Define the styled FileInput component here
const StyledFileInput = styled.input`
  /* Make the file input invisible but still interactable */
  opacity: 0;
  position: absolute;
  z-index: -1; /* Ensure it's behind the label/button */
  width: 0.1px;
  height: 0.1px;
  overflow: hidden;
  pointer-events: none; /* Prevent it from interfering with other elements */
`;


const LoginApp: React.FC<LoginAppProps> = () => {
  const [message, setMessage] = useState<string>("");
  const [showAssistants, setShowAssistants] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const { PushMessage, SetChats, SetCurrentChat: SetCurrentChatMessages, AddChatLogin } = useActions();
  const { data: fieldsApiData } = useGetFieldsQuery();
  const [isPromptCollapsed, setIsPromptCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [createMessage, { isLoading: SendFetching }] = useCreateMessageMutation()
  const { data: chats, isLoading } = useGetChatsQuery(0)
  const chatsFromStore = useSelector((state: state) => state.chat.chat_data)
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [fieldName, setFieldName] = useState("")
  const [file, setFile] = useState<File | null>(null); // Initialize with null

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    } else {
        setFile(null); // Set file to null if no file is selected (e.g., user cancels)
    }
     // Reset the file input value to allow selecting the same file again
    e.target.value = '';
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia(`(max-width: ${breakpoints.mobile})`).matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (chats && chats?.length != 0) {
      SetChats(chats);
    }
  }, [chats, SetChats]);

  const messagesFromStore: Array<Message> = useSelector((state: state) => state.chat.current_chat);
  // messagesFromStore.length > 0 ? : SetCurrentChatMessages()
  // Эффект для автоматической прокрутки вниз при изменении сообщений
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messagesFromStore]); // Зависимости: массив сообщений

  const sendMessage = async () => {
    if (message.trim() !== "" || file) {
      PushMessage({ message: message, role: "user" })
      try {
        const studyFieldId = localStorage.getItem("study_field_id");
        const chatId = localStorage.getItem("chat_id");
        const formData = new FormData()
        if (file) {
          formData.append("file", file)
        }
        formData.append("message", message)
        formData.append("study_field_id", studyFieldId ? studyFieldId : '0')
        formData.append("chat_id", chatId ? chatId : '0')
        const res: ErrorRes = await createMessage(
          formData
        );
        setMessage("");
        setFile(null) // Clear the file state after sending the message
        if (res.error) {
          const errorMessage = res.error.data.error || "An error occurred."; // Safely access the error message
          PushMessage({ message: errorMessage, role: "bot" });
        }
        if (res.data && res.data.response) {
          PushMessage({ message: res.data.response, role: "bot" });
          if (localStorage.getItem("chat_id") == "0") {
            let id = res.data.chat_id
            localStorage.setItem("chat_id", id as string)
          }
        } else {
          console.error("Response from createMessage is not as expected:", res);
        }
      } catch (error) {
         console.error("Error sending message:", error); // Log the error
      }
    }
  };

  const togglePrompt = () => {
    setIsPromptCollapsed(!isPromptCollapsed);
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

  const setStudyId = (id: number, name: string): void => {
    localStorage.setItem("study_field_id", id.toString());
    localStorage.setItem("study_field_name", name);
    setShowAssistants(false);
    setFieldName(name)
  };

  const [currentChatObj, setCurrentChatObj] = useState<Chat | null>(null);

  const HandleChat = (id: string | number) => {
    const numericId = Number(id);
    localStorage.setItem("chat_id", numericId.toString());
    if (chats) {
      const selectedChat = chatsFromStore.find((chat: Chat) => chat.id === numericId);
      if (selectedChat) {
        setCurrentChatObj(selectedChat);
        SetCurrentChatMessages(selectedChat.messages || []);
        SetField()
      } else {
        setCurrentChatObj(null);
        SetCurrentChatMessages([]);
      }
    }
  };

  const SetField = () => {
    if (currentChatObj && currentChatObj.study_field && fieldsApiData) {
      const field = fieldsApiData?.find((field: field) => field.id === currentChatObj.study_field)
      if (field) { // Add a check if field is found
        localStorage.setItem("study_field_id", currentChatObj.study_field.toString());
        localStorage.setItem("study_field_name", field.name);
        setFieldName(field.name)
      }
    }
  }

  // Simplified or removed handleAttachClick as logic is now in render

  useEffect(() => {
    const storedChatId = localStorage.getItem("chat_id");
    if (storedChatId && chats) {
      HandleChat(storedChatId);
      SetField()
    }
   
  }, [chatsFromStore, chats]); // Added 'chats' to the dependency array

  return (
    <Wrapper>
      {isLoading ?
        <LoadingOverlay>
          <LoadingSpinner />
        </LoadingOverlay> :
        <>
        <MessageWrapper style={{height:"100vh",gap:"4px"}}>
          <ChatWindow isOpen={isSidebarOpen}>
            <NavBlock>
              <StyledButtonChat onClick={() => AddChatLogin(0)}>
                <img src={ChatBtn} alt="Chat" />
              </StyledButtonChat>
              <LogoCont>
                <img src={logo} alt='logo'/>
                <Logo>Guiding Star</Logo>
              </LogoCont>
              <ArrowLeft onClick={toggleSidebar} isCollapsed={isPromptCollapsed}>
                <img src={RightArrow} alt="Toggle Sidebar" />
              </ArrowLeft>
            </NavBlock>
            <Chats>
              {chatsFromStore && chatsFromStore.map((e: Chat) => (
                <DialogItem key={e.id} element={e} handle={HandleChat} /> // Added key prop
              ))}
            </Chats>
          </ChatWindow>
          <DialogWindow isOpen={isSidebarOpen}>
            <Dialog isCollapsed={isPromptCollapsed}>
              <HeaderBlock>
                {!isSidebarOpen && (
                  <ArrowLeft onClick={toggleSidebar} style={{ marginRight: '10px' }}>
                    <img src={RightArrow} alt="Open Sidebar" />
                  </ArrowLeft>
                )}
                {isMobile && (
                  isPromptCollapsed ? (
                    <FieldsBtn onClick={togglePrompt}>Асисстенты</FieldsBtn>
                  ) : (
                    <FieldsBtn onClick={togglePrompt}>Свернуть</FieldsBtn>
                  )
                )}
                {!isMobile && <FieldsBtn>{fieldName || 'Сфера обучения'}</FieldsBtn>}
                <div style={{ display: "flex", gap: "10px", alignItems: "center", marginLeft: !isMobile && isSidebarOpen ? "auto" : "0" }}>
                  <NavLink style={{ textDecoration: "none" }} to={"/tarif"}>
                    <PlanUpped>Улучшить план</PlanUpped>
                  </NavLink>
                  <NavLink to={"/profile"} style={{ cursor: "pointer" }}>
                    <img src={user} alt="User" style={{ width: '24px', height: '24px', display: 'block' }} />
                  </NavLink>
                  {!isMobile && (
                    <CollapseButton
                      isCollapsed={isPromptCollapsed}
                      onClick={togglePrompt}
                    >
                      <img
                        src={RightArrow}
                        alt={isPromptCollapsed ? "Развернуть Prompt" : "Свернуть Prompt"}
                      />
                    </CollapseButton>
                  )}
                </div>
              </HeaderBlock>
              <MessageBlock>
                {/* Привязываем ref к контейнеру сообщений */}
                <Messages ref={messagesEndRef}>
                  {
                    messagesFromStore.map((e, index) => (
                      <MessagesItem key={index} className={e.role === 'bot' ? 'assistant' : ''}>
                        {e.message}
                      </MessagesItem>
                    ))
                  }
                  {SendFetching && (
                    <MessagesItem className="assistant">
                      <LoadingDots />
                    </MessagesItem>
                  )}
                </Messages>
                <div style={{ marginTop: "3px" }} >
                  <InputBlock
                    value={message}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder={currentChatObj ? "Чем помочь?" : "Выберите чат"}
                    disabled={currentChatObj ? false : true}
                  />
                  {
                    currentChatObj ? (
                      <div style={{ display: "flex", alignItems: "center", gap: "3px", marginTop: "5px" }}>
                        {/* Conditionally render Label/Input or Button with onClick */}
                        {file === null ? (
                           <label htmlFor="file-input">
                            <Button as="span" type="button">
                              <img src={screpka} alt="Attach" />Закрепить
                            </Button>
                          </label>
                        ) : (
                           <Button type="button" onClick={() => setFile(null)}>
                             <img src={screpka} alt="Detach" />Открепить
                           </Button>
                        )}

                        <StyledFileInput
                          type="file"
                          id="file-input"
                          onChange={handleFileChange}
                          accept='.pdf,.docx'
                        />
                        <Button onClick={() => sendMessage()}>Отправить</Button>
                        {file && <div>{file.name.length < 25 ? file.name : file.name.slice(0, 25) + "..."}</div>}
                      </div>
                    ) : (
                      <> </>
                    )
                  }
                </div>
              </MessageBlock>
            </Dialog>
            {(!isMobile || !isPromptCollapsed) && (
              <Prompt isCollapsed={isPromptCollapsed}>
                {!isPromptCollapsed && (
                  <>
                    <button onClick={toggleAssistants} style={{
                      background: '#13233D',
                      color: 'white',
                      padding: '10px 15px',
                      borderRadius: '20px',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '14px',
                      transition: 'background-color 0.2s ease',
                      width: '90%',
                      textAlign: 'center'
                    }} >{showAssistants ? 'Скрыть ассистентов' : 'Показать ассистентов'}</button>
                    {showAssistants && (
                      <AssistantsList>
                        {fieldsApiData && fieldsApiData.map((e: field) => (
                          <Asisstant
                            key={e.id}
                            onClick={() => {
                              setStudyId(e.id, e.name);
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
        </MessageWrapper>
          <FooterINN style={{color:"black"}}>
            Артеев Максим Николаевич ИНН - 110406474346
          </FooterINN>
        </>
      }
    </Wrapper>
  );
};

export default LoginApp;