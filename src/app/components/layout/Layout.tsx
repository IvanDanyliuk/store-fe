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
    flex
    flex-col
    min-h-screen
  `}
`;

const Content = styled.main`
  flex: 1;
  ${tw`
    min-w-full
    flex
    justify-center
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