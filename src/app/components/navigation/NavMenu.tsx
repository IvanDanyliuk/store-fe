import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF, 
  faInstagram, 
  faTelegram, 
  faTwitter 
} from '@fortawesome/free-brands-svg-icons';
import { slide as Menu } from 'react-burger-menu';
import tw from 'twin.macro';
import { v4 as uuid } from 'uuid';
import styles from './styles';
import { pageLinks } from '../../data';
import { useMediaQuery } from 'react-responsive';
import { SCREENS } from '../../services/screens';
import SearchField from '../inputs/SearchField';
import Divider from '../ui/Divider';
import Copyright from '../ui/Copyright';
import { AppDispatch } from '../../features/store';
import { selectCategories } from '../../features/category/selectors';
import { getCategories } from '../../features/category/asyncActions';


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
  ${tw`
    text-gray-700
    hover:text-gray-800
    transition
    ease-in-out
  `}
`;

const SocialMediaLinks = styled.div`
  ${tw`
    w-full
    flex
    justify-around
  `}
`;

const SocialMediaLink = styled.a`
  ${tw`
    text-xl
  `}
`;

const NavMenu: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(selectCategories);
  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <Navigation styles={styles} >
      {isMobile && <SearchField />}
      <NavList>
        {categories.map(link => (
          <NavItem key={uuid()}>
            <NavLink to={`/categories/${link.main.url}`}>
              {link.main.title}
            </NavLink>
          </NavItem>
        ))}
        <Divider direction='horizontal' length={100} mTop={25} mBottom={25} />
        <SocialMediaLinks>
          <SocialMediaLink href='#'>
            <FontAwesomeIcon icon={faFacebookF} />
          </SocialMediaLink>
          <SocialMediaLink href='#'>
            <FontAwesomeIcon icon={faInstagram} />
          </SocialMediaLink>
          <SocialMediaLink href='#'>
            <FontAwesomeIcon icon={faTwitter} />
          </SocialMediaLink>
          <SocialMediaLink href='#'>
            <FontAwesomeIcon icon={faTelegram} />
          </SocialMediaLink>
        </SocialMediaLinks>
        <Divider direction='horizontal' length={100} mTop={25} mBottom={15} />
      </NavList>
      <NavList>
        {pageLinks.map(link => (
          <NavItem key={link.title}>
            <NavLink to={link.to}>
              {link.title}
            </NavLink>
          </NavItem>
        ))}
      </NavList>
      <Divider direction='horizontal' length={100} mTop={25} mBottom={15} />
      <Copyright />
    </Navigation>
  );
};

export default NavMenu;