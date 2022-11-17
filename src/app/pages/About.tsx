import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useTranslation } from 'react-i18next';


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

const Text = styled.p`
  ${tw`

  `}
`;

const Logo = styled.h1`
  color: rgb(63, 197, 255);
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
  color: rgb(63, 197, 255);
  ${tw`
    text-2xl
    font-bold
  `}
`;

const IndicatorText = styled.span`
  ${tw`
  
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
          <IndicatorText>
            {t('indicatorTextOne')}
          </IndicatorText>
        </Indicator>
        <Indicator>
          <IndicatorNum>
            {t('indicatorNumTwo')}
          </IndicatorNum>
          <IndicatorText>
            {t('indicatorTextTwo')}
          </IndicatorText>
        </Indicator>
        <Indicator>
          <IndicatorNum>
            {t('indicatorNumThree')}
          </IndicatorNum>
          <IndicatorText>
            {t('indicatorTextThree')}
          </IndicatorText>
        </Indicator>
        <Indicator>
          <IndicatorNum>
            {t('indicatorNumFour')}
          </IndicatorNum>
          <IndicatorText>
            {t('indicatorTextFour')}
          </IndicatorText>
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