import React from 'react'
import styled from 'styled-components'
interface Props {
  message:string
}
const Wrapper = styled.div`
width:
`
const Message = ({message}:Props) => {
  return (
    <div>
      {message}
    </div>
  )
}

export default Message