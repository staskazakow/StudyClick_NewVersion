import React, { useState } from 'react'
import { Wrapper } from '../LoginApp/LoginApp'
import user from "../../image/User.png";
import styled from 'styled-components';
import { NavLink } from 'react-router';
import close from "../../image/close.png"
import { CloseBtn } from './Settings';
import { useLogOutMutation } from '../../redux_toolkit/api/authApi';
import { useActions } from '../../common/useActions';
import { LoadingOverlay, LoadingSpinner } from '../../App';
const UserLogo = styled.img`
width:120px;
height:120px;
margin-bottom:40px;
`
const Email = styled.div`
color:black;
font-weight:400;
font-size:30px;
`
const Tokens = styled(Email)`
font-size:20px;
`
export const SettingsButton = styled.div`
transition:0.3s;
color:black;
font-family:Inter;
font-size:30px;
margin-bottom:35px;

&:hover{
    color:white;
    background:#13233D;
    width:100%;
    padding:4px;
    border-radius:10px;
    cursor:pointer;
}
`
const ProfileWrapper = styled.div`
margin-left:20px;
margin-top:20px;
margin-right:20px;
display:flex;
flex-direction: column;
align-items: flex-start;
`


const Profile = () => {
    const [logOut, { isLoading }] = useLogOutMutation()
    const { setAuth } = useActions()
    const HandleLogout = () => {
        logOut()
        setAuth(false)
    }
    return (
        <Wrapper style={{ justifyContent: "space-between" }}>
            {isLoading ? <LoadingOverlay>
                <LoadingSpinner />
            </LoadingOverlay> :
                <div>
                    <NavLink to={"/"}>
                        <CloseBtn style={{ marginRight: "30px", marginTop: "30px" }} src={close} alt="" />
                    </NavLink>
                    <ProfileWrapper>
                        <div style={{ display: "flex", alignItems: "center", flexDirection: "column", marginBottom: "8px" }}>
                            <UserLogo src={user} alt="" />
                            <Email>hokon96977@motivue.com</Email>
                            <Tokens>21 000 токенов </Tokens>
                        </div>
                        <SettingsButton>Нет подписки</SettingsButton>
                        <SettingsButton><NavLink style={{ color: "black", textDecoration: 'none', }} to={"/settings"}>Настройки</NavLink></SettingsButton>
                        <SettingsButton>Написать в поддержку</SettingsButton>
                        <SettingsButton>Новости</SettingsButton>
                        <SettingsButton onClick={() => HandleLogout()}>Выйти</SettingsButton>
                    </ProfileWrapper>
                </div>

            }

        </Wrapper>
    )
}

export default Profile