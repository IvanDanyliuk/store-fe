import React, { ReactNode } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import Footer from './Footer';
import Header from './Header';


interface ILayout {
  children: ReactNode;
}

const Container = styled.header`
  ${tw`
    min-w-full
    flex
    justify-center
  `}
`;

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <>
      <Header />
      <Container>
        {children}
      </Container>
      <Footer />
    </>
  );
};

export default Layout;