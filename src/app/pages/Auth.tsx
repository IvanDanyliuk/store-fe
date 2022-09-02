import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { ButtonColor, ButtonType } from '../../types/types';
import Button from '../components/ui/Button';


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
  const [isSignUp, setIsSignUp] = useState(false);

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    city: '',
    avatarUrl: '',
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

  return (
    <Container>
      <AuthContainer>
        <Title>
          {isSignUp ? 'Sign In' : 'Sign Up'}
        </Title>
        <AuthForm>
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
                    onChange={handleUserDataChange} 
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