import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useTranslation } from 'react-i18next';


const Container = styled.div`
  ${tw`
    pl-3
    pr-3
    w-full
    flex
    flex-col
  `}
`;

const Title = styled.h3`
  ${tw`
    mt-6
    mb-6
    text-xl
    font-semibold
  `}
`;

const TopText = styled.p`
  ${tw`
    text-lg
  `}
`;

const RequirementsTitle = styled.p`
  ${tw`
    mt-5
    mb-3
    font-semibold
  `}
`;

const RequirementsList = styled.ul``;

const RequirementItem = styled.li`
  ${tw`
    mb-2
    ml-3
  `}
`;

const ContactInfo = styled.p`
  ${tw`
    font-medium
  `}
`;


const Partnership: React.FC = () => {
  const { t } = useTranslation(['partnership']);
  
  return (
    <Container>
      <Title>
        {t('pageTitle')}
      </Title>
      <TopText>
        {t('pageTopText')}
      </TopText>
      <RequirementsTitle>
        {t('listTitle')}
      </RequirementsTitle>
      <RequirementsList>
        <RequirementItem>
          {t('listItem1')}
        </RequirementItem>
        <RequirementItem>
          {t('listItem2')}
        </RequirementItem>
        <RequirementItem>
          {t('listItem3')}
        </RequirementItem>
        <RequirementItem>
          {t('listItem4')}
        </RequirementItem>
        <RequirementItem>
          {t('listItem5')}
        </RequirementItem>
        <RequirementItem>
          {t('listItem6')}
        </RequirementItem>
        <RequirementItem>
          {t('listItem7')}
        </RequirementItem>
      </RequirementsList>
      <RequirementsTitle>
        {t('contactTitle')}: 
        <ContactInfo>partnership@estore.com</ContactInfo>
      </RequirementsTitle>
    </Container>
  );
};

export default Partnership;