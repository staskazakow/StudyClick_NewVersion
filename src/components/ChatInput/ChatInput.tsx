import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import screpka from "../../image/screpka.png"
import helper from "../../image/helper.png"
import { useActions } from '../../common/useActions';
import { Chat } from '../../redux_toolkit/reducers/ChatSlice';
import { useSelector } from 'react-redux';
import { state } from '../../redux_toolkit/store';
import Message from '../Message/Message';
const PageContainer = styled.div`
  display: flex;
  justify-content: center; // Центрирование по горизонтали
  align-items: center;
  flex-direction:column;
  height:80vh;
  justify-content: flex-end
`;

const InputContainer = styled.div`

  background-color:#ECECE5; // Цвет фона инпут-контейнера
  border-radius: 20px;
  padding: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 600px; // Занимает полную ширину доступного пространства
  max-width: 600px; // Ограничение ширины
`;

const TextArea = styled.textarea<{ hasFocus: boolean }>`
  flex: 1;
  background-color:#ECECE5;
  width:90%;
  border: none; // Убираем границы
  outline: none; // Убираем обводку вокруг элемента
  border-radius: 20px;
  padding: 10px;
  margin:auto;
  font-size: 16px;
  margin-bottom:20px;
  
  resize: none; // Запрет изменения размера textarea
  overflow-y: auto; // Скрываем скролл для не заполненного textarea
  max-height: 300px; // Максимальная высота textarea
  box-shadow: ${({ hasFocus }) => (hasFocus ? '0 0 5px #007bff' : 'none')}; // Добавляем тень при фокусе

  @media (max-width: 600px) {
    padding: 8px;
    font-size: 14px;
  }
`;

const Button = styled.button`
  background-color: #C3BFBF; // Цвет кнопок
  color: #000000; 
  border: none;
  border-radius: 15px; 
  padding: 10px 15px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;
  display:flex;
  align-items: center;
  gap:3px;
  &:hover {
    transform:scale(1.05) 
  }
 

  @media (max-width: 600px) {
    padding: 8px 12px;
    font-size: 14px; 
  }
`;

const FileInput = styled.input`
  display: none; // Скрытый инпут для загрузки файлов
`;
const BtnWrapper = styled.div`
display:flex;
gap:11px
`
interface el{
  key:string
}
const ChatInput: React.FC = () => {
  const message_data:Array<Chat> = useSelector((state:state) => state.chat.messages_data)
  const [input, setInput] = useState('');
  const [hasFocus, setHasFocus] = useState(false); // Состояние фокуса
  const [fileName, setFileName] = useState<string | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null); // Реф для textarea
  const {AddMessage} = useActions()
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleAttachClick = () => {
    document.getElementById('file-input')?.click(); // Программно открываем скрытый input
  };

  // Функция для динамического изменения высоты текста
  useEffect(() => {
    if (textAreaRef.current) {
      // Сбрасываем высоту
      textAreaRef.current.style.height = 'auto'; 
      // Устанавливаем высоту в зависимости от содержимого
      textAreaRef.current.style.height = `${Math.min(textAreaRef.current.scrollHeight, 150)}px`;
    }
  }, [input]); // Обновление каждый раз, когда изменяется input
  const sendMessage = () => {
    AddMessage({desc:input,role:"user"})
    setInput("")
  }
  const handleKeyPress = useCallback((event:el) => {
    if (event.key === "Enter") {
      sendMessage();
      setInput("")

    }
  }, [sendMessage]);
  return (
    <PageContainer>
      <div>{message_data.map((e) => <Message message={e.describe}/>)}</div>
      <InputContainer>
        <TextArea 
          ref={textAreaRef} // Привязываем реф
          value={input} 
          onChange={handleChange} 
          placeholder="Спросите, я постараюсь помочь..." 
          hasFocus={hasFocus} 
          onFocus={() => setHasFocus(true)} 
          onBlur={() => setHasFocus(false)} 
          onKeyUp={handleKeyPress}
          rows={1} // Начальное количество строк
        />
        <div>

        <FileInput 
          type="file" 
          id="file-input" 
          onChange={handleFileChange} 
        />
        <BtnWrapper>
        <Button type="button" onClick={handleAttachClick}><img src={screpka}/>Прикрепить</Button>
        {fileName && <span style={{ marginLeft: '2px',color:"black", display:"flex",alignItems:"center" }}>{fileName}</span>}
        <Button><img src={helper} alt="" />Помощник</Button>
        <Button onClick={sendMessage}>Отправить</Button>
        </BtnWrapper>
        </div>
      </InputContainer>
    </PageContainer>
  );
};

export default ChatInput;
