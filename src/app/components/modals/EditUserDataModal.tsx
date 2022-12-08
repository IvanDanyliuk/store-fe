import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';
import Modal from 'react-modal';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { selectUser } from '../../features/user/selectors';
import Button from '../ui/Button';
import { ButtonColor, ButtonType } from '../../../types/types';
import { useMediaQuery } from 'react-responsive';
import { SCREENS } from '../../services/screens';
import { AppDispatch } from '../../features/store';
import { updateUser } from '../../features/user/asyncActions';
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

const FormTitle = styled.h6`
  ${tw`
    text-xl
    font-bold
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

const EditUserDataModal: React.FC = () => {
  const { t } = useTranslation(['modals']);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const token = localStorage.getItem('profile') && JSON.parse(localStorage.getItem('profile') || '').token;

  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({
    ...user!,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
  });

  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };

  const handleUserDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateDataSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUser({ id: user?._id!, userData }));
    localStorage.setItem('profile', JSON.stringify({ token, result: userData }));
    setIsOpen(!isOpen);
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
      setUserData({
        ...user,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        city: user.city,
      });
    }
  }, []);

  return (
    <>
      <Button 
        type={ButtonType.Button} 
        color={ButtonColor.Success} 
        onClick={handleOpenModal}
      >
        {t('editUserDataBtn')}
      </Button>
      <Modal
        isOpen={isOpen}
        onRequestClose={handleOpenModal}
        style={styles}
      >
        <FormHeader>
          <FormTitle>
            {t('editUserDataTitle')}
          </FormTitle>
          <CloseBtn onClick={handleOpenModal}>
            <FontAwesomeIcon icon={faXmark} />
          </CloseBtn>
        </FormHeader>
        <Form onSubmit={handleUpdateDataSubmit}>
          <Input 
            name='firstName'
            label={t('editUserDataFirstName')}
            value={userData.firstName}
            onChange={handleUserDataChange}
          />
          <Input 
            name='lastName'
            label={t('editUserDataLastName')}
            value={userData.lastName}
            onChange={handleUserDataChange}
          />
          <Input 
            name='email'
            label={t('editUserDataEmail')}
            value={userData.email}
            onChange={handleUserDataChange}
          />
          <Input 
            name='phone'
            label={t('editUserDataPhone')}
            value={userData.phone}
            onChange={handleUserDataChange}
          />
          <Input 
            name='city'
            label={t('editUserDataCity')}
            value={userData.city}
            onChange={handleUserDataChange}
          />
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

export default EditUserDataModal;