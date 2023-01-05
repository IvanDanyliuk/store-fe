import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';


const Container = styled.div`
  ${tw`
    font-normal
    text-xs
    text-center
  `}
`;


const Copyright: React.FC = () => {
  const year = new Date().getFullYear();
  
  return (
    <Container>All Rights Reserved. {year}</Container>
  );
};

export default Copyright;