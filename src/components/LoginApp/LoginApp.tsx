import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import user from "../../image/User.png";
import { ButtonChat } from '../Header/Header';
import ChatBtn from "../../image/message.png";
import Left from "../../image/BackArrow.png";
import { useActions } from '../../common/useActions';
import { useSelector } from 'react-redux';
import { state } from '../../redux_toolkit/store';
import { Chat } from '../../redux_toolkit/reducers/ChatSlice';

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #B2CEE2;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
  }
`;

const ChatWindow = styled.div`
  width: 20vw;
  min-width: 250px;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  background-color: #ECECE5;
  border-radius: 30px;
  margin: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  @media (max-width: 768px) {
    width: calc(100% - 40px);
    max-width: none;
    min-width: 0;
    margin: 10px 20px;
    height: auto;
    max-height: 40vh;
  }
`;

const NavBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
`;

const Logo = styled.div`
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
`;

const ArrowLeft = styled.div`
  cursor: pointer;
  transition: opacity 0.2s;
  &:hover {
    opacity: 1;
  }
`;

const Chats = styled.div`
  flex-grow: 1;
  color: #333;
  padding: 20px;
  overflow-y: auto;
  & > div {
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    background-color: #ECECE5;
    cursor: pointer;
    transition: background-color 0.2s;
    &:hover {
      background-color: #eee;
    }
  }
`;

const DialogWindow = styled.div`
  margin: 20px;
  width: 75vw;
  height: 95vh;
  border-radius: 30px;
  background-color: #ECECE5;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  overflow: hidden;
  @media (max-width: 768px) {
    width: calc(100% - 40px);
    height: auto;
    min-height: 50vh;
    margin: 0 20px 20px;
    flex-direction: column;
  }
`;

const Dialog = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  flex-grow: 1;
  overflow-y: auto;
  border-right: 1px solid black;
  @media (max-width: 768px) {
    border-right: none;
    border-bottom: 1px solid black;
  }
`;

const Prompt = styled.div`
  width: 200px;
  padding: 20px;
  border-left: 1px solid #eee;
  @media (max-width: 768px) {
    width: 100%;
    border-left: none;
    padding: 10px 20px;
  }
`;

const StyledButtonChat = styled(ButtonChat)`
  border: none;
  cursor: pointer;
`;

const MessageBlock = styled.div`
  display: flex;
  height: 80vh;
  flex-direction: column;
  justify-content: flex-end;
  @media (max-width: 768px) {
    height: auto;
    min-height: 40vh;
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
`;

const FieldsBtn = styled.div`
  padding: 3px 10px;
  background: #D9D9D9;
  border-radius: 30px;
  font-family: Inter;
  line-height: 100%;
  letter-spacing: 0%;
  color: black;
`;

const PlanUpped = styled.div`
  padding: 4px 10px;
  background-color: #13233D;
  border-radius: 30px;
`;

const Messages = styled.div`
  overflow-y: auto;
  flex-grow: 1;
  margin-bottom: 10px;
`;

const LoginApp = () => {
  const [message, setMessage] = useState("");
  const { AddMessage } = useActions();
  const sendMessage = () => {
    if (message.trim() !== "") {
      AddMessage({ describe: message, role: "user" });
      setMessage("");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

 const message_data: Array<Chat> = useSelector((state: state) => state.chat.messages_data);
  console.log("render")
  // console.log(message_data)

  return (
    <Wrapper>
      <ChatWindow>
        <NavBlock>
          <StyledButtonChat>
            <img src={ChatBtn} alt="Chat" />
          </StyledButtonChat>
          <Logo>Guiding Star</Logo>
          <ArrowLeft>
            <img src={Left} alt="Back" />
          </ArrowLeft>
        </NavBlock>
        <Chats>
          <div>Chat 1</div>
          <div>Chat 2</div>
          <div>Chat 3</div>
          <div>Chat 3</div>

        </Chats>
      </ChatWindow>
      <DialogWindow>
        <Dialog>
          <HeaderBlock>
            <FieldsBtn>Сфера обучения</FieldsBtn>
            <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
              <PlanUpped>Улучшить план</PlanUpped>
              <div>
                <img src={user} alt="User" />
              </div>
            </div>
          </HeaderBlock>
          <MessageBlock>
            <Messages>
              {message_data.length > 0 ? (
                message_data.map((e) => (
                  <div>{e.describe}</div>
                ))
              ) : (
                <div>Сообщений не найдено</div>
              )}
            </Messages>
            <InputBlock
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Чем помочь?"
            />


          </MessageBlock>
        </Dialog>
        <Prompt>
          <h4>Assistant Info</h4>
          <p>Some helpful prompts...</p>
        </Prompt>
      </DialogWindow>
    </Wrapper>
  );
};

export default LoginApp;
