import React, { useState } from 'react';
import BackArrow from '../../image/RightArrow.svg';
import styled from 'styled-components';
import { NavLink } from 'react-router'; 
import { useLoginMutation } from '../../redux_toolkit/api/authApi';
// Styled Components definitions (re-using the improved styles)
const Wrapper = styled.div`
    display: flex;
    min-height: 100vh; /* Use min-height to ensure wrapper covers full height */
    width: 100vw;
    justify-content: center;
    align-items: center;
    background-color: #f0f2f5; /* Added a light background color for better contrast */
    padding: 20px; /* Add some padding */
    box-sizing: border-box; /* Include padding in element's total width and height */
`;

const LoginForm = styled.form` /* Renamed to LoginForm */
    display: flex;
    flex-direction: column;
    width: 100%; /* Make width responsive */
    max-width: 400px; /* Set a maximum width for larger screens */
    background: #ffffff; /* Changed background to white */
    padding: 30px; /* Increased padding */
    border-radius: 8px; /* Added rounded corners */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Added a subtle shadow */
    align-items: center;
    gap: 20px; /* Add space between form sections */

    @media (max-width: 480px) {
        padding: 20px; /* Adjust padding for smaller screens */
    }
`;

const Title = styled.h2` /* Changed to h2 for semantic correctness and styled */
    font-size: 24px; /* Increased font size */
    color: #333; /* Darker color for text */
    margin-bottom: 20px; /* Added space below title */
    text-align: center; /* Center align the title */
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%; /* Make input wrapper take full width */
    gap: 15px; /* Add space between inputs */
`;

const LoginInput = styled.input` /* Renamed to LoginInput */
    width: 100%; /* Make input take full width of its container */
    padding: 12px 15px; /* Added padding inside input */
    border: 1px solid #ccc; /* Added border */
    border-radius: 4px; /* Added rounded corners to inputs */
    font-size: 16px; /* Adjusted font size */
    box-sizing: border-box; /* Include padding and border in element's total width and height */

    &:focus {
        outline: none;
        border-color: #007bff; /* Highlight on focus */
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.25);
    }
`;

const SubmitButton = styled.button`
    width: 100%; /* Make button take full width */
    padding: 12px 15px; /* Added padding */
    background-color: #007bff; /* Blue background color */
    color: white; /* White text color */
    border: none; /* Remove default border */
    border-radius: 4px; /* Rounded corners */
    font-size: 16px; /* Font size */
    cursor: pointer; /* Indicate it's clickable */
    transition: background-color 0.3s ease; /* Smooth transition for hover effect */

    &:hover:not(:disabled) {
        background-color: #0056b3; /* Darker blue on hover */
    }

    &:disabled {
        background-color: #cccccc; /* Grey out when disabled */
        cursor: not-allowed; /* Indicate not clickable */
    }
`;

const ErrorMessage = styled.div`
    color: #dc3545; /* Red color for error messages */
    font-size: 14px;
    margin-top: 10px; /* Space above error message */
    text-align: center; /* Center align error message */
`;

const RegistrationLinkWrapper = styled.div` /* Renamed to RegistrationLinkWrapper */
    color: #555; /* Dark grey color */
    font-size: 14px;
    text-align: center; /* Center align the text */

    a {
        color: #007bff; /* Blue link color */
        text-decoration: none; /* Remove underline */
        margin-left: 5px;
        transition: color 0.3s ease; /* Smooth transition for hover effect */

        &:hover {
            text-decoration: underline; /* Add underline on hover */
        }
    }
`;

const BackLinkWrapper = styled(NavLink)` /* Styled NavLink for back arrow */
    position: absolute; /* Position it absolutely */
    top: 20px; /* Distance from top */
    left: 20px; /* Distance from left */
    display: flex;
    align-items: center;
    color: #333; /* Color for the link text if any */
    text-decoration: none; /* Remove underline */
    z-index: 10; /* Ensure it's above the form */

    img {
        width: 24px; /* Size of the arrow image */
        height: 24px;
        margin-right: 5px;
    }
`;
interface ApiErrorResponseLogIn {
    data:{
        detail:string
    }
}

const Login = () => {
    const [login, { isLoading }] = useLoginMutation(); // Keep status if needed elsewhere
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
   const [errorMessage, setErrorMessage] = useState<Array<string> | string>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage([]); // Clear previous errors
        try {
            const loginres = await login({ username: email, password: password });
            if ('error' in loginres) {
                const apiError = loginres.error as ApiErrorResponseLogIn;
                setErrorMessage(apiError.data.detail);
                return;
            }
            if(loginres.data) {
                window.location.href = '/';
            }

        } catch (error) {
            console.error('Login failed:', error);
            // Set a generic error message for unexpected errors
            setErrorMessage('Произошла ошибка при входе.');
        }
    };

    return (
        <Wrapper>
            <BackLinkWrapper to={'/'}> {/* Use styled BackLinkWrapper */}
                <img src={BackArrow} alt="Back" style={{transform:"rotate(180deg)"}} />
            </BackLinkWrapper>
            <LoginForm onSubmit={handleSubmit}> 
                <Title>Войдите</Title> 
                <InputWrapper> 
                    <LoginInput
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Введите имя пользователя" // Updated placeholder
                    />
                    <LoginInput 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Пароль" // Updated placeholder
                    />
                    <SubmitButton type="submit" disabled={isLoading}> {/* Use styled SubmitButton */}
                        {isLoading ? 'Загрузка...' : 'Войти'} {/* Updated button text */}
                    </SubmitButton>
                    {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>} {/* Use styled ErrorMessage */}
                </InputWrapper>
                <RegistrationLinkWrapper> {/* Use styled RegistrationLinkWrapper */}
                    Еще не зарегистрированы?
                    <NavLink to={"/register"}>Зарегистрироваться</NavLink>
                </RegistrationLinkWrapper>
            </LoginForm>
        </Wrapper>
    );
};

export default Login;
