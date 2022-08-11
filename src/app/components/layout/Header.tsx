import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import NavMenu from '../navigation/NavMenu';


const Container = styled.header`
  background-color: rgb(63, 197, 255);
  ${tw`
    min-w-full
    flex
    justify-center
  `}
`;

const Content = styled.div`
  ${tw`
    container
    h-20
    flex
    justify-between
    items-center
  `}
`;

const MenuContainer = styled.div`
  ${tw`
    relative
    w-full
    h-full
    flex
    items-center
  `}
`;

const Logo = styled(Link)`
  ${tw`
    text-xl
    text-white
    font-bold
    tracking-wider
  `}
`;

const Header: React.FC = () => {
  return (
    <Container>
      <Content>
        <MenuContainer>
          <NavMenu />
          <Logo to='/'>eStore</Logo>
        </MenuContainer>
      </Content>
    </Container>
  );
};

export default Header;