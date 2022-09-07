import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';
import Modal from 'react-modal';
import { selectUser } from '../../features/user/selectors';
import Button from '../ui/Button';
import { ButtonColor, ButtonType } from '../../../types/types';
import { useMediaQuery } from 'react-responsive';
import { SCREENS } from '../../services/screens';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { AppDispatch } from '../../features/store';
import { updateUser } from '../../features/user/asyncActions';


Modal.setAppElement('#root');

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

const EditUserDataModal: React.FC = () => {
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

  const handleUserDataChange = (e: any) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateDataSubmit = (e: any) => {
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
      background: 'rgb(255, 255, 255',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      background: 'rgba(141, 141, 141, .6',
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
        Edit Profile
      </Button>
      <Modal
        isOpen={isOpen}
        onRequestClose={handleOpenModal}
        style={styles}
      >
        <FormHeader>
          <FormTitle>Edit your profile data</FormTitle>
          <CloseBtn onClick={handleOpenModal}>
            <FontAwesomeIcon icon={faXmark} />
          </CloseBtn>
        </FormHeader>
        <Form onSubmit={handleUpdateDataSubmit}>
          <Label>First Name</Label>
          <Input 
            name='firstName' 
            value={userData.firstName} 
            onChange={handleUserDataChange} 
          />
          <Label>Last Name</Label>
          <Input 
            name='lastName' 
            value={userData.lastName} 
            onChange={handleUserDataChange} 
          />
          <Label>Email</Label>
          <Input 
            name='email' 
            value={userData.email} 
            onChange={handleUserDataChange} 
          />
          <Label>Phone</Label>
          <Input 
            name='phone' 
            value={userData.phone} 
            onChange={handleUserDataChange} 
          />
          <Label>City</Label>
          <Input 
            name='city' 
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