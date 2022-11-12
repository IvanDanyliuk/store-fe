import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { ICheckbox } from '../../../types/types';


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


const Checkbox: React.FC<ICheckbox> = (
  { 
    name, 
    label,
    checked,
    onChange, 
  }
) => {
  return (
    <Container>
      {
        label && (
          <Label>{label}</Label>
        )
      }
      <Field 
        name={name} 
        type='checkbox'
        checked={checked}
        onChange={onChange} 
      />
    </Container>
  );
};

export default Checkbox;