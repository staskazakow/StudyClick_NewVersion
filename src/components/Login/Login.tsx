import React, { useState } from 'react';
import BackArrow from '../../image/BackArrow.png';
import styled from 'styled-components';
import { NavLink } from 'react-router';
import { useLoginMutation, useRegisterMutation } from '../../redux_toolkit/api/authApi';
import { ApiErrorResponse } from '../Registration/Registration';

const RegForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 400px;
    background: #181818;
    height: 600px;
    justify-content: center;
    align-items: center;
`;

const RegInput = styled.input`
    width: 200px;
`;

const Wrapper = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    justify-content: center;
    align-items: center;
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const Title = styled.div`
    font-size: 20px;
    display: flex;
`;

const Login = () => {
    const [login, { status,isLoading }] = useLoginMutation();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const loginres = await login({ username: email, password: password });
            if ('error' in loginres) {
                const apiError = loginres.error as ApiErrorResponse;
                setErrorMessage(apiError.data?.message || 'Login failed');
                return;
            }

            window.location.href = '/';
        } catch (error) {

            console.error('Login failed:', error);
        }
    };
    return (
        <Wrapper>
            <NavLink style={{ marginRight: '5px' }} to={'/'}>
                <img src={BackArrow} alt="Back" />
            </NavLink>
            <RegForm onSubmit={handleSubmit}>
                <Title>Войдите</Title>
                <InputWrapper>
                    <RegInput
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email or number"
                    />
                    <RegInput
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                   <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Loading...' : 'Registration'}
                    </button>
                    {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                </InputWrapper>
                <div>Еще не зарегистрированы?<NavLink to={"/register"}>Зарегистрироваться</NavLink></div>
            </RegForm>
        </Wrapper>
    );
};

export default Login;
