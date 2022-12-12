import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useTranslation } from 'react-i18next';
import { ITextArea } from '../../../types/types';


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

const Field = styled.textarea`
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


const TextArea: React.FC<ITextArea> = (
  { 
    name, 
    label, 
    value, 
    rows,
    minLength,
    maxLength,
    onChange, 
    isRequired 
  }
) => {
  const { t } = useTranslation(['ui']);
  const [error, setError] = useState('');

  const validateFieldValue = (value: string | number) => {
    switch(true) {
      case isRequired && value === '':
        setError(`${t('inputFieldRequired')}`);
        break;
      case typeof value === 'string' && value.length < minLength!:
        setError(`${t('inputMinLength1')} ${minLength} ${t('inputMinLength2')}`);
        break;
      case typeof value === 'string' && value.length > maxLength!:
        setError(`${t('inputMaxLength1')} ${maxLength} ${t('inputMaxLength2')}`);
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
        value={value}
        rows={rows}
        onChange={onChange} 
        onBlur={() => validateFieldValue(value)} 
      />
      <ErrorMessage>{error}</ErrorMessage>
    </Container>
  );
};

export default TextArea;