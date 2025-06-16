import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Chat } from '../../redux_toolkit/reducers/ChatSlice'; // Assuming Chat type is available
import { useChangeNameChatMutation, useDeleteChatMutation } from '../../redux_toolkit/api/chatsApi';
import { useActions } from '../../common/useActions';
// Define the props interface for DialogItem
interface DialogItemProps {
  element: Chat;
  handle: (id: string | number) => void; // Original handler function for selecting the chat
  onSaveChatName?: (id: string | number, newTitle: string) => void; // Callback to save the new chat name
}

// Styled Components
const ItemWrapper = styled.div`
  position: relative; /* For positioning the options menu */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  margin-bottom: 8px;
  background-color: #f8f9fa;
  border-radius: 8px;
  transition: background-color 0.2s ease-in-out;
  min-height: 40px; 

  &:hover {
    background-color: #e9ecef; 
  }

  &:hover .more-options-button {
    opacity: 1;
    visibility: visible;
  }
`;

const ItemTitle = styled.div`
  flex-grow: 1;
  font-size: 14px;
  color: #343a40; 
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 8px;
  padding: 4px 0; /* Align with input padding */
`;

const RenameInputStyled = styled.input`
  flex-grow: 1;
  font-size: 14px;
  color: #343a40;
  background-color: #fff; /* Or a very light gray to indicate editing */
  border: 1px solid #ced4da; /* Subtle border */
  border-radius: 4px;
  padding: 3px 6px; /* Adjust padding to match ItemTitle appearance */
  margin-right: 8px;
  box-sizing: border-box;
  outline: none;

  &:focus {
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const MoreOptionsButton = styled.button`
  opacity: 0; 
  visibility: hidden;
  background: transparent;
  border: none;
  padding: 4px;
  margin-left: auto; 
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
  border-radius: 4px;
  flex-shrink: 0; /* Prevent button from shrinking */

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  svg {
    width: 18px;
    height: 18px;
    fill: #495057; 
  }
`;

const OptionsMenu = styled.div`
  position: absolute;
  top: calc(100% - 5px); 
  right: 5px;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  z-index: 100;
  min-width: 140px;
  padding: 6px 0;
  border: 1px solid #dee2e6; 
`;

const OptionsMenuItem = styled.div`
  padding: 8px 12px;
  font-size: 13px;
  color: #343a40;
  cursor: pointer;
  &:hover {
    background-color: #f1f3f5; 
  }
`;

const EllipsisVerticalIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" width="1em" height="1em">
    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
  </svg>
);

const DialogItem: React.FC<DialogItemProps> = ({ element, handle, onSaveChatName }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(element.title);
const [ChangeName,{isLoading}] = useChangeNameChatMutation()
// const currentMessages = useSelector((state:state) => state.chat.current_chat)
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null); // Ref for the rename input
    const [deleteChat] = useDeleteChatMutation()
    const {DeleteChat,RenameChat} = useActions()
  // Effect to focus input when renaming starts
  useEffect(() => {
    if (isRenaming && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select(); // Select all text in input
    }
  }, [isRenaming]);

  // Effect to reset renameValue if element.title changes externally while not renaming
  useEffect(() => {
    if (!isRenaming) {
      setRenameValue(element.title);
    }
  }, [element.title, isRenaming]);

  // 
  const handleToggleMenu = (event: React.MouseEvent) => {
    event.stopPropagation(); 
    setIsMenuOpen(prev => !prev);
  };

  const startRename = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsMenuOpen(false); // Close the menu
    setIsRenaming(true); // Enable renaming mode
    setRenameValue(element.title); // Initialize input with current title
    // Focus will be handled by the useEffect
  };


  const submitRename = async() => {
    const trimmedValue = renameValue.trim();
    if (trimmedValue && trimmedValue !== element.title) {
        try {
            RenameChat({
              id:element.id,
              title:trimmedValue
            })
            await ChangeName({
              id:element.id !== 0 ? element.id : localStorage.getItem("chat_id"),
              title:trimmedValue
            })
        } catch (error) {
        }
    }
    setIsRenaming(false);
  };

  const cancelRename = () => {
    setIsRenaming(false);
    setRenameValue(element.title); // Reset to original title
  };

  const handleRenameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRenameValue(event.target.value);
  };

  const handleRenameInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission if input is in a form
      submitRename();
    } else if (event.key === 'Escape') {
      cancelRename();
    }
  };

  const handleRenameInputBlur = () => {
    submitRename();
  };

  const handleItemDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    deleteChat({id:element.id})
    DeleteChat(element.id)
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen &&
          menuRef.current && !menuRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <ItemWrapper key={element.id}>
      {isRenaming ? (
        <RenameInputStyled
          ref={inputRef}
          type="text"
          disabled={isLoading}
          value={ isLoading ? "Loading..." : renameValue}
          onChange={handleRenameInputChange}
          onKeyDown={handleRenameInputKeyDown}
          onBlur={handleRenameInputBlur}
          aria-label={`Новое имя для ${element.title}`}
        />
      ) : (
        <ItemTitle onClick={() => !isRenaming && handle(element.id)}>
          {element.title}
        </ItemTitle>
      )}
      {!isRenaming && ( // Hide options button while renaming to simplify UI, or keep it if preferred
        <MoreOptionsButton
          ref={buttonRef}
          className="more-options-button"
          onClick={handleToggleMenu}
          aria-haspopup="true"
          aria-expanded={isMenuOpen}
          aria-label={`Options for ${element.title}`}
        >
          <EllipsisVerticalIcon />
        </MoreOptionsButton>
      )}
      {isMenuOpen && !isRenaming && ( // Also ensure menu doesn't show if renaming is triggered
        <OptionsMenu ref={menuRef} role="menu">
          <OptionsMenuItem role="menuitem" onClick={startRename}>
            Переименовать
          </OptionsMenuItem>
          <OptionsMenuItem role="menuitem" onClick={handleItemDelete}>
            Удалить
          </OptionsMenuItem>
        </OptionsMenu>
      )}
    </ItemWrapper>
  );
};

export default DialogItem
