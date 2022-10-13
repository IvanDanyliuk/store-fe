import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { checkEmailFormat } from '../../helpers/formValidation';


interface IInput {
  name: string;
  type?: string;
  label?: string;
  value?: string | number;
  minLength?: number;
  maxLength?: number;
  onChange: (e: any) => void;
  isRequired?: boolean;
}

const Container = styled.div`
  ${tw`
    flex
    flex-col
  `}
`;

const Label = styled.label`
  ${tw`
    mb-1
    text-gray-500
    font-semibold
  `}
`;

const Field = styled.input`
  ${tw`
    p-2
    w-full
    border
    rounded
    mb-1
  `}
`;

const ErrorMessage = styled.div`
  ${tw`
    text-xs
    text-red-500
  `}
`;


const Input: React.FC<IInput> = (
  { 
    name, 
    type, 
    label, 
    value, 
    minLength,
    maxLength,
    onChange, 
    isRequired 
  }
) => {
  const [error, setError] = useState('');

  const validateFieldValue = (value: string | number) => {
    switch(true) {
      case isRequired && value === '':
        setError('Field is required!');
        break;
      case typeof value === 'string' && value.length < minLength!:
        setError(`Minimal length is ${minLength} characters`);
        break;
      case typeof value === 'string' && value.length > maxLength!:
        setError(`Maximal length is ${maxLength} characters`);
        break;
      case type == 'email' && typeof value == 'string' && !checkEmailFormat(value):
        setError('Invalid email!');
        break;
      default:
        setError('');
        break;
    }
  };

  return (
    <Container>
      {
        label && (
          <Label>{label}</Label>
        )
      }
      <Field 
        name={name} 
        type={type ? type : 'text'}
        value={value} 
        onChange={onChange} 
        onBlur={() => validateFieldValue(value!)} 
      />
      <ErrorMessage>{error}</ErrorMessage>
    </Container>
  );
};

export default Input;