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

const AuthForm = styled.form`
  ${tw`
    
  `}
`;

const Fieldset = styled.fieldset`
  ${tw`

  `}
`;

const Label = styled.label`
  ${tw`
    font-semibold
    text-sm
    text-gray-500
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

  const [isSignUp, setIsSignUp] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    city: '',
    avatarUrl: '',
    orders: [],
    isAdmin: false,
  });

  const handleModeChange = () => {
    setIsSignUp(!isSignUp);
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
      avatarUrl: '',
      orders: [],
      isAdmin: false,
    });
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    if(isSignUp) {
      if(userData.email && userData.password) {
        try {
          await dispatch(signin({ email: userData.email, password: userData.password }));
          clearForm();
          navigate('/');
        } catch (error) {
          console.log('Something went wrong...');
        }
      }
    } else {
      try {
        await dispatch(signup(userData));
        clearForm();
        navigate('/');
      } catch (error) {
        console.log('Something went wrong...');
      }
    }
  };

  return (
    <Container>
      <AuthContainer>
        <Title>
          {isSignUp ? 'Sign In' : 'Sign Up'}
        </Title>
        <AuthForm onSubmit={handleFormSubmit}>
          {
            !isSignUp && (
              <>
                <Fieldset>
                  <Label>First Name</Label>
                  <Input 
                    name='firstName' 
                    value={userData.firstName} 
                    onChange={handleUserDataChange} 
                  />
                </Fieldset>
                <Fieldset>
                  <Label>Last Name</Label>
                  <Input 
                    name='lastName' 
                    value={userData.lastName} 
                    onChange={handleUserDataChange} 
                  />
                </Fieldset>
              </>
            )
          }
          <Fieldset>
            <Label>Email</Label>
            <Input 
              name='email' 
              value={userData.email} 
              
              onChange={handleUserDataChange} 
            />
          </Fieldset>
          <Fieldset>
            <Label>Password</Label>
            <Input 
              name='password' 
              type='password'
              value={userData.password} 
              onChange={handleUserDataChange} 
            />
          </Fieldset>
          {
            !isSignUp && (
              <>
                <Fieldset>
                  <Label>Confirm Password</Label>
                  <Input 
                    name='confirmPassword' 
                    type='password'
                    value={userData.confirmPassword} 
                    onChange={handleUserDataChange} 
                  />
                </Fieldset>
                <Fieldset>
                  <Label>Phone</Label>
                  <Input 
                    name='phone' 
                    value={userData.phone} 
                    onChange={handleUserDataChange} 
                  />
                </Fieldset>
                <Fieldset>
                  <Label>City</Label>
                  <Input 
                    name='city' 
                    value={userData.city} 
                    onChange={handleUserDataChange} 
                  />
                </Fieldset>
                <Fieldset>
                  <Label>Profile Photo</Label>
                  <Input 
                    name='avatarImg' 
                    type='file'
                    onChange={handleImageUpload} 
                  />
                </Fieldset>
              </>
            )
          }
          <Actions>
            <Button type={ButtonType.Submit} color={ButtonColor.Success}>
              {!isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
            <ChangeModeBtn type='button' onClick={handleModeChange}>
              {!isSignUp ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'}
            </ChangeModeBtn>
          </Actions>
        </AuthForm>
      </AuthContainer>
    </Container>
  )
}

export default Auth