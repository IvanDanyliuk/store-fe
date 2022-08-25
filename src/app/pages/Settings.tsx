import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { faHeart, faPenToSquare, faUser } from '@fortawesome/free-regular-svg-icons';
import { faCommentDollar, faListCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getFormattedTitle } from '../helpers/helpers';


const Container = styled.div`
  ${tw`
    w-full
    md:flex
  `}
`;

const PageNavigation = styled.div`
  ${tw`
    p-3
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
  background: rgb(229, 250, 255);
  &:hover {
    background: rgb(151, 236, 255);
  }
  &.active {
    background: rgb(151, 236, 255);
  }
`;

const LinkTitle = styled.div`
  ${tw`
    pt-2
    pb-2
    pl-3
    pr-3
  `}
`;

const LinkText = styled.span`
  ${tw`
    ml-2
    hidden
    md:inline
    font-semibold
  `}
`;

const PageContent = styled.div`
  ${tw`
    p-3
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
  ${tw`
  
  `}
`;


const Settings: React.FC = () => {
  const { pathname } = useLocation();
  const title = getFormattedTitle(pathname, 2);

  const isAdmin = true;

  return (
    <Container>
      <PageNavigation>
        <UserData>
          <AvatarContainer>
            <Avatar src={'https://images.indianexpress.com/2022/06/pirates-of-the-caribbean-johnny-depp-1200.jpg'} alt='' />
          </AvatarContainer>
          <UserName>Jack Sparrow</UserName>
        </UserData>
        <NavLinks>
          <NavItem>
            <Link to='orders'>
              <LinkTitle>
                <FontAwesomeIcon icon={faListCheck} />
                <LinkText>My Orders</LinkText>
              </LinkTitle>
            </Link>
          </NavItem>
          <NavItem>
            <Link to='wish-list'>
              <LinkTitle>
                <FontAwesomeIcon icon={faHeart} />
                <LinkText>My Wish List</LinkText>
              </LinkTitle>
            </Link>
          </NavItem>
          <NavItem>
            <Link to='reviews'>
              <LinkTitle>
                <FontAwesomeIcon icon={faCommentDollar} />
                <LinkText>My Reviews</LinkText>
              </LinkTitle>
            </Link>
          </NavItem>
          <NavItem>
            <Link to='profile'>
              <LinkTitle>
                <FontAwesomeIcon icon={faUser} />
                <LinkText>Profile</LinkText>
              </LinkTitle>
            </Link>
          </NavItem>
          {
            isAdmin && (
              <NavItem>
                <Link to='editor'>
                  <LinkTitle>
                    <FontAwesomeIcon icon={faPenToSquare} />
                    <LinkText>Editor</LinkText>
                  </LinkTitle>
                </Link>
              </NavItem>
            )
          }
        </NavLinks>
      </PageNavigation>
      <PageContent>
        <PageTitle>{title}</PageTitle>
        <Content>
          <Outlet />
        </Content>
      </PageContent>
    </Container>
  );
};

export default Settings;