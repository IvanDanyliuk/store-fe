import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { footerLinks } from '../../data';
import Logo from '../ui/Logo';


const Container = styled.header`
  background-color: rgb(12, 64, 80);
  ${tw`
    min-w-full
    flex
    justify-center
  `}
`;

const Content = styled.div`
  ${tw`
    container
    pt-5
    pb-4
    pl-4
    pr-4
    w-full
    flex
    flex-col
    items-center
    md:items-start
    md:flex-row
    md:pl-0
    md:pr-0
  `}
`;

const FooterSection = styled.div`
  ${tw`
    mt-6
    md:mt-0
    md:ml-28
    text-center
    md:text-left
  `}
`;

const FooterHeading = styled.h6`
  ${tw`
    font-bold
    text-lg
    text-white
  `}
`;

const LinkList = styled.ul`
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
    text-white
    transition
    ease-in-out
  `}
`;

const Footer: React.FC = () => {
  return (
    <Container>
      <Content>
        <Logo />
        <FooterSection>
          <FooterHeading>ESTORE</FooterHeading>
          <LinkList>
            {footerLinks.estore.map(link => (
              <NavItem key={link.title}>
                <NavLink to={link.to}>
                  {link.title}
                </NavLink>
              </NavItem>
            ))}
          </LinkList>
        </FooterSection>
        <FooterSection>
          <FooterHeading>FOR CUSTOMERS</FooterHeading>
          <LinkList>
            {footerLinks.forCustomers.map(link => (
              <NavItem key={link.title}>
                <NavLink to={link.to}>
                  {link.title}
                </NavLink>
              </NavItem>
            ))}
          </LinkList>
        </FooterSection>
        <FooterSection>
          <FooterHeading>SHOPS</FooterHeading>
          <LinkList>
            {footerLinks.shops.map(link => (
              <NavItem key={link.title}>
                <NavLink to={link.to}>
                  {link.title}
                </NavLink>
              </NavItem>
            ))}
          </LinkList>
        </FooterSection>
      </Content>
    </Container>
  );
};

export default Footer;