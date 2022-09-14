import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchField from '../inputs/SearchField';
import NavMenu from '../navigation/NavMenu';
import { useMediaQuery } from 'react-responsive';
import { SCREENS } from '../../services/screens';
import Logo from '../ui/Logo';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../features/user/selectors';
import { AppDispatch } from '../../features/store';
import { logout } from '../../features/user/reducers';
import Cart from '../modals/Cart';


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

const UserActions = styled.div`
  font-size: 20px;
  ${tw`
    relative
    flex
    items-center
  `}
`;

const ProfileBtn = styled(Link)`
  ${tw`
    p-3
    mr-5
    text-gray-700
    hover:text-white
    transition
    ease-in
    delay-100
  `}
`;

const LoginBtn = styled(Link)`
  ${tw`
    mr-3
    text-sm
    hover:text-white
    transition
    ease-in
    delay-100
  `}
`;

const LogoutBtn = styled.button`
  ${tw`
    mr-3
    text-sm
    hover:text-white
    font-medium
    underline
    transition
    ease-in
    delay-100
  `}
`;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  
  return (
    <Container>
      <Content>
        <MenuContainer>
          <NavMenu />
          <Logo />
        </MenuContainer>
        {!isMobile && <SearchField />}
        <UserActions>
          {
            user ? (
              <>
                <ProfileBtn to='/settings/orders'>
                  <FontAwesomeIcon icon={faUser} />
                </ProfileBtn>
                <LogoutBtn onClick={handleLogout}>
                  Logout
                </LogoutBtn>
              </>
            ) : (
              <LoginBtn to='/auth'>
                Signin/Signup
              </LoginBtn>
            )
          }
          <Cart />
        </UserActions>
      </Content>
    </Container>
  );
};

export default Header;