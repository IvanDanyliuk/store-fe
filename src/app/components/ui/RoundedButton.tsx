import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { IButtonProps } from '../../../types/types';
import { setButtonColor } from '../../helpers/helpers';


const RoundedButtonBody = styled.button`
  border: 1px solid ${({ color }) => setButtonColor(color!)};
  color: ${({ color }) => setButtonColor(color!)};
  ${tw`
    w-10
    h-10
    rounded-3xl
    font-semibold
    hover:bg-gray-100
    transition
    ease-in
  `}
`;

const RoundedButton: React.FC<IButtonProps> = ({ color, type, onClick, children }) => {
  return (
    <RoundedButtonBody color={color} type={type} onClick={onClick}>
      {children}
    </RoundedButtonBody>
  );
};

export default RoundedButton;