import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import { SettingsButton } from './Profile'; // Assuming SettingsButton exists, but we'll create a new styled one for clarity on active state
import close from "../../image/close.png"; // Assuming correct path
import { NavLink } from 'react-router'; // Assuming react-router is used
import { Wrapper } from '../LoginApp/LoginApp'; // Assuming Wrapper is already defined elsewhere
import { useGetUserQuery } from '../../redux_toolkit/api/authApi'; // Assuming RTK Query is used
// import { useSelector } from 'react-redux'; // Not used in this component logic
// import { state } from '../../redux_toolkit/store'; // This import seems incorrect, should be type import or removed

// Define breakpoints
const breakpoints = {
  tablet: '768px',
  mobile: '480px',
};

const SettingsWrapper = styled.div`
  margin: 20px; // Apply margin to all sides by default
  width: 90vw; // Default width for larger screens
  max-width: 1200px; // Optional: Max width to prevent content from getting too wide
  margin-left: auto; // Center the wrapper
  margin-right: auto; // Center the wrapper
  padding: 0 20px; // Add some horizontal padding

  @media (max-width: ${breakpoints.tablet}) {
    width: auto; // Auto width, let padding control inner spacing
    margin: 15px; // Slightly less margin
    padding: 0 15px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    margin: 10px; // Smaller margin
    padding: 0 10px; // Smaller padding
  }
`;

const HeaderSettings = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 70px; // Default spacing

  @media (max-width: ${breakpoints.tablet}) {
    margin-bottom: 40px; // Adjust spacing for tablets
  }

  @media (max-width: ${breakpoints.mobile}) {
    margin-bottom: 30px; // Adjust spacing for mobile
  }

  div { // Style for the "Настройки" text
    font-size: 30px; // Default font size
    color: black;

    @media (max-width: ${breakpoints.tablet}) {
      font-size: 24px; // Smaller font size
    }

    @media (max-width: ${breakpoints.mobile}) {
      font-size: 20px; // Even smaller font size
    }
  }
`;

const BodySettings = styled.div`
  display: flex; // Default side-by-side layout

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column; // Stack items vertically on smaller screens
  }
`;

const SettingsNav = styled.div`
  margin-right: 150px; // Space between nav and content on larger screens
  display: flex; // Use flex to potentially control button layout if needed
  flex-direction: column; // Stack buttons vertically
  gap: 10px; // Add space between buttons

  @media (max-width: ${breakpoints.tablet}) {
    margin-right: 0; // Remove margin on smaller screens
    margin-bottom: 30px; // Add space below the nav when stacked
    flex-direction: row; // Arrange buttons horizontally on tablet
    flex-wrap: wrap; // Allow buttons to wrap
    justify-content: center; // Center buttons
    gap: 15px; // Adjust gap for horizontal layout
  }

  @media (max-width: ${breakpoints.mobile}) {
     flex-direction: column; // Stack buttons vertically again on mobile
     gap: 10px; // Adjust gap
     align-items: center; // Center buttons
  }
`;
interface SettingsProps{
    $isActive:boolean;
    style:any
}
// Define a styled component for the settings buttons with active state styling
const StyledSettingsButton = styled.button<SettingsProps>`
  padding: 10px 20px; // Default padding
  font-size: 16px; // Default font size
  cursor: pointer;
  border: 1px solid #ccc; // Default border
  border-radius: 5px; // Default border radius
  background-color: ${props => props.$isActive ? '#13233D' : 'none'}; // Highlight active button <sup data-citation="5" className="inline select-none [&>a]:rounded-2xl [&>a]:border [&>a]:px-1.5 [&>a]:py-0.5 [&>a]:transition-colors shadow [&>a]:bg-ds-bg-subtle [&>a]:text-xs [&>svg]:w-4 [&>svg]:h-4 relative -top-[2px] citation-shimmer"><a href="https://dev.to/ramonak/react-how-to-create-a-custom-button-group-component-in-5-minutes-3lfd" target="_blank" title="React: How to create a custom Button Group component in ...">5</a></sup>
  color: ${props => props.$isActive ? 'white' : '#555'}; // Adjust text color <sup data-citation="5" className="inline select-none [&>a]:rounded-2xl [&>a]:border [&>a]:px-1.5 [&>a]:py-0.5 [&>a]:transition-colors shadow [&>a]:bg-ds-bg-subtle [&>a]:text-xs [&>svg]:w-4 [&>svg]:h-4 relative -top-[2px] citation-shimmer"><a href="https://dev.to/ramonak/react-how-to-create-a-custom-button-group-component-in-5-minutes-3lfd" target="_blank" title="React: How to create a custom Button Group component in ...">5</a></sup>
  font-weight: ${props => props.$isActive ? 'bold' : 'normal'}; // Make active text bold

  // Allow style overrides like width: max-content
  ${props => props.style};

  

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 14px; // Smaller font size on mobile
    padding: 8px 15px; // Smaller padding on mobile
  }
`;


const EmailBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px; // Space between items in EmailBlock
  width: 100%; // Allow EmailBlock to take full width of its container when stacked
`;

const PassBlock = styled.div`
  width: 100%; // Allow PassBlock to take full width of its container when stacked
`;

const AccountWrapper = styled.div`
  display: flex;
  width: 40vw; // Default width for account info rows
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%; // Full width on smaller screens
    flex-direction: column; // Stack items vertically
    align-items: flex-start; // Align items to the start when stacked
    gap: 5px; // Add space between stacked label and value
  }

  @media (max-width: ${breakpoints.mobile}) {
     // Further adjustments if needed for very small screens
  }
`;

const DeleteBtn = styled.div`
  padding: 20px;
  background: #D83737;
  border-radius: 40px;
  cursor: pointer;
  display: flex; // Use flex to center text if needed
  justify-content: center;
  align-items: center;
  text-align: center; // Ensure text is centered
  color: white; // Make text color white for contrast

  @media (max-width: ${breakpoints.mobile}) {
    padding: 15px; // Smaller padding on mobile
    border-radius: 30px; // Adjust border radius
    font-size: 14px; // Smaller font size
  }
`;

const Subscribe = styled.div`
  padding: 20px 25px;
  background: #D1D871;
  cursor: pointer;
  border-radius: 20px;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center; // Center text vertically
  text-align: center; // Center text horizontally
  color: black; // Ensure text color is readable

  @media (max-width: ${breakpoints.tablet}) {
    margin-top: 20px; // Adjust top margin
    padding: 15px 20px; // Adjust padding
  }

  @media (max-width: ${breakpoints.mobile}) {
    margin-top: 15px; // Adjust top margin
    padding: 10px 15px; // Adjust padding
    font-size: 14px; // Smaller font size
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

const Settings = () => {
  const [account,setAccount] = useState(true); // Set initial state for account to be open by default
  const [pass,setPass] = useState(false);
  const {data:userInfo,isLoading:load} = useGetUserQuery(); // Assuming useGetUserQuery fetches user info
  const mail = userInfo?.email;

  const handleAccount = () => {
    setAccount(true);
    setPass(false);
  };

  const handlePass = () => {
    setAccount(false);
    setPass(true);
  };

  return (
    <Wrapper>
      <SettingsWrapper>
        <HeaderSettings>
          <div>Настройки</div>
          <NavLink to={"/profile"}>
            <CloseBtn src={close} alt="Close" /> {/* Add alt text */}
          </NavLink>
        </HeaderSettings>
        <BodySettings>
          <SettingsNav> {/* Use SettingsNav styled component */}
            {/* Use StyledSettingsButton and pass the $isActive prop */}
            <StyledSettingsButton
              style={{width:"max-content"}}
              onClick={handleAccount}
              $isActive={account} // Pass prop to indicate if this button is active <sup data-citation="2" className="inline select-none [&>a]:rounded-2xl [&>a]:border [&>a]:px-1.5 [&>a]:py-0.5 [&>a]:transition-colors shadow [&>a]:bg-ds-bg-subtle [&>a]:text-xs [&>svg]:w-4 [&>svg]:h-4 relative -top-[2px] citation-shimmer"><a href="https://styled-components.com/docs/basics" target="_blank" title="styled-components: Basics">2</a></sup><sup data-citation="5" className="inline select-none [&>a]:rounded-2xl [&>a]:border [&>a]:px-1.5 [&>a]:py-0.5 [&>a]:transition-colors shadow [&>a]:bg-ds-bg-subtle [&>a]:text-xs [&>svg]:w-4 [&>svg]:h-4 relative -top-[2px] citation-shimmer"><a href="https://dev.to/ramonak/react-how-to-create-a-custom-button-group-component-in-5-minutes-3lfd" target="_blank" title="React: How to create a custom Button Group component in ...">5</a></sup>
            >
              Аккаунт
            </StyledSettingsButton>
            <StyledSettingsButton
              style={{width:"max-content"}}
              onClick={handlePass}
              $isActive={pass} // Pass prop to indicate if this button is active <sup data-citation="2" className="inline select-none [&>a]:rounded-2xl [&>a]:border [&>a]:px-1.5 [&>a]:py-0.5 [&>a]:transition-colors shadow [&>a]:bg-ds-bg-subtle [&>a]:text-xs [&>svg]:w-4 [&>svg]:h-4 relative -top-[2px] citation-shimmer"><a href="https://styled-components.com/docs/basics" target="_blank" title="styled-components: Basics">2</a></sup><sup data-citation="5" className="inline select-none [&>a]:rounded-2xl [&>a]:border [&>a]:px-1.5 [&>a]:py-0.5 [&>a]:transition-colors shadow [&>a]:bg-ds-bg-subtle [&>a]:text-xs [&>svg]:w-4 [&>svg]:h-4 relative -top-[2px] citation-shimmer"><a href="https://dev.to/ramonak/react-how-to-create-a-custom-button-group-component-in-5-minutes-3lfd" target="_blank" title="React: How to create a custom Button Group component in ...">5</a></sup>
            >
              Подписка
            </StyledSettingsButton>
          </SettingsNav>
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
              <div>{userInfo?.subscription ? userInfo.subscription.name : "У вас пока нет подписок"}</div>
              <NavLink style={{textDecoration:"none",color:"black"}} to={"/tarif"}>
                <Subscribe>Подписаться</Subscribe>
              </NavLink>
            </PassBlock>
          }
        </BodySettings>
      </SettingsWrapper>
    </Wrapper>
  );
};

export default Settings;
