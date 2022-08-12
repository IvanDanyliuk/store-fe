import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import SearchField from '../inputs/SearchField';
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
    w-full
    h-20
    flex
    justify-between
    items-center
  `}
`;

const MenuContainer = styled.div`
  ${tw`
    relative
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

const UserActions = styled.div`
  font-size: 20px;
  ${tw`
    relative
    flex
  `}
`;

const ProfileBtn = styled(Link)`
  ${tw`
    p-3
    mr-10
    text-gray-700
    hover:text-white
    transition
    ease-in
    delay-100
  `}
`;

const CartBtn = styled(Link)`
  ${tw`
    p-3
    text-gray-700
    hover:text-white
    transition
    ease-in
    delay-100
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
        <SearchField />
        <UserActions>
          <ProfileBtn to='/profile/personal-info'>
            <FontAwesomeIcon icon={faUser} />
          </ProfileBtn>
          <CartBtn to='/cart'>
            <FontAwesomeIcon icon={faCartShopping} />
          </CartBtn>
        </UserActions>
      </Content>
    </Container>
  );
};

export default Header;