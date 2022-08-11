import React from 'react';
import styled from 'styled-components';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import tw from 'twin.macro';
import styles from './styles';


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

const menuLinks = [
  {
    to: '/products/laptops',
    title: 'Laptops and PC',
  },
  {
    to: '/products/phones',
    title: 'Cellphones, TV, and Electronics',
  },
  {
    to: '/products/gamers',
    title: 'For Gamers',
  },
  {
    to: '/products/household_appliances',
    title: 'Household Appliances',
  },
  {
    to: '/products/household_goods',
    title: 'Household Goods',
  },
  {
    to: '/products/tools_and_auto',
    title: 'Tools and Autogoods',
  },
  {
    to: '/products/blumbing_repair',
    title: 'Blumbing and Repair',
  },
  {
    to: '/products/sports_hobbies',
    title: 'Sport and Hobbies',
  },
  {
    to: '/products/children',
    title: 'Goods For Children',
  },
  {
    to: '/products/clothes',
    title: 'Clothes, Footwear, and Accessories',
  },
  {
    to: '/products/office',
    title: 'Office, School, and Books',
  },
  {
    to: '/products/health',
    title: 'Health and Beauty',
  },
  {
    to: '/products/food',
    title: 'Food and Alcohol',
  },
];

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