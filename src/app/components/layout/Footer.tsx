import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useTranslation } from 'react-i18next';
import { footerLinks } from '../../data';
import Logo from '../ui/Logo';
import { FOOTER_BACKGROUND_COLOR } from '../../services/constants';


const Container = styled.header`
  background-color: ${FOOTER_BACKGROUND_COLOR};
  ${tw`
    min-w-full
    flex
    justify-center
    px-4
  `}
`;

const Content = styled.div`
  ${tw`
    container
    pt-10
    pb-4
    w-full
    flex
    flex-col
    justify-between
    md:items-start
    md:flex-row
    md:px-0
  `}
`;

const FooterSection = styled.div`
  ${tw`
    mt-6
    md:mt-0
    text-center
    md:text-left
  `}
`;

const FooterHeading = styled.h6`
  ${tw`
    font-bold
    text-lg
    md:text-base
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
    my-3
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
  const { t } = useTranslation(['footer']);

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
                  {t(link.title)}
                </NavLink>
              </NavItem>
            ))}
          </LinkList>
        </FooterSection>
        <FooterSection>
          <FooterHeading>{t('forCustomers')}</FooterHeading>
          <LinkList>
            {footerLinks.forCustomers.map(link => (
              <NavItem key={link.title}>
                <NavLink to={link.to}>
                  {t(link.title)}
                </NavLink>
              </NavItem>
            ))}
          </LinkList>
        </FooterSection>
        <FooterSection>
          <FooterHeading>{t('shops')}</FooterHeading>
          <LinkList>
            {footerLinks.shops.map(link => (
              <NavItem key={link.title}>
                <NavLink to={link.to}>
                  {t(link.title)}
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