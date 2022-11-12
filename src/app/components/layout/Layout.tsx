import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { ILayout } from '../../../types/types';
import Footer from './Footer';
import Header from './Header';


const Container = styled.div`
  ${tw`
    w-full
    min-h-screen
    flex
    flex-col
    items-center
    bg-white
  `}
`;

const Content = styled.main`
  flex: 1;
  ${tw`
    container
    flex
  `}
`;

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <Container>
      <Header />
      <Content>
        {children}
      </Content>
      <Footer />
    </Container>
  );
};

export default Layout;