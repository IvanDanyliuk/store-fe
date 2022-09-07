import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Button from '../ui/Button';
import { ButtonColor, ButtonType } from '../../../types/types';
import { useMediaQuery } from 'react-responsive';
import { SCREENS } from '../../services/screens';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../features/store';
import { selectUser } from '../../features/user/selectors';
import { deleteUser } from '../../features/user/asyncActions';


Modal.setAppElement('#root');

const FormHeader = styled.div`
  ${tw`
    mb-4
    flex
    justify-center
  `}
`;

const CloseBtn = styled.button`
  ${tw`
    absolute
    top-2
    right-4
    text-xl
  `}
`;

const Form = styled.form`
  ${tw`
    flex
    flex-col
    items-center
  `}
`;

const Message = styled.p`
  ${tw`
    text-center
    text-lg
  `}
`;

const Actions = styled.div`
  button {
    margin-right: 20px;
  }
  ${tw`
    mt-3
    w-full
    flex
    justify-center
  `}
`;

const DeleteUserModal: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector(selectUser);

  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };

  const handleUserDelete = () => {
    dispatch(deleteUser(user?._id!));
    setIsOpen(!isOpen);
    localStorage.clear();
    navigate('/');
  };

  const styles = {
    content: {
      width: isMobile ? '90%' : '500px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      background: 'rgb(255, 255, 255',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      background: 'rgba(141, 141, 141, .6',
    }
  };

  return (
    <>
      <Button 
        type={ButtonType.Button} 
        color={ButtonColor.Danger} 
        onClick={handleOpenModal}
      >
        Delete User
      </Button>
      <Modal
        isOpen={isOpen}
        onRequestClose={handleOpenModal}
        style={styles}
      >
        <FormHeader>
          <CloseBtn onClick={handleOpenModal}>
            <FontAwesomeIcon icon={faXmark} />
          </CloseBtn>
        </FormHeader>
        <Message>
          Your account will be removed! Are you sure?
        </Message>
        <Actions>
          <Button 
            type={ButtonType.Button} 
            color={ButtonColor.Danger} 
            onClick={handleUserDelete}
          >
            Yes
          </Button>
          <Button 
            type={ButtonType.Button} 
            color={ButtonColor.Secondary} 
            onClick={handleOpenModal}
          >
            No
          </Button>
        </Actions>
      </Modal>
    </>
  )
}

export default DeleteUserModal