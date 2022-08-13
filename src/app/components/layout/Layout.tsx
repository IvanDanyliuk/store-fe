import React, { ReactNode } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import Footer from './Footer';
import Header from './Header';


interface ILayout {
  children: ReactNode;
}

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