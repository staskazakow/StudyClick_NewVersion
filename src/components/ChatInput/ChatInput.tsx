import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import screpka from "../../image/screpka.png";
import helper from "../../image/helper.png";
import { useActions } from '../../common/useActions';
import { Chat } from '../../redux_toolkit/reducers/ChatSlice';
import { useSelector } from 'react-redux';
import { state } from '../../redux_toolkit/store';
import Message from '../Message/Message';
import { useGetFieldsQuery } from '../../redux_toolkit/api/fieldsAli';

const PageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height:45vh; /* Use min-height for better responsiveness */
    justify-content: flex-end;
    border-radius: 20px;
    padding: 10px; /* Add padding for smaller screens */
    box-sizing: border-box; /* Include padding in width/height */
`;

const InputContainer = styled.div`
    background-color: #ECECE5;
    border-radius: 20px;
    padding: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    width: 100%; /* Take full width */
    max-width: 600px; /* Limit max width */
    box-sizing: border-box; /* Include padding in width/height */
`;

export const TextArea = styled.textarea<{ hasFocus: boolean }>`
    flex: 1;
    background-color: #ECECE5;
    width: 100%; /* Take full width */
    border: none;
    outline: none;
    border-radius: 20px;
    padding: 10px;
    margin: auto;
    font-size: 16px;
    margin-bottom: 20px;
    resize: none;
    overflow-y: auto;
    max-height: 300px;
    box-shadow: ${({ hasFocus }) => (hasFocus ? '0 0 5px #007bff' : 'none')};
    box-sizing: border-box; /* Include padding in width/height */

    @media (max-width: 600px) {
        padding: 8px;
        font-size: 14px;
    }
`;

const Button = styled.button`
    background-color: #C3BFBF;
    color: #000000;
    border: none;
    border-radius: 15px;
    padding: 10px 15px;
    cursor: pointer;
    font-size: 16px;
    transition: 0.3s;
    display: flex;
    align-items: center;
    gap: 3px;

    &:hover {
        transform: scale(1.05);
    }

    @media (max-width: 600px) {
        padding: 8px 12px;
        font-size: 14px;
    }
`;

const FileInput = styled.input`
    display: none;
`;

const BtnWrapper = styled.div`
    display: flex;
    gap: 11px;
    position: relative; /* Add relative positioning */
    flex-wrap: wrap; /* Allow buttons to wrap on smaller screens */
    justify-content: flex-start; /* Align buttons to the start */
`;

const MessageWrapper = styled.div`
    width: 100%; /* Take full width */
    max-width: 670px; /* Limit max width */
    word-break: break-all;
    height: 800px;
    overflow: auto;
    margin-bottom: 5px;
    box-sizing: border-box; /* Include padding in width/height */
`;

// Define the interface for HelperDropdown props
interface HelperDropdownProps {
    isOpen: boolean;
}

const HelperDropdown = styled.div<HelperDropdownProps>`
    position: absolute;
    bottom: 100%; /* Position above the button */
    right: 0;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    z-index: 10;
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    padding: 5px;
    min-width: 150px; /* Minimum width for the dropdown */
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    li {
        padding: 5px 10px;
        cursor: pointer;
        &:hover {
            background-color: #f0f0f0;
        }
    }
`;

interface el {
    key: string;
}
export interface field {
    id: number,
    name: string
}

const HelperButton = styled(Button)`
  position: relative;
  display: inline-block;
`;

const ChatInput: React.FC = () => {
    const message_data: Array<Chat> = useSelector((state: state) => state.chat.messages_data);
    const [input, setInput] = useState('');
    const { SetFieldName } = useActions()
    const [hasFocus, setHasFocus] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const { AddMessage } = useActions();
    const [isHelperOpen, setIsHelperOpen] = useState(false); // State for the helper dropdown
    const { data } = useGetFieldsQuery()
    const [helperButtonText, setHelperButtonText] = useState("Помощник");

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
        }
    };

    const handleAttachClick = () => {
        document.getElementById('file-input')?.click();
    };

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';
            textAreaRef.current.style.height = `${Math.min(textAreaRef.current.scrollHeight, 150)}px`;
        }
    }, [input]);

    const sendMessage = () => {
        if (input.trim() !== "") {
            AddMessage({ describe: input, role: "user" });
            setInput("");
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
       if (event.key === "Enter" && !event.shiftKey) {  // shift+Enter для новой строки
         event.preventDefault();
         sendMessage();
       }
     };

    const toggleHelper = () => {
        setIsHelperOpen(!isHelperOpen);
    };

    const setStudyId = (id: number, name: string) => {
        localStorage.setItem("study_field_id", id.toString())
        localStorage.setItem("study_field_name", name)
        setHelperButtonText(name)
    }

    return (
        <PageContainer>
            <MessageWrapper>
                {message_data.map((e) => (
                    <Message role={e.role} message={e.describe} />
                ))}
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
                    onKeyDown={handleKeyPress}  // Важно: onKeyDown!
                    rows={1}
                />

                <div>
                    <FileInput
                        type="file"
                        id="file-input"
                        onChange={handleFileChange}
                    />
                    <BtnWrapper>
                        <Button type="button" onClick={handleAttachClick}>
                            <img src={screpka} alt="Attach" />Прикрепить
                        </Button>
                        {fileName && (
                            <span style={{ marginLeft: '2px', color: "black", display: "flex", alignItems: "center" }}>
                                {fileName}
                            </span>
                        )}
                        <HelperButton onClick={toggleHelper}>
                            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                <img src={helper} alt="Helper" />
                                <div>{localStorage.getItem("study_field_name") ? localStorage.getItem("study_field_name") : helperButtonText}</div>
                            </div>
                            <HelperDropdown isOpen={isHelperOpen}>
                                <ul>

                                    {data && data.map((e: field) => {
                                        return <li key={e.id} onClick={() => setStudyId(e.id, e.name)}>{e.name}</li>
                                    })}
                                </ul>
                            </HelperDropdown>
                        </HelperButton>
                        <Button onClick={sendMessage}>Отправить</Button>
                    </BtnWrapper>
                </div>
            </InputContainer>
        </PageContainer>
    );
};

export default ChatInput;
