import React from 'react';
import styled from 'styled-components';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import tw from 'twin.macro';
import styles from './styles';
import { menuLinks } from '../../data';


const Container = styled.div`
  ${tw`
    
  `}
`;

const Navigation = styled(Menu)`
  ${tw`
    h-full
    flex
  `}
`;

const NavList = styled.ul`
  ${tw`
    list-none
  `}
`;

const NavItem = styled.li`
  ${tw`
    mt-3
    mb-3
  `}
`;

const NavLink = styled(Link)`
  
`;

const NavMenu: React.FC = () => {
  return (
    <Navigation styles={styles} >
      <NavList>
        {menuLinks.map(link => (
          <NavItem key={link.title}>
            <NavLink to={link.to}>
              {link.title}
            </NavLink>
          </NavItem>
        ))}
      </NavList>
    </Navigation>
  );
};

export default NavMenu;