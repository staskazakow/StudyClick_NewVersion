  import React, { useState, useEffect, useRef } from 'react';
  import user from "../../image/User.png";
  import ChatBtn from "../../image/message.png";
  import { useActions } from '../../common/useActions';
  import { useSelector } from 'react-redux';
  import { state } from '../../redux_toolkit/store';
  import { Chat, Message } from '../../redux_toolkit/reducers/ChatSlice';
  import { useGetFieldsQuery } from '../../redux_toolkit/api/fieldsAli';
  import { NavLink } from 'react-router';
  import RightArrow from "../../image/RightArrow.svg"
  import { useCreateMessageMutation, useGetChatsQuery } from '../../redux_toolkit/api/chatsApi';
  import DialogItem from '../Dialog/Dialog';
  import { LoadingOverlay, LoadingSpinner } from '../../App';
  import screpka from "../../image/screpka.png"
  import logo from "../../image/LogoIn.png"
import { ArrowLeft, Asisstant, AssistantsList, breakpoints, Chats, ChatWindow, CollapseButton, Dialog, DialogWindow, Dot, FieldsBtn, HeaderBlock, InputBlock, LoadingDotsContainer, LogoCont, MessageBlock, Messages, MessagesItem, MessageWrapper, MobileSidebar, NavBlock, PlanUpped, Prompt, StyledButtonChat, StyledFileInput, Wrapper } from '../../common/styles/chat.styles';
import { Button, field } from '../../common/styles/chatInput.styles';
  

  interface LoginAppProps { }
  type ErrorRes = { data: any; error?: undefined; } | { data?: undefined; error: any; }
  export const LoadingDots: React.FC = () => (
    <LoadingDotsContainer>
      <Dot />
      <Dot />
      <Dot />
    </LoadingDotsContainer>
  );

  // Define the styled FileInput component here

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
    const [OnSearch,setOnSearch] = useState(false)
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
          if(OnSearch){
            formData.append("use_web","true")
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
        } else {
          setCurrentChatObj(null);
          SetCurrentChatMessages([]);
        }
      }
    };
    // Этот useEffect будет следить за изменениями currentChatObj
  useEffect(() => {
  // Функция SetField будет вызвана только ПОСЛЕ того,
  // как currentChatObj обновится и компонент перерисуется
   if (currentChatObj && currentChatObj.study_field && fieldsApiData) {
     const field = fieldsApiData?.find((field: field) => field.id === currentChatObj.study_field);
      if (field) {
        localStorage.setItem("study_field_id", currentChatObj.study_field.toString());
        localStorage.setItem("study_field_name", field.name);
        setFieldName(field.name);
     }
  }  else if (!currentChatObj) {
    // Опционально: очищаем имя поля, если чат не выбран
     setFieldName('');
  }
}, [currentChatObj, fieldsApiData]); // Зависимости: currentChatObj и fieldsApiData
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
    
    }, [chatsFromStore]); // Added 'chats' to the dependency array
    const SearchQuerry = ( ) => {
        setOnSearch(!OnSearch)
    }
    console.log(fieldName)
    return (
      <Wrapper>
        {isLoading ?
          <LoadingOverlay>
            <LoadingSpinner />
          </LoadingOverlay> :
          <>
          <MessageWrapper style={{height:"100vh"}}>
            <ChatWindow isOpen={isSidebarOpen}>
            {isSidebarOpen ? <NavBlock>
                <StyledButtonChat onClick={() => AddChatLogin(0)}>
                  <img src={ChatBtn} alt="Chat" />
                </StyledButtonChat>
                <LogoCont>
                 <a href="https://mindsy.ru/" target='_blank' rel='noopener noreferrer'>
                  <img src={logo} alt='logo'/>
                  </a>
                </LogoCont>
                <ArrowLeft onClick={toggleSidebar} isCollapsed={isPromptCollapsed}>
                  <img src={RightArrow} alt="Toggle Sidebar" />
                </ArrowLeft>
              </NavBlock> :
              <MobileSidebar>
                <ArrowLeft style={{transform:"rotate(180deg)"}} isOpen={isSidebarOpen} onClick={toggleSidebar} isCollapsed={isPromptCollapsed}>
                  <img src={RightArrow} alt="Toggle Sidebar" />
                </ArrowLeft>
                <LogoCont>
                  <a href="https://mindsy.ru/" target='_blank' rel='noopener noreferrer'>
                  <img src={logo} alt='logo'/>
                  </a>
                </LogoCont>
                <StyledButtonChat onClick={() => AddChatLogin(0)}>
                  <img src={ChatBtn} alt="Chat" />
                </StyledButtonChat>
                </MobileSidebar>}
              {isSidebarOpen ? <Chats>
                {chatsFromStore && chatsFromStore.map((e: Chat) => (
                  <DialogItem key={e.id} element={e} handle={HandleChat} /> // Added key prop
                ))}
              </Chats> : ""}
              
            </ChatWindow>
            <DialogWindow isOpen={isSidebarOpen}>
              <Dialog isCollapsed={isPromptCollapsed}>
                <HeaderBlock>
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
                    <NavLink to={"/profile"} style={{ cursor: "pointer" ,backgroundColor:"#13233D",borderRadius:"30px"}}>
                      <img src={user} alt="User" style={{ width: '29px', height: '29px', display: 'block',padding:"4px" }} />
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
                      disabled={SendFetching ? true : false}
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
                          {OnSearch ? <Button onClick={() => SearchQuerry()} style={{backgroundColor:"#3A4F99"}}>Поиск</Button>:
                          <Button onClick={() => SearchQuerry()} style={{backgroundColor:"white"}}>Поиск</Button>
                          }
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
          </>
        }
      </Wrapper>
    );
  };

  export default LoginApp;