import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useMediaQuery } from 'react-responsive';
import { SCREENS } from '../../services/screens';
import { AppDispatch } from '../../features/store';
import { updatePassword } from '../../features/user/asyncActions';
import { selectError, selectUser } from '../../features/user/selectors';
import Button from '../ui/Button';
import { ButtonColor, ButtonType } from '../../../types/types';
import { clearError } from '../../features/user/reducers';


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

const Label = styled.label`
  ${tw`
    w-full
    font-semibold
    text-sm
    text-gray-500
    text-left
  `}
`;

const Input = styled.input`
  ${tw`
    mb-2
    p-1
    w-full
    border
    rounded
  `}
`;

const ErrorMessage = styled.p`
  ${tw`
    mt-3
    mb-3
    text-center
    text-red-500
  `}
`;


const UpdatePasswordModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const error = useSelector(selectError);

  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

  const [isOpen, setIsOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    userId: '',
    curPassword: '',
    newPassword: '',
    confNewPassword: '',
  });

  const clear = () => {
    setPasswordData({
      userId: user!._id!,
      curPassword: '',
      newPassword: '',
      confNewPassword: '',
    });
    setIsOpen(false);
  };

  const handleOpenModal = () => {
    if(isOpen && error === 'error') {
      dispatch(clearError());
    }
    setIsOpen(!isOpen);
  };

  const handleDataChange = (e: any) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    if(passwordData.newPassword === passwordData.confNewPassword) {
      dispatch(updatePassword({
        id: passwordData.userId,
        currentPassword: passwordData.curPassword,
        newPassword: passwordData.newPassword
      }));
    }
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

  useEffect(() => {
    if(user) {
      setPasswordData({
        ...passwordData,
        userId: user._id!
      });
    }
  }, []);

  useEffect(() => {
    if(error !== 'error') {
      clear();
    }
  }, [error]);

  return (
    <>
      <Button 
        type={ButtonType.Button} 
        color={ButtonColor.Secondary} 
        onClick={handleOpenModal}
      >
        Change password
      </Button>
      <Modal
        isOpen={isOpen}
        onRequestClose={handleOpenModal}
        style={styles}
      >
        <FormHeader>
          <CloseBtn onClick={clear}>
            <FontAwesomeIcon icon={faXmark} />
          </CloseBtn>
        </FormHeader>
        <Form onSubmit={handleFormSubmit}>
          <Label>Current Password</Label>
          <Input 
            name='curPassword' 
            type='password'
            value={passwordData.curPassword} 
            onChange={handleDataChange} 
          />
          <Label>New Password</Label>
          <Input 
            name='newPassword' 
            type='password'
            value={passwordData.newPassword} 
            onChange={handleDataChange} 
          />
          <Label>Confirm New Password</Label>
          <Input 
            name='confNewPassword' 
            type='password'
            value={passwordData.confNewPassword} 
            onChange={handleDataChange} 
          />
          {
            error === 'error' && (
              <ErrorMessage>
                Wrong credentials! Make sure data you entered is correct.
              </ErrorMessage>
            )
          }
          <Button 
            type={ButtonType.Submit} 
            color={ButtonColor.Success}
          >
            Submit
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default UpdatePasswordModal;