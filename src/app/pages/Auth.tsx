import React, { useState } from 'react';
import styled from 'styled-components';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import tw from 'twin.macro';
import { storage } from '../../firebase';
import { ButtonColor, ButtonType } from '../../types/types';
import Button from '../components/ui/Button';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../features/store';
import { signin, signup } from '../features/user/asyncActions';
import { useNavigate } from 'react-router-dom';
import Input from '../components/inputs/Input';
import { isSigninDataValid, isSignupDataValid } from '../helpers/formValidation';
import FormErrorMessage from '../components/ui/FormErrorMessage';


const Container = styled.div`
  ${tw`
    pt-6
    pb-6
    w-full
    flex
    justify-center
  `}
`;

const AuthContainer = styled.div`
  ${tw`
    p-3
    border
    rounded
  `}
`;

const Title = styled.h3`
  ${tw`
    mb-3
    pb-3
    text-lg
    font-bold
    text-center
    border-b
  `}
`;

const AuthForm = styled.form``;

const Actions = styled.div`
  ${tw`
    mt-3
    mb-2
    w-full
    flex
    flex-col
    items-center
  `}
`;

const ChangeModeBtn = styled.button`
  ${tw`
    mt-2
    text-sm
  `}
`;


const Auth: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [isSignIn, setIsSignIn] = useState(true);
  const [progressPercent, setProgressPercent] = useState(0);
  const [error, setError] = useState('');
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    city: '',
    language: '',
    avatarUrl: '',
    orders: [],
    isAdmin: false,
  });

  const handleModeChange = () => {
    setIsSignIn(!isSignIn);
    clearForm();
    setError('');
  };

  const handleError = (error: string) => {
    setError(error);
  };

  const handleUserDataChange = (e: any) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e: any) => {
    e.preventDefault();

    const file = e.target?.files[0];
    if(!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadData = uploadBytesResumable(storageRef, file);

    uploadData.on('state_changed', 
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgressPercent(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadData.snapshot.ref).then((downloadUrl) => {
          setUserData({
            ...userData,
            avatarUrl: downloadUrl
          });
        })
      }
    );
  };

  const clearForm = () => {
    setUserData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      city: '',
      language: '',
      avatarUrl: '',
      orders: [],
      isAdmin: false,
    });
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    if(isSignIn) {
      const isDataValid = isSigninDataValid(
        { email: userData.email, password: userData.password }, 
        handleError
      );
      if(isDataValid) {
        try {
          await dispatch(signin({ email: userData.email, password: userData.password }));
          clearForm();
          navigate('/');
        } catch (error) {
          setError('Something went wrong...');
        }
      }
    } else {
      const isDataValid = isSignupDataValid(userData, handleError);
      if(isDataValid) {
        try {
          await dispatch(signup(userData));
          clearForm();
          navigate('/');
        } catch (error) {
          console.log('Something went wrong...');
        }
      }
    }
  };

  return (
    <Container>
      <AuthContainer>
        <Title>
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </Title>
        <FormErrorMessage error={error} />
        <AuthForm onSubmit={handleFormSubmit}>
          {
            !isSignIn && (
              <>
                <Input 
                  name='firstName'
                  label='First Name'
                  value={userData.firstName}
                  onChange={handleUserDataChange}
                  isRequired
                />
                <Input 
                  name='lastName'
                  label='Last Name'
                  value={userData.lastName}
                  onChange={handleUserDataChange}
                  isRequired
                />
              </>
            )
          }
          <Input 
            name='email'
            label='Email'
            type='email'
            value={userData.email}
            onChange={handleUserDataChange}
            isRequired
          />
          <Input 
            name='password'
            label='Password'
            type='password'
            value={userData.password}
            onChange={handleUserDataChange}
            isRequired
          />
          {
            !isSignIn && (
              <>
                <Input 
                  name='confirmPassword'
                  label='Confirm Password'
                  type='password'
                  value={userData.confirmPassword}
                  onChange={handleUserDataChange}
                  isRequired
                />
                <Input 
                  name='phone'
                  label='Phone'
                  value={userData.phone}
                  onChange={handleUserDataChange}
                  isRequired
                />
                <Input 
                  name='city'
                  label='City'
                  value={userData.city}
                  onChange={handleUserDataChange}
                  isRequired
                />
                <Input 
                  name='avatarImg'
                  label='Profile Photo'
                  type='file'
                  onChange={handleImageUpload}
                />
              </>
            )
          }
          <Actions>
            <Button type={ButtonType.Submit} color={ButtonColor.Success}>
              {!isSignIn ? 'Sign Up' : 'Sign In'}
            </Button>
            <ChangeModeBtn type='button' onClick={handleModeChange}>
              {!isSignIn ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'}
            </ChangeModeBtn>
          </Actions>
        </AuthForm>
      </AuthContainer>
    </Container>
  );
};

export default Auth;