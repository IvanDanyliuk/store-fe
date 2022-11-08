import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useTranslation } from 'react-i18next';


const Container = styled.div`
  ${tw`
    w-full
    flex
    flex-col
    md:flex-row
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


const Careers: React.FC = () => {
  const { t } = useTranslation(['careers']);

  return (
    <Container>
      <Title>
        {t('title')}      
      </Title>
    </Container>
  );
};

export default Careers;