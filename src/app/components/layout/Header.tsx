import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SearchField } from '../inputs';
import NavMenu from '../navigation/NavMenu';
import { SCREENS } from '../../services/screens';
import { Logo } from '../ui';
import { selectUser } from '../../features/user/selectors';
import { AppDispatch } from '../../features/store';
import { logout } from '../../features/user/reducers';
import { Cart } from '../modals';
import { PRIMARY_COLOR } from '../../services/constants';


const Container = styled.header`
  background-color: ${PRIMARY_COLOR};
  ${tw`
    min-w-full
    flex
    justify-center
  `}
`;

const Content = styled.div`
  ${tw`
    container
    px-4
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

const UserActions = styled.div`
  font-size: 20px;
  ${tw`
    relative
    flex
    items-center
    gap-5
  `}
`;

const ProfileBtn = styled(Link)`
  ${tw`
    p-3
    text-gray-700
    hover:text-white
    transition
    ease-in
    delay-100
  `}
`;

const LoginBtn = styled(Link)`
  ${tw`
    text-sm
    hover:text-white
    transition
    ease-in
    delay-100
  `}
`;

const LogoutBtn = styled.button`
  ${tw`
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
  const { t } = useTranslation(['header']);
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
                  {t('logout')}
                </LogoutBtn>
              </>
            ) : (
              <LoginBtn to='/auth'>
                {t('signin')}
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