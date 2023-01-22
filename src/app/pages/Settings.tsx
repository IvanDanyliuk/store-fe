import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useTranslation } from 'react-i18next';
import { faHeart, faPenToSquare, faUser } from '@fortawesome/free-regular-svg-icons';
import { faCommentDollar, faListCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getFormattedTitle } from '../helpers/helpers';
import { selectUser } from '../features/user/selectors';
import { 
  SETTINGS_LINK_BACKGROUND, 
  SETTINGS_LINK_BACKGROUND_HOVER, 
  SETTINGS_LINK_BACKGROUND_ACTIVE 
} from '../services/constants';


const Container = styled.div`
  ${tw`
    p-2
    w-full
    md:flex
  `}
`;

const PageNavigation = styled.div`
  ${tw`
    w-full
    md:w-1/6
  `}
`;

const UserData = styled.div`
  ${tw`
    mb-5
    flex
    items-center
  `}
`;

const AvatarContainer = styled.div`
  ${tw`
    relative
    mr-2
    w-10
    h-10
    overflow-hidden
    rounded-3xl
  `}
`;

const Avatar = styled.img`
  margin: 0 auto;
  ${tw`
    inline
    w-auto
    h-full
  `}
`;

const UserName = styled.div`
  ${tw`
    font-semibold
    text-sm
    lg:text-base
  `}
`;

const NavLinks = styled.ul`
  ${tw`
    w-full
    flex
    md:flex-col
  `}
`;

const NavItem = styled.li`
  ${tw`
    w-full
    mb-1
    rounded-sm
    transition
    ease-in
    text-center
    md:text-left
  `}
`;

const Link = styled(NavLink)`
  display: block;
  background: ${SETTINGS_LINK_BACKGROUND};
  &:hover {
    background: ${SETTINGS_LINK_BACKGROUND_HOVER};
  }
  &.active {
    background: ${SETTINGS_LINK_BACKGROUND_ACTIVE};
  }
`;

const LinkTitle = styled.div`
  ${tw`
    p-2
    md:p-1
    lg:p-3
  `}
`;

const LinkText = styled.span`
  ${tw`
    ml-2
    hidden
    md:inline
    font-semibold
    md:text-sm
    lg:text-base
  `}
`;

const PageContent = styled.div`
  ${tw`
    pl-3
    pt-3
    w-full
    md:w-5/6
  `}
`;

const PageTitle = styled.h3`
  ${tw`
    text-2xl
    font-semibold
  `}
`;

const Content = styled.div`
  min-height: 100%;
  ${tw`
    flex
  `}
`;


const Settings: React.FC = () => {
  const { t } = useTranslation(['settings']);
  const { pathname } = useLocation();
  const title = getFormattedTitle(pathname, 2);
  const user = useSelector(selectUser);

  return (
    <Container>
      <PageNavigation>
        <UserData>
          <AvatarContainer>
            <Avatar src={user?.avatarUrl} alt='user_photo' />
          </AvatarContainer>
          <UserName>{`${user?.firstName} ${user?.lastName}`}</UserName>
        </UserData>
        <NavLinks>
          <NavItem>
            <Link to='orders'>
              <LinkTitle>
                <FontAwesomeIcon icon={faListCheck} />
                <LinkText>{t('orders')}</LinkText>
              </LinkTitle>
            </Link>
          </NavItem>
          <NavItem>
            <Link to='wish-list'>
              <LinkTitle>
                <FontAwesomeIcon icon={faHeart} />
                <LinkText>{t('wishList')}</LinkText>
              </LinkTitle>
            </Link>
          </NavItem>
          <NavItem>
            <Link to='reviews'>
              <LinkTitle>
                <FontAwesomeIcon icon={faCommentDollar} />
                <LinkText>{t('reviews')}</LinkText>
              </LinkTitle>
            </Link>
          </NavItem>
          <NavItem>
            <Link to='profile'>
              <LinkTitle>
                <FontAwesomeIcon icon={faUser} />
                <LinkText>{t('profile')}</LinkText>
              </LinkTitle>
            </Link>
          </NavItem>
          {
            user!.isAdmin! && (
              <NavItem>
                <Link to='editor'>
                  <LinkTitle>
                    <FontAwesomeIcon icon={faPenToSquare} />
                    <LinkText>{t('editor')}</LinkText>
                  </LinkTitle>
                </Link>
              </NavItem>
            )
          }
        </NavLinks>
      </PageNavigation>
      <PageContent>
        <PageTitle>{t(title)}</PageTitle>
        <Content>
          <Outlet />
        </Content>
      </PageContent>
    </Container>
  );
};

export default Settings;