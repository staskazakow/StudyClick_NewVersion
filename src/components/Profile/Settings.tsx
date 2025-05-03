import React, { useState } from 'react'
import styled from 'styled-components'
import { SettingsButton } from './Profile'
import close from "../../image/close.png"
import { NavLink } from 'react-router'
import { Wrapper } from '../LoginApp/LoginApp'
const SettingsWrapper = styled.div`
margin-left: 20px;
margin-top: 20px;
margin-right:20px;
width:90vw;
`
const HeaderSettings = styled.div`
display:flex;
align-items:center;
justify-content:space-between;
margin-bottom:70px;
`
const BodySettings = styled.div`
display:flex;
`
const EmailBlock = styled.div`
display:flex;
flex-direction:column;
gap:20px;
`
const PassBlock = styled.div`

`
const AccountWrapper = styled.div`
display:flex;
width:40vw;
justify-content: space-between;
align-items:center;
`
const DeleteBtn = styled.div`
padding:20px;
background:#D83737;
border-radius:40px;
cursor:pointer;
`
const Subscribe = styled.div`
padding:20px 25px;
background:#D1D871;
cursor:pointer;
border-radius:20px;
margin-top:30px;
display:flex;
justify-content: center;
`
export const CloseBtn = styled.img`
width:50px;
height:50px;
color:black;
`
const Settings = () => {
    const [account,setAccount] = useState(false)
    const [pass,setPass] = useState(false)
    const mail = "hokon96977@motivue.com"
    const handleAccount = () =>{
        setAccount(true)
        setPass(false)
    }
    const handlePass = () =>{
        setAccount(false)
        setPass(true)
    }
  return (
    <Wrapper>

    <SettingsWrapper>
            <HeaderSettings>
                <div style={{fontSize:"30px",color:"black"}}>Настройки</div>
                <NavLink to={"/profile"}>
                    <CloseBtn src={close} alt="" />
                    </NavLink>
            </HeaderSettings>
            <BodySettings>
                <div style={{marginRight:"150px"}}>
                    <SettingsButton style={{width:"max-content"}} onClick={() => handleAccount()}>Аккаунт</SettingsButton>
                    <SettingsButton style={{width:"max-content"}} onClick={() => handlePass()}>Подписка</SettingsButton>
                </div>
                {account &&
                <EmailBlock>
                    <AccountWrapper>
                        <div>Почта:</div>
                        <div>{mail}</div>
                    </AccountWrapper>
                    <AccountWrapper>
                        <div>Удалить аккаунт</div>
                        <DeleteBtn>Удалить</DeleteBtn>
                    </AccountWrapper>
                </EmailBlock>
                }
                {pass &&
                <PassBlock>
                    <div>У вас пока нет подписок</div>
                    <Subscribe>Подписаться</Subscribe>
                </PassBlock>
                }
            </BodySettings>
            </SettingsWrapper>
    </Wrapper>
  )
}

export default Settings