import React from 'react';
import user from "../../image/user-icon.png";
import { NavLink } from 'react-router';
import close from "../../image/close.png"
import { useGetUserQuery, useLogOutMutation } from '../../redux_toolkit/api/authApi';
import { useActions } from '../../common/useActions';
import { LoadingOverlay, LoadingSpinner } from '../../App';
import { CloseBtn, CloseButtonWrapper, ContentContainer, Email, ProfileHeader, ProfileWrapper, SettingsButton, SettingsButtonPass, Tokens, UserLogo, Wrapper } from '../../common/styles/profile.style';

const Profile = () => {
    const [logOut, { isLoading: isLoggingOut }] = useLogOutMutation();
    const { setAuth } = useActions();
    const { data: userInfo, isLoading: isGettingUser } = useGetUserQuery(undefined);
    const HandleLogout = async () => {
        await logOut(); // Use async/await with logOut mutation
        setAuth(false);
    };
    const isLoading = isLoggingOut || isGettingUser;
    return (
        <Wrapper>
            {isLoading ? (
                <LoadingOverlay>
                    <LoadingSpinner />
                </LoadingOverlay>
            ) : (
                <ContentContainer>
                    <CloseButtonWrapper to={"/"}>
                        <CloseBtn src={close} alt="Close" />
                    </CloseButtonWrapper>
                    <ProfileHeader>
                        <UserLogo src={user} alt="User Icon" />
                        {/* Display user info directly from userInfo, as setUser was not used in original component logic */}
                        <Email>{userInfo?.username}</Email> {/* Use optional chaining */}
                        <Tokens>{userInfo?.available_tokens} токенов</Tokens> {/* Use optional chaining */}
                    </ProfileHeader>
                    <ProfileWrapper>
                        {/* Access subscription name with optional chaining */}
                        <SettingsButtonPass>{userInfo?.subscription?.name || "Нет подписки"}</SettingsButtonPass>
                        <SettingsButton><NavLink to={"/settings"}>Настройки</NavLink></SettingsButton>
                        <SettingsButton><a href="https://t.me/mon_tti1  ">Написать в поддержку</a></SettingsButton>
                        <SettingsButton onClick={HandleLogout}>Выйти</SettingsButton>
                    </ProfileWrapper>
                </ContentContainer>
            )}
        </Wrapper>
    );
};

export default Profile;
