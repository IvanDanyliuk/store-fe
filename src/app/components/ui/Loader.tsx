import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { PRIMARY_COLOR } from '../../services/constants';


const Container = styled.div`
  ${tw`
    w-full
    flex
    justify-center
    items-center
  `}
`;

const LoaderRing = styled.div`
  width: 80px;
  height: 80px;
  ${tw`
    relative
    inline-block
    animate-spin
  `}
`;

const LoaderInnerRing = styled.div`
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: ${PRIMARY_COLOR} transparent transparent transparent;
  ${tw`
    absolute
    block
    box-border
  `}
  &:nth-child(1) {
    animation-delay: -0.45s;
  }
  &:nth-child(2) {
    animation-delay: -0.3s;
  }
  &:nth-child(3) {
    animation-delay: -0.15s;
  }
`;


const Loader: React.FC = () => {
  return (
    <Container data-testid='loader'>
      <LoaderRing>
        <LoaderInnerRing />
        <LoaderInnerRing />
        <LoaderInnerRing />
        <LoaderInnerRing />
      </LoaderRing>
    </Container>
  );
};

export default Loader;