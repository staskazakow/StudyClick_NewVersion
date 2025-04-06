import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  justify-content: center; // Центрирование по горизонтали
`;

const InputContainer = styled.div`

  background-color: #ffffff; // Цвет фона инпут-контейнера
  border-radius: 20px;
  padding: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%; // Занимает полную ширину доступного пространства
  max-width: 600px; // Ограничение ширины
`;

const TextArea = styled.textarea<{ hasFocus: boolean }>`
  flex: 1;
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
  background-color: #007bff; // Цвет кнопок
  color: white; 
  border: none;
  border-radius: 15px; 
  padding: 10px 15px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3; 
  }

  @media (max-width: 600px) {
    padding: 8px 12px;
    font-size: 14px; 
  }
`;

const FileInput = styled.input`
  display: none; // Скрытый инпут для загрузки файлов
`;

const ChatInput: React.FC = () => {
  const [input, setInput] = useState('');
  const [hasFocus, setHasFocus] = useState(false); // Состояние фокуса
  const [fileName, setFileName] = useState<string | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null); // Реф для textarea

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
      textAreaRef.current.style.height = `${Math.min(textAreaRef.current.scrollHeight, 300)}px`;
    }
  }, [input]); // Обновление каждый раз, когда изменяется input

  return (
    <PageContainer>
      <InputContainer>
        <TextArea 
          ref={textAreaRef} // Привязываем реф
          value={input} 
          onChange={handleChange} 
          placeholder="Спросите, я постараюсь помочь..." 
          hasFocus={hasFocus} 
          onFocus={() => setHasFocus(true)} 
          onBlur={() => setHasFocus(false)} 
          rows={1} // Начальное количество строк
        />
        <div>

        <FileInput 
          type="file" 
          id="file-input" 
          onChange={handleFileChange} 
        />
        <Button type="button" onClick={handleAttachClick}>Прикрепить</Button>
        {fileName && <span style={{ marginLeft: '10px',color:"black" }}>{fileName}</span>}
        <Button>Помощник</Button>
        </div>
      </InputContainer>
    </PageContainer>
  );
};

export default ChatInput;
