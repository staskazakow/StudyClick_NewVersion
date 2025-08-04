import { NavLink } from "react-router";
import styled from "styled-components";
import { CloseBtn as BaseCloseBtn } from '../../components/Profile/Settings';
import { Wrapper as BaseWrapper } from '../../common/styles/chat.styles';
export const Wrapper = styled(BaseWrapper)`
    /* Inherits base styles from LoginApp/LoginApp Wrapper */
    /* Override or add responsive styles as needed */
    justify-content: center !important; /* Center content vertically on small screens */
    align-items: center !important; /* Center content horizontally */
    padding: 20px; /* Add padding */
    box-sizing: border-box; /* Include padding in element's total size */
    min-height: 100vh; /* Ensure full height */
`;

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%; /* Take full width of the wrapper */
    max-width: 500px; /* Limit max width for larger screens */
    background-color: #ffffff; /* Add a background for clarity */
    border-radius: 8px; /* Rounded corners */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
    padding: 20px; /* Internal padding */
    box-sizing: border-box;

    @media (min-width: 768px) {
        /* Adjust layout for larger screens if space-between is desired */
        /* Based on the original style={{ justifyContent: "space-between" }}
           it seems the content might be intended to fill height or push items
           apart in some way. For a typical profile modal/page, centering is common.
           Keeping it centered for simplicity unless a different complex layout is needed.
        */
        justify-content: flex-start; /* Align items to the start if needed */
    }
`;

export const CloseButtonWrapper = styled(NavLink)`
    position: absolute; /* Position absolutely */
    top: 20px; /* Distance from top */
    right: 20px; /* Distance from right */
    z-index: 10; /* Ensure it's above other content */

    @media (max-width: 480px) {
        top: 10px;
        right: 10px;
    }
`;

export const CloseBtn = styled(BaseCloseBtn)`
    /* Inherits base styles, adjust size if needed */
    width: 30px; /* Default size */
    height: 30px;

    @media (max-width: 480px) {
        width: 24px;
        height: 24px;
    }
`;


export const ProfileHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px; /* Space below header */
    padding-bottom: 20px; /* Add padding below header */
    border-bottom: 1px solid #eee; /* Add a separator line */
    width: 100%; /* Take full width of container */
`;


export const UserLogo = styled.img`
width: 120px; /* Default size */
height: 120px; /* Default size */
margin-bottom: 15px; /* Slightly adjusted margin */
background-color:black;
@media (max-width: 480px) {
    width: 100px; /* Smaller size on small screens */
    height: 100px;
    margin-bottom: 10px;
}
`;

export const Email = styled.div`
color: #333; /* Darker color for better readability */
font-weight: 500; /* Slightly bolder */
font-size: 24px; /* Adjusted font size */
margin-bottom: 5px; /* Space below email */
text-align: center; /* Center text */
word-break: break-word; /* Prevent long emails from overflowing */

@media (max-width: 768px) {
    font-size: 20px;
}

@media (max-width: 480px) {
    font-size: 18px;
}
`;

export const Tokens = styled(Email)`
font-size: 18px; /* Adjusted font size */
color: #555; /* Grey color */
font-weight: 400; /* Normal weight */

@media (max-width: 768px) {
    font-size: 16px;
}
`;

export const SettingsButton = styled.div`
transition: background-color 0.3s ease, color 0.3s ease, padding 0.3s ease, border-radius 0.3s ease; /* Smooth transitions */
color: #333; /* Darker color */
font-family: Inter, sans-serif; /* Specify font-family */
font-size: 20px; /* Adjusted font size */
margin-bottom: 15px; /* Adjusted margin */
padding: 8px 12px; /* Added default padding for click area */
border-radius: 8px; /* Default border-radius */
width: 100%; /* Take full width */
text-align: left; /* Align text to the left */
box-sizing: border-box; /* Include padding in width */


&:hover{
    color:white;
    background: #007bff; /* Use a brand color for hover */
    /* width:100%; Keep width 100% */
    /* padding:4px; Removed fixed padding override on hover */
    /* border-radius:10px; Removed fixed border-radius override on hover */
    cursor:pointer;
}

/* Style for NavLink inside SettingsButton */
a {
    color: inherit; /* Inherit color from parent (SettingsButton) */
    text-decoration: none; /* Remove default underline */
    display: block; /* Make link fill the button area */
}


@media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 12px;
    padding: 6px 10px;
}

@media (max-width: 480px) {
    font-size: 16px;
    margin-bottom: 10px;
    padding: 5px 8px;
}
`;

export const ProfileWrapper = styled.div`
/* Removed fixed margins, using padding in ContentContainer instead */
display:flex;
flex-direction: column;
align-items: flex-start;
width: 100%; /* Ensure it takes full width inside ContentContainer */
`;

export const SettingsButtonPass = styled(SettingsButton)`
    cursor:alias;
    &:hover{
    background-color:transparent;
    color:black;
    }
`