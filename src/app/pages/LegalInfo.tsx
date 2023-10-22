import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import tw from 'twin.macro';


const Container = styled.div`
  ${tw`
    px-3
    w-full
    flex
    flex-col
  `}
`;

const Title = styled.h3`
  ${tw`
    my-6
    text-xl
    font-semibold
  `}
`;

const SectionTitle = styled.h6`
  ${tw`
    mb-3
    text-lg
    font-semibold
  `}
`;

const SectionText = styled.p`
  ${tw`
    mb-6
  `}
`;


const LegalInfo: React.FC = () => {
  const { t } = useTranslation(['legalinfo']);

  return (
    <Container>
      <Title>{t('pageTitle')}</Title>
      <SectionTitle>{t('sectionTitle1')}</SectionTitle>
      <SectionText>{t('sectionText1')}</SectionText>
      <SectionTitle>{t('sectionTitle2')}</SectionTitle>
      <SectionText>{t('sectionText2')}</SectionText>
      <SectionTitle>{t('sectionTitle3')}</SectionTitle>
      <SectionText>{t('sectionText3')}</SectionText>
      <SectionTitle>{t('sectionTitle4')}</SectionTitle>
      <SectionText>{t('sectionText4')}</SectionText>
    </Container>
  );
};

export default LegalInfo;