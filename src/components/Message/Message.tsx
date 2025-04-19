import React from 'react'
import styled from 'styled-components'
interface Props {
    message:string,
    role:any
}
const Wrapper = styled.div`
display:flex;

`
const UserMessage = styled.div`
display:flex;
justify-content: flex-end;
min-height:20px;
background:#041839 ;
margin-bottom:3px;
`
const BotMessage = styled(UserMessage)`
justify-content: flex-start;
`
const Message = ({role,message}:Props) => {
  console.log(role)
  return (
    <div>
      {role == "user" ? <UserMessage>{message}</UserMessage> : <BotMessage>{message}</BotMessage>}
    </div>
    
  )
}

export default Message