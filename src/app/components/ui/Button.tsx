import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { IButtonProps } from '../../../types/types';
import { setButtonColor } from '../../helpers/helpers';


const ButtonBody = styled.button`
  min-width: 90px;
  background: ${({ color, disabled }) => disabled ? '#999999' : setButtonColor(color!)};
  ${tw`
    px-3
    py-1
    rounded
    text-white
    text-sm
    md:text-base
    font-semibold
    hover:opacity-90
    transition
    ease-in
  `}
`;

const Button: React.FC<IButtonProps> = ({ color, type, disabled, onClick, children }) => {
  return (
    <ButtonBody 
      color={color} 
      type={type} 
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </ButtonBody>
  );
};

export default Button;