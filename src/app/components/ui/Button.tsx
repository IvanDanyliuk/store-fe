import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { IButtonProps } from '../../../types/types';
import { setButtonColor } from '../../helpers/helpers';


const ButtonBody = styled.button`
  min-width: 90px;
  background: ${({ color }) => setButtonColor(color!)};
  ${tw`
    pt-1
    pb-1
    pl-3
    pr-3
    rounded
    text-white
    font-semibold
    hover:opacity-90
    transition
    ease-in
  `}
`;

const Button: React.FC<IButtonProps> = ({ color, type, onClick, children }) => {
  return (
    <ButtonBody color={color} type={type} onClick={onClick}>
      {children}
    </ButtonBody>
  );
};

export default Button;