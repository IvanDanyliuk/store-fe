import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useTranslation } from 'react-i18next';
import { PRIMARY_COLOR } from '../services/constants';


const Container = styled.div`
  ${tw`
    p-3
  `}
`;

const Title = styled.h2`
  ${tw`
    text-2xl
    font-bold
  `}
`;

const SubTitle = styled.h3`
  ${tw`
    mt-6
    text-xl
    font-semibold
  `}
`;

const Text = styled.p``;

const Logo = styled.h1`
  color: ${PRIMARY_COLOR};
  ${tw`
    mt-6
    text-7xl
    font-bold
    text-center
  `}
`;

const KeyIndicators = styled.ul`
  ${tw`
    mt-6
    p-3
    w-full
    flex
    flex-col
    md:flex-row
    md:flex-wrap
    items-center
  `}
`;

const Indicator = styled.li`
  ${tw`
    mb-5
    w-1/2
    flex
    flex-col
  `}
`;

const IndicatorNum = styled.span`
  color: ${PRIMARY_COLOR};
  ${tw`
    text-2xl
    font-bold
  `}
`;


const About: React.FC = () => {
  const { t } = useTranslation(['about']);

  return (
    <Container>
      <Title>
        {t('title')}
      </Title>
      <SubTitle>
        {t('subtitleOne')}
      </SubTitle>
      <Text>
        {t('sectionTextOne')}
      </Text>
      <Logo>
        {t('logo')}
      </Logo>
      <SubTitle>
        {t('subtitleTwo')}
      </SubTitle>
      <Text>
        {t('sectionTextTwo')}
      </Text>
      <KeyIndicators>
        <Indicator>
          <IndicatorNum>
            {t('indicatorNumOne')}
          </IndicatorNum>
          <span>
            {t('indicatorTextOne')}
          </span>
        </Indicator>
        <Indicator>
          <IndicatorNum>
            {t('indicatorNumTwo')}
          </IndicatorNum>
          <span>
            {t('indicatorTextTwo')}
          </span>
        </Indicator>
        <Indicator>
          <IndicatorNum>
            {t('indicatorNumThree')}
          </IndicatorNum>
          <span>
            {t('indicatorTextThree')}
          </span>
        </Indicator>
        <Indicator>
          <IndicatorNum>
            {t('indicatorNumFour')}
          </IndicatorNum>
          <span>
            {t('indicatorTextFour')}
          </span>
        </Indicator>
      </KeyIndicators>
      <SubTitle>
        {t('subtitleThree')}
      </SubTitle>
      <Text>
        {t('sectionTextThree')}
      </Text>
    </Container>
  );
};

export default About;