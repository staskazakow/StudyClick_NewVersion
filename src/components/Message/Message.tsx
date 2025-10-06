import React from 'react';
import styled from 'styled-components';

interface Props {
  message: string;
  role: 'user' | 'bot' | string; // Use more specific type if possible
}

// Common styles for message bubbles
const MessageBubble = styled.div<{role : string}>`
  min-height: 20px;
  margin-bottom: 8px; // Spacing between messages
  padding: 10px 14px; // Padding inside the bubble
  border-radius: 18px; // Overall rounded corners
  max-width: 75%; // Limit bubble width
  word-wrap: break-word; // Prevent long words from overflowing
  box-shadow: 0 1px 0.5px rgba(0, 0, 0, 0.13); // Subtle shadow
  display: inline-block; // Allow bubble to only take necessary width
  ${({role}) => 
    role === "bot" &&
  `
    color: white; // Black text for bot message
    margin-right: auto; // Keep message on the left
    margin-left: 8px; // Small margin from the left edge of container
  `}
  ${({role}) =>
    role === "user" &&
  `
  background-color: #0b93f6; // Blue background for user
  color: white; // White text for user message
  margin-left: auto; // Push message to the right
  margin-right: 8px; // Small margin from the right edge of container
  border-bottom-right-radius: 2px; // Sharpen bottom-right corner
  `
  }
  .user{

  }
  @media (max-width: 767px) {
  font-size:16px;
  color:white;
  }
`;


const MessageContainer = styled.div`
  display: flex; // Use flexbox for alignment
`;

const Message = ({ role, message }: Props) => {
    const boldRegex = /(\*\*.*?\*\*)/g;
    // 2. Разделяем весь текст на отдельные строки (абзацы)
    const lines = message.split("\n");
  return (
    <MessageContainer>
      {/* {role === "user" ? (
        <UserMessage>{message}</UserMessage>
      ) : (
        <BotMessage>{message}</BotMessage>
      )} */}
      <MessageBubble role={role}>
        {lines.map((line, index) => (
        <p key={index}>
          {line.split(boldRegex).filter(part => part).map((part, partIndex) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={partIndex}>{part.slice(2, -2)}</strong>;
            }
            // Если это обычный текст, просто возвращаем его
            return part;
          })}
        </p>
      ))}
      </MessageBubble>
    </MessageContainer>
  );
};

export default Message;
