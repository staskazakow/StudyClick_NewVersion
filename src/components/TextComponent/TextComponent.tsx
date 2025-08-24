import React from "react";
import { MessagesItem } from "../../common/styles/chat.styles";
import { Message } from "../../redux_toolkit/reducers/ChatSlice";

interface Props {
  text: string;
  element: Message;
}

const TextComponent: React.FC<Props> = ({ text, element }) => {
  // 1. Регулярное выражение для поиска жирного текста (**text**)
  const boldRegex = /(\*\*.*?\*\*)/g;

  // 2. Разделяем весь текст на отдельные строки (абзацы)
  const lines = text.split("\n");

  return (
    <MessagesItem className={element.role === 'bot' ? 'assistant' : ''}>
      {/* 3. Отображаем каждую строку в отдельном теге <p> */}
      {lines.map((line, index) => (
        <p key={index}>
          {/* 4. Каждую строку дополнительно разбираем на обычные и жирные части */}
          {line.split(boldRegex).filter(part => part).map((part, partIndex) => {
            // 5. Проверяем, является ли часть жирным текстом
            if (part.startsWith('**') && part.endsWith('**')) {
              // Если да, убираем звездочки и оборачиваем в <strong>
              return <strong key={partIndex}>{part.slice(2, -2)}</strong>;
            }
            // Если это обычный текст, просто возвращаем его
            return part;
          })}
        </p>
      ))}
    </MessagesItem>
  );
};

export default TextComponent;