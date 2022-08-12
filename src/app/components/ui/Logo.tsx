import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';


const LogoContainer = styled(Link)`
  ${tw`
    text-xl
    text-white
    font-bold
    tracking-wider
  `}
`;

const Logo: React.FC = () => {
  return (
    <LogoContainer to='/'>eStore</LogoContainer>
  );
};

export default Logo;