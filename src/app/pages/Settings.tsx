import { faHeart, faPenToSquare, faUser } from '@fortawesome/free-regular-svg-icons';
import { faComment, faCommentDollar, faListCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';


const Container = styled.div`
  ${tw`
    w-full
    flex
  `}
`;

const PageNavigation = styled.div`
  ${tw`
    p-3
    w-1/6
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
  
  `}
`;

const NavItem = styled.li`
  background: rgb(229, 250, 255);
  &:hover {
    background: rgb(151, 236, 255);
  }
  ${tw`
    mb-1
    rounded-sm
    transition
    ease-in
  `}
`;

const NavLink = styled(Link)``;

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
    font-semibold
  `}
`;

const PageContent = styled.div`
  ${tw`
    p-3
    w-5/6
  `}
`;

const PageTitle = styled.h3`
  ${tw`
  
  `}
`;

const Content = styled.div`
  ${tw`
  
  `}
`;


const Settings = () => {
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
            <NavLink to='orders'>
              <LinkTitle>
                <FontAwesomeIcon icon={faListCheck} />
                <LinkText>My Orders</LinkText>
              </LinkTitle>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to='wish-list'>
              <LinkTitle>
                <FontAwesomeIcon icon={faHeart} />
                <LinkText>My Wish List</LinkText>
              </LinkTitle>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to='reviews'>
              <LinkTitle>
                <FontAwesomeIcon icon={faCommentDollar} />
                <LinkText>My Reviews</LinkText>
              </LinkTitle>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to='profile'>
              <LinkTitle>
                <FontAwesomeIcon icon={faUser} />
                <LinkText>Profile</LinkText>
              </LinkTitle>
            </NavLink>
          </NavItem>
          {
            isAdmin && (
              <NavItem>
                <NavLink to='editor'>
                  <LinkTitle>
                    <FontAwesomeIcon icon={faPenToSquare} />
                    <LinkText>Editor</LinkText>
                  </LinkTitle>
                </NavLink>
              </NavItem>
            )
          }
        </NavLinks>
      </PageNavigation>
      <PageContent>
        <PageTitle>Title</PageTitle>
        <Content>
          <Outlet />
        </Content>
      </PageContent>
    </Container>
  );
};

export default Settings;