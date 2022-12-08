import React, { SyntheticEvent, ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';
import Modal from 'react-modal';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { SCREENS } from '../../services/screens';
import { AppDispatch } from '../../features/store';
import { updatePassword } from '../../features/user/asyncActions';
import { selectError, selectUser } from '../../features/user/selectors';
import Button from '../ui/Button';
import { ButtonColor, ButtonType } from '../../../types/types';
import { clearError } from '../../features/user/reducers';
import Input from '../inputs/Input';
import { BASIC_BACKGROUND_WHITE, MODAL_OVERLAY_COLOR } from '../../services/constants';


if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root');

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

const ErrorMessage = styled.p`
  ${tw`
    mt-3
    mb-3
    text-center
    text-red-500
  `}
`;


const UpdatePasswordModal: React.FC = () => {
  const { t } = useTranslation(['modals']);
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

  const handleDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e: SyntheticEvent) => {
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
      background: BASIC_BACKGROUND_WHITE,
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      background: MODAL_OVERLAY_COLOR,
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
        {t('updatePasswordBtn')}
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
          <Input
            name='curPassword'
            label={t('updatePasswordCurrentPassword')}
            type='password'
            value={passwordData.curPassword}
            onChange={handleDataChange}
          />
          <Input
            name='newPassword'
            label={t('updatePasswordNewPassowrd')}
            type='password'
            value={passwordData.newPassword}
            onChange={handleDataChange}
          />
          <Input
            name='confNewPassword'
            label={t('updatePasswordConfirmNewPassword')}
            type='password'
            value={passwordData.confNewPassword}
            onChange={handleDataChange}
          />
          {
            error === 'error' && (
              <ErrorMessage>
                {t('updatePasswordErrorMessage')}
              </ErrorMessage>
            )
          }
          <Button 
            type={ButtonType.Submit} 
            color={ButtonColor.Success}
          >
            {t('updatePasswordSubmitBtn')}
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default UpdatePasswordModal;