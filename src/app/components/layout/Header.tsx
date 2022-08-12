import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchField from '../inputs/SearchField';
import NavMenu from '../navigation/NavMenu';
import { useMediaQuery } from 'react-responsive';
import { SCREENS } from '../../services/screens';


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
    pl-4
    pr-4
    w-full
    h-20
    flex
    justify-between
    items-center
    md:pl-0
    md:pr-0
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
    mr-5
    md:mr-10
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
  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });
  
  return (
    <Container>
      <Content>
        <MenuContainer>
          <NavMenu />
          <Logo to='/'>eStore</Logo>
        </MenuContainer>
        {!isMobile && <SearchField />}
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