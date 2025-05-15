import React, { useState, CSSProperties, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import { useDeleteAccountMutation, useGetUserQuery } from '../../redux_toolkit/api/authApi';

// --- TYPE DEFINITIONS ---

interface UserInfo {
  email: string;
  subscription?: {
    name: string;
  };
  // Add other user properties if available
}

interface SubscriptionInfo {
  name: string;
  // Add other subscription properties
}

// Mock for NavLink if react-router-dom is not fully set up in this environment
interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  style?: CSSProperties;
  className?: string;
}
const NavLink: React.FC<NavLinkProps> = ({ to, children, style, className }) => (
  <a href={to} style={style} className={className}>
    {children}
  </a>
);


interface MutationState {
  isLoading: boolean;
}


// Mock Wrapper component (replace with your actual Wrapper)
const Wrapper = styled.div`
  font-family: 'Arial', sans-serif;
  background-color: #f4f6f8;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start; // Align items to the top
`;

// --- STYLED COMPONENTS ---

// Define breakpoints
const breakpoints = {
  desktopSmall: '1024px',
  tablet: '768px',
  mobile: '480px',
};

const SettingsWrapper = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  width: 90vw;
  max-width: 900px;
  padding: 25px 35px;
  margin: 20px auto;

  @media (max-width: ${breakpoints.tablet}) {
    width: 95vw;
    padding: 20px 25px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 15px 20px;
    margin: 10px auto;
  }
`;

const HeaderSettings = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;
  padding-bottom: 25px;
  border-bottom: 1px solid #e9ecef;

  @media (max-width: ${breakpoints.tablet}) {
    margin-bottom: 35px;
    padding-bottom: 20px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    margin-bottom: 25px;
    padding-bottom: 15px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  div { // Style for the "Настройки" text
    font-size: 30px;
    color: #212529;
    font-weight: 600;

    @media (max-width: ${breakpoints.tablet}) {
      font-size: 26px;
    }

    @media (max-width: ${breakpoints.mobile}) {
      font-size: 22px;
    }
  }
`;

const BodySettings = styled.div`
  display: flex;

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
  }
`;

const SettingsNav = styled.nav`
  margin-right: 60px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 200px; // Give some min-width to nav

  @media (max-width: ${breakpoints.tablet}) {
    margin-right: 0;
    margin-bottom: 30px;
    flex-direction: row; // Arrange buttons horizontally on tablet
    flex-wrap: wrap; // Allow buttons to wrap
    justify-content: flex-start; // Align buttons to the start
    gap: 10px; // Adjust gap for horizontal layout
  }

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column; // Stack buttons vertically again on mobile
    align-items: stretch; // Stretch buttons full width
    gap: 8px;
    margin-bottom: 25px;
  }
`;

interface StyledSettingsButtonProps {
  $isActive: boolean;
  // Allow 'style' prop, but ensure it's typed with CSSProperties
  style?: CSSProperties;
}

const StyledSettingsButton = styled.button<StyledSettingsButtonProps>`
  padding: 12px 22px;
  font-size: 16px;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 8px;
  background-color: ${props => props.$isActive ? 'hsl(217, 57%, 51%)' : '#e9ecef'}; // Updated colors
  color: ${props => props.$isActive ? 'white' : '#343a40'};
  font-weight: ${props => props.$isActive ? '500' : 'normal'};
  text-align: left;
  transition: background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${props => props.$isActive ? 'hsl(217, 57%, 56%)' : '#dee2e6'};
    box-shadow: ${props => props.$isActive ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'};
  }

  ${props => props.style && Object.entries(props.style).map(([key, value]) => `${key.replace(/([A-Z])/g, '-\$1').toLowerCase()}:${value};`).join('')}

  @media (max-width: ${breakpoints.tablet}) {
    flex-grow: 1; // Allow buttons to share space in a row
    min-width: 120px; // Ensure buttons have some minimum width when in a row
    text-align: center;
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 15px;
    padding: 10px 18px;
    width: 100%; // Full width when stacked vertically
    text-align: center;
  }
`;

const ContentArea = styled.section`
  flex-grow: 1;
  min-width: 0; // Prevents flexbox overflow issues
`;

const SettingsBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const AccountDetailWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f1f3f5; // Lighter border

  &:last-child {
    border-bottom: none;
  }
  
  div:first-child { // Label (e.g., "Почта:", "Удалить аккаунт")
    font-weight: 500;
    color: #495057; // Slightly lighter text for labels
    font-size: 15px;
  }
  
  div:nth-child(2) { // Value (e.g., email address) or Button
    color: #212529;
    font-size: 15px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    padding: 12px 0;
  }
`;

const ActionButton = styled.button`
  padding: 10px 22px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  border: none;
  transition: background-color 0.2s ease, transform 0.1s ease;
  font-size: 14px;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }
  &:active:not(:disabled) {
    transform: translateY(0px);
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%; 
    padding: 12px; // Larger padding for easier tap on mobile
  }
`;


const DeleteBtn = styled(ActionButton)`
  background: #e03131; // Red color
  color: white;

  &:hover:not(:disabled) {
    background: #c92a2a;
  }
`;

const SubscribeBtn = styled(ActionButton)`
  background: #228be6; // Blue color for subscribe/manage
  color: white;
  margin-top: 10px; // Keep margin for non-stacked layout

  &:hover:not(:disabled) {
    background: #1c7ed6;
  }
  
  @media (max-width: ${breakpoints.tablet}) {
     margin-top: 0; // Remove top margin if it's part of a flex layout that handles gap
  }

  @media (max-width: ${breakpoints.mobile}) {
    margin-top: 15px; // Add margin if it's now block-level
  }
`;


export const HeaderCloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 28px; 
  color: #adb5bd; // Lighter close icon
  cursor: pointer;
  padding: 5px;
  line-height: 1;
  transition: color 0.2s ease;
  
  &:hover {
    color: #495057;
  }

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 26px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 24px;
    align-self: flex-end; // Align to the right if header is column
  }
`;

// --- MODAL STYLED COMPONENTS ---
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(33, 37, 41, 0.6); // Darker overlay
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050; // Ensure modal is on top
  padding: 20px; // Padding for smaller screens not to touch edges
  box-sizing: border-box;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 25px 30px;
  border-radius: 10px; // Slightly larger radius
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 480px;
  position: relative;
  box-sizing: border-box;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 20px 25px;
    max-width: calc(100% - 40px); // Ensure padding from screen edges
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e9ecef;
  
  h3 {
    font-size: 20px;
    font-weight: 600;
    color: #212529;
    margin: 0;

    @media (max-width: ${breakpoints.mobile}) {
      font-size: 18px;
    }
  }
`;

const ModalCloseButton = styled.button`
  background: none;
  border: none;
  font-size: 28px; // Larger close button
  cursor: pointer;
  color: #adb5bd;
  padding: 0;
  line-height: 1;
  transition: color 0.2s ease;

  &:hover {
    color: #495057;
  }
`;

const ModalBody = styled.div`
  margin-bottom: 25px;
  p {
    font-size: 15px;
    color: #495057;
    margin-bottom: 18px;
    line-height: 1.65;

    @media (max-width: ${breakpoints.mobile}) {
      font-size: 14px;
    }
  }
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 8px; // Reduced margin if error message is present
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: hsl(217, 57%, 51%);
    outline: none;
    box-shadow: 0 0 0 3px hsla(217, 57%, 51%, 0.15);
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 15px;
    padding: 10px 14px;
  }
`;

const ErrorMessage = styled.p`
  color: #e03131;
  font-size: 13px;
  margin-top: 0; // Adjust if ModalInput margin-bottom is small
  margin-bottom: 12px;
  min-height: 1.2em; // Reserve space to prevent layout shift

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 12px;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px; // Standard gap

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column-reverse; // Confirm button often last on mobile
    gap: 10px;
  }
`;

const ModalButton = styled(ActionButton)` // Inherit base styles from ActionButton
  font-size: 15px; // Slightly larger for modal context
  padding: 10px 20px;

  &.confirm {
    background-color: #e03131;
    color: white;
    &:hover:not(:disabled) {
      background-color: #c92a2a;
    }
  }

  &.cancel {
    background-color: #f1f3f5; // Lighter cancel button
    color: #495057;
    border: 1px solid #dee2e6;
    &:hover:not(:disabled) {
      background-color: #e9ecef;
    }
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%; 
    padding: 12px; // Ensure good tap target size
  }
`;
export const CloseBtn = styled.img`

  width: 50px; // Default size

  height: 50px;

  // color: black; // Note: color property doesn't apply to img src

  @media (max-width: ${breakpoints.tablet}) {

    width: 40px; // Smaller size on tablet

    height: 40px;

  }

  @media (max-width: ${breakpoints.mobile}) {

    width: 30px; // Even smaller size on mobile

    height: 30px;

  }

`;
// --- COMPONENT ---
type ActiveTab = 'account' | 'subscription';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('account');
  const { data: userInfo, isLoading: isLoadingUser } = useGetUserQuery();
  const [deleteAccountMutation, { isLoading: isDeletingAccount }] = useDeleteAccountMutation();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [deleteError, setDeleteError] = useState<string>('');

  const mail = userInfo?.email;

  const handleOpenDeleteModal = () => {
    setDeleteError('');
    setPasswordInput('');
    setIsModalOpen(true);
  };
  console.log(userInfo)
  const handleCloseModal = () => {
    if (isDeletingAccount) return; // Prevent closing while deletion is in progress
    setIsModalOpen(false);
  };

  const handleConfirmDeletion = async (event: FormEvent<HTMLButtonElement> | MouseEvent) => {
    event.preventDefault(); // Prevent form submission if wrapped in a form
    if (!passwordInput.trim()) {
      setDeleteError('Пожалуйста, введите ваш пароль.');
      return;
    }
    setDeleteError('');
    try {
      const result = await deleteAccountMutation({current_password:passwordInput});
      if (result.error) {
        setDeleteError( 'Ошибка при удалении аккаунта.');
      } else {
        handleCloseModal();
       window.location.href = "/"
        setActiveTab('account'); // Or redirect to home/login
      }
    } catch (error) {
      console.error("Deletion failed:", error);
      setDeleteError('Произошла неожиданная ошибка. Попробуйте снова.');
    }
  };

  if (isLoadingUser) {
    return <Wrapper><div>Загрузка информации о пользователе...</div></Wrapper>;
  }

  return (
    <Wrapper>
      <SettingsWrapper>
        <HeaderSettings>
          <div>Настройки</div>
          <NavLink to={"/profile"}> {/* Assuming /profile is the correct path */}
            <HeaderCloseButton aria-label="Закрыть настройки">
              &times;
            </HeaderCloseButton>
          </NavLink>
        </HeaderSettings>
        <BodySettings>
          <SettingsNav>
            <StyledSettingsButton
              style={{ width: "100%" }} // Ensures button takes full width in column layout
              onClick={() => setActiveTab('account')}
              $isActive={activeTab === 'account'}
            >
              Аккаунт
            </StyledSettingsButton>
            <StyledSettingsButton
              style={{ width: "100%" }}
              onClick={() => setActiveTab('subscription')}
              $isActive={activeTab === 'subscription'}
            >
              Подписка
            </StyledSettingsButton>
          </SettingsNav>
          <ContentArea>
            {activeTab === 'account' && (
              <SettingsBlock>
                <AccountDetailWrapper>
                  <div>Почта:</div>
                  <div>{mail || 'Не указана'}</div>
                </AccountDetailWrapper>
                <AccountDetailWrapper>
                  <div>Удалить аккаунт</div>
                  <DeleteBtn onClick={handleOpenDeleteModal} disabled={isDeletingAccount}>Удалить</DeleteBtn>
                </AccountDetailWrapper>
              </SettingsBlock>
            )}
            {activeTab === 'subscription' && (
              <SettingsBlock>
                 <AccountDetailWrapper>
                    <div>Текущая подписка:</div>
                    <div>{userInfo?.subscription ? userInfo.subscription.name : "У вас пока нет подписок"}</div>
                 </AccountDetailWrapper>
                <NavLink 
                    style={{ textDecoration: "none", color: "black", display: 'block' }} 
                    to={"/tarif"} // Assuming /tarif is the correct path for subscription management
                >
                  <SubscribeBtn style={{ width: 'auto', alignSelf: 'flex-start' }}> 
                    {/* On mobile this will be 100% width due to ActionButton style, adjust if needed */}
                    {userInfo?.subscription ? "Управление подпиской" : "Подписаться"}
                  </SubscribeBtn>
                </NavLink>
              </SettingsBlock>
            )}
          </ContentArea>
        </BodySettings>
      </SettingsWrapper>

      {isModalOpen && (
        <ModalOverlay onClick={handleCloseModal}> {/* Close on overlay click */}
          <ModalContent 
            role="dialog" 
            aria-modal="true" 
            aria-labelledby="deleteAccountModalTitle"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal content
          >
            <ModalHeader>
              <h3 id="deleteAccountModalTitle">Подтверждение удаления аккаунта</h3>
              <ModalCloseButton onClick={handleCloseModal} aria-label="Закрыть диалоговое окно" disabled={isDeletingAccount}>&times;</ModalCloseButton>
            </ModalHeader>
            <ModalBody>
              <p>Вы уверены, что хотите удалить свой аккаунт? Это действие необратимо. Все ваши данные будут удалены. Пожалуйста, введите ваш пароль для подтверждения.</p>
              <ModalInput
                type="password"
                value={passwordInput}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setPasswordInput(e.target.value);
                  if (deleteError) setDeleteError(''); // Clear error on input change
                }}
                placeholder="Введите ваш пароль"
                aria-label="Пароль для подтверждения удаления аккаунта"
                aria-describedby={deleteError ? "deleteErrorText" : undefined}
                disabled={isDeletingAccount}
              />
              {deleteError && <ErrorMessage role="alert" id="deleteErrorText">{deleteError}</ErrorMessage>}
            </ModalBody>
            <ModalFooter>
              <ModalButton className="cancel" onClick={handleCloseModal} disabled={isDeletingAccount}>
                Отмена
              </ModalButton>
              <ModalButton 
                className="confirm" 
                onClick={handleConfirmDeletion} 
                disabled={isDeletingAccount || !passwordInput.trim()}
                type="submit" // Can be submit if part of a form, otherwise button
              >
                {isDeletingAccount ? 'Удаление...' : 'Удалить аккаунт'}
              </ModalButton>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}
    </Wrapper>
  );
};

export default Settings;

