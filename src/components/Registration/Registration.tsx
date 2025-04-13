import React, { ReactEventHandler, useState } from 'react'
import BackArrow from "../../image/BackArrow.png"
import styled from 'styled-components'
import { NavLink } from 'react-router'
const RegForm = styled.form`
display:flex;
flex-direction:column;
width:400px;
background:#181818;
height:600px;
justify-content: center;
align-items: center;

`
const RegInput = styled.input`
width:200px;


`
const Wrapper = styled.div`
display:flex;
height:100vh;
width:100vw;
justify-content: center;
align-items: center;
`
const InputWrapper = styled.div`
display:flex;
flex-direction:column;

`
const Title = styled.div`
font-size:20px;
display:flex;
`
const Registration = () => {
    let [email,setEmail] = useState<string>()
    let [password,setPassword] = useState<string>()
    return (
        <Wrapper>
                <NavLink style={{marginRight:"5px"}} to={"/"}><img src={BackArrow} /></NavLink>
            <RegForm onSubmit={e => e.preventDefault()}>
                <Title>Авторизируйтесь чтобы продолжить</Title>
                <InputWrapper>
                <RegInput value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email or number' />
                <RegInput value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                <button>Registration</button>
                </InputWrapper>
            </RegForm>

        </Wrapper>
    )
}

export default Registration