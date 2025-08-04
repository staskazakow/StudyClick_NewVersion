import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import screpka from "../../image/screpka.png";
import helper from "../../image/helper.png";
import micro from "../../image/microphon.png";
import { NavLink } from 'react-router'; // Используем react-router-dom для NavLink
import { useSpeechRecognition } from 'react-speech-recognition';
// --- (Импорты для Redux и API остаются без изменений) ---
import { useActions } from '../../common/useActions';
import { Message as MessageInterface } from '../../redux_toolkit/reducers/ChatSlice';
import { useSelector } from 'react-redux';
import { state } from '../../redux_toolkit/store';
import Message from '../Message/Message';
import { useCreateMessageNoLoginMutation, useGetFieldsQuery } from '../../redux_toolkit/api/fieldsAli';
import { LoadingDots} from '../LoginApp/LoginApp';
import stop from "../../image/stop.png"
import { MessagesItem, MessageWrapper } from '../../common/styles/chat.styles';
import { BtnWrapper, Button, field, FileInput, FooterChatInput, HelperButton, HelperDropdown, Info, InputContainer, InputDecor, PageContainer, Search, TextArea } from '../../common/styles/chatInput.styles';
import Footer from '../Footer/Footer';
// --- Styled Components с адаптивными стилями ---



// --- Компонент React ---

const ChatInput: React.FC = () => {
    const message_data: Array<MessageInterface> = useSelector((state: state) => state.chat.messages_data);
    const [input, setInput] = useState('');
    const [hasFocus, setHasFocus] = useState(false);
    const [file, setFile] = useState<null | File>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const { AddMessage } = useActions();
    const [isHelperOpen, setIsHelperOpen] = useState(false);
    const [onSearch,setOnSearch] = useState(false)
    const { data } = useGetFieldsQuery();
    const [helperButtonText, setHelperButtonText] = useState("Помощник");
    const [createMessage, { isLoading: SendFetching }] = useCreateMessageNoLoginMutation();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const {transcript} = useSpeechRecognition()
    const [isRecording,setIsRecording] = useState(false)
    const recognitionRef = useRef<any | null>(null);
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if(transcript){
            setInput(transcript + e.target.value);
        }
        setInput(e.target.value)
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };
    const handleAttachClick = () => {
        const fileInput = document.getElementById('file-input');
        if (file) {
             setFile(null);
        } else if (fileInput) {
            fileInput.click();
        }
    };
 useEffect(() => {
  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = 'ru-RU';
    recognition.interimResults = true;
    recognition.continuous = false;
    recognitionRef.current = recognition;

    recognition.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript;
          }
        }
      
        if (finalTranscript) {
          setInput(prev => prev + finalTranscript + ' ');
        }
      };

    recognition.onerror = (event: any) => {
      console.error('Ошибка распознавания речи:', event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };
  } else {
    console.warn('SpeechRecognition API не поддерживается в этом браузере.');
  }
}, []);

const toggleRecording = () => {
  if (!recognitionRef.current) {
    alert('Ваш браузер не поддерживает распознавание речи');
    return;
  }

  if (isRecording) {
    recognitionRef.current.stop();
    setIsRecording(false);
  } else {
    try {
      recognitionRef.current.start();
      setIsRecording(true);
    } catch (e) {
      console.error('Ошибка при запуске распознавания:', e);
    }
  }
};

     useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';
            textAreaRef.current.style.height = `${Math.min(textAreaRef.current.scrollHeight, 200)}px`; // Max height for textarea
        }
    }, [input]);
    const sendMessage = async () => {
        if (input.trim() !== "" || file) {
            const formData = new FormData();
            if (file) {
                formData.append("file", file);
            }
            formData.append("message", input);
            formData.append("study_field_id", localStorage.getItem("study_field_id") || "15");
            formData.append("chat_id", "0");
            if (onSearch) {
                formData.append("use_web","true")
            }
            AddMessage({ message: input, role: "user" });
            setInput("");
            setFile(null);
            setOnSearch(false)
            try {
                const res = await createMessage(formData).unwrap();
                AddMessage({ message: res.response, role: "bot" });
            } catch (error) {
                AddMessage({ message: (error as any).data.error, role: "bot" });
            }
        }
    };
    const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    };
    const toggleHelper = () => setIsHelperOpen(!isHelperOpen);
    const setStudyId = (id: number, name: string) => {
        localStorage.setItem("study_field_id", id.toString());
        localStorage.setItem("study_field_name", name);
        setHelperButtonText(name);
        setIsHelperOpen(false); // Закрываем дропдаун после выбора
    };
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    }, [message_data]);
    const SearchQuerry = ( ) => {
        setOnSearch(!onSearch)
    }
    return (
        <PageContainer>
            <MessageWrapper ref={messagesEndRef}>
                {message_data.map((e, index) => (
                    <Message key={index} role={e.role} message={e.message} />
                ))}
                {SendFetching && (
                    <MessagesItem>
                        <LoadingDots />
                    </MessagesItem>
                )}
            </MessageWrapper>

            <InputContainer>
                <TextArea
                    ref={textAreaRef}
                    value={input}
                    onChange={handleChange}
                    placeholder="Спросите, я постараюсь помочь..."
                    hasFocus={hasFocus}
                    onFocus={() => setHasFocus(true)}
                    onBlur={() => setHasFocus(false)}
                    onKeyDown={handleKeyPress}
                    rows={1}
                />
                <BtnWrapper>
                    <FileInput type="file" id="file-input" onChange={handleFileChange} accept='.pdf,.docx' />
                    <Button type="button" onClick={handleAttachClick}>
                        <img src={screpka} alt="Attach" />
                        {file ? "Открепить" : "Прикрепить"}
                    </Button>
                    {file && (
                        <span style={{ color: "black", fontSize: "12px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100px" }}>
                            {file.name}
                        </span>
                    )}
                    <HelperButton onClick={toggleHelper}>
                        <img src={helper} alt="Helper" style={{ width: "18px", height: "18px" }} />
                        <div>{localStorage.getItem("study_field_name") || helperButtonText} ▼</div>
                        <HelperDropdown isOpen={isHelperOpen}>
                            <ul>
                                {data?.map((e: field) => (
                                    <li key={e.id} onClick={() => setStudyId(e.id, e.name)}>{e.name}</li>
                                ))}
                            </ul>
                        </HelperDropdown>
                    </HelperButton>
                    <Button onClick={sendMessage}>Отправить</Button> {/* Заменил Search на Button, так как у них одинаковая стилизация и функционал */}
                    {onSearch ?  
                    <Search onClick={() => SearchQuerry()} style={{background:"#D1D871"}}>Поиск</Search> :
                     <Search onClick={() => SearchQuerry()}>Поиск</Search>
                    }
                    {isRecording ? 
                    <img src={stop} onClick={toggleRecording} alt="Голос" style={{background:"black", width: "20px", height: "20px", cursor: "pointer" }} />
                    :
                    <img src={micro} onClick={toggleRecording} alt="Голос" style={{ width: "20px", height: "20px", cursor: "pointer" }} />
                }
                </BtnWrapper>
            </InputContainer>

            <InputDecor>
                <Info>🔍 Поиск по интернету</Info>
                <Info>📂 Работа с файлами</Info>
                <Info>🖼️ Распознавание изображений</Info>
                <Info>🎙️ Ввод голосом</Info>
            </InputDecor>

            <FooterChatInput>
                <NavLink to="/about">О нас</NavLink>
                <NavLink to="/terms">Условия</NavLink>
                <NavLink to='/support'>Поддержка</NavLink>
                <NavLink to="/price">Цена</NavLink>
            </FooterChatInput>
        </PageContainer>
    );
};

export default ChatInput;