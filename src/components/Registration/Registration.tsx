import React, { useState } from 'react';
import BackArrow from '../../image/BackArrow.png';
import styled from 'styled-components';
import { NavLink } from 'react-router';// Correct import for NavLink
import { useGetJWTMutation, useRegisterMutation } from '../../redux_toolkit/api/authApi';
import { useActions } from '../../common/useActions';


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


// Define a type for the API error response
export interface ApiErrorResponse {
    status: number;
    data: {
        message: string;
    };
}


const Registration = () => {
    const { setAuth } = useActions();
    const [register, { isLoading: isRegistering }] = useRegisterMutation();
    const [getJWT, { isLoading: isGettingJWT }] = useGetJWTMutation();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null); // Clear any previous error messages
        try {
            const registerResult = await register({ email, username: name, password });
            if ('error' in registerResult) {
                const apiError = registerResult.error as ApiErrorResponse;
                console.log(apiError)
                setErrorMessage(apiError.data?.message);
                return;
            }


            const jwtResult = await getJWT({ username: name, password });


            if ('error' in jwtResult) {
                const apiError = jwtResult.error as ApiErrorResponse;
                console.log(apiError)
                setErrorMessage(apiError.data?.message || 'Failed to get JWT');
                return;
            }


            // If both operations were successful:
            setAuth(true);
            window.location.href = '/';
            //console.log('Registration and JWT retrieval successful'); //Better to use a logger
        } catch (error) {
            console.error('An unexpected error occurred:', error);
            setErrorMessage('An unexpected error occurred during registration.');
        }
    };


    const isLoading = isRegistering || isGettingJWT;

    console.log(errorMessage)
    return (
        <Wrapper>
            <NavLink style={{ marginRight: '5px' }} to="/">
                <img src={BackArrow} alt="Back" />
            </NavLink>
            <RegForm onSubmit={handleSubmit}>
                <Title>Авторизируйтесь чтобы продолжить</Title>
                <InputWrapper>
                    <RegInput
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email or number"
                    />
                    <RegInput
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
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
                <div>
                    Уже есть аккаунт?
                    <NavLink to="/login">Войдите</NavLink>
                </div>
            </RegForm>
        </Wrapper>
    );
};


export default Registration;
