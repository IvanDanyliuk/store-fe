import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowRight, faHandshake, faLocationDot, faTags } from '@fortawesome/free-solid-svg-icons';
import { SCREENS } from '../services/screens';
import { PRIMARY_COLOR } from '../services/constants';


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

const Steps = styled.div`
  ${tw`
    w-full
    flex
    flex-col
    md:flex-row
    justify-between
    
  `}
`;

const Step = styled.div`
  ${tw`
    my-6
    w-full
    md:w-1/4
    text-center
  `}
  svg {
    margin-bottom: 20px;
    font-size: 85px;
    color: ${PRIMARY_COLOR};
  }
`;

const StepText = styled.p`
  ${tw`
    text-2xl
    font-semibold
  `}
`;

const Arrow = styled.div`
  color: ${PRIMARY_COLOR};
  ${tw`
    h-full
    flex
    justify-center
    items-center
    text-4xl
  `}
`;

const BottomText = styled.p`
  ${tw`
    mt-12
    mb-6
    text-xl
    text-center
  `}
`;


const Tradein: React.FC = () => {
  const { t } = useTranslation(['tradein']);
  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

  return (
    <Container>
      <Title>
        {t('pageTitle')}
      </Title>
      <Steps>
        <Step>
          <FontAwesomeIcon icon={faLocationDot} />
          <StepText>{t('step1')}</StepText>
        </Step>
        <Arrow>
          <FontAwesomeIcon icon={isMobile ? faArrowDown : faArrowRight} />
        </Arrow>
        <Step>
          <FontAwesomeIcon icon={faHandshake} />
          <StepText>{t('step2')}</StepText>
        </Step>
        <Arrow>
          <FontAwesomeIcon icon={isMobile ? faArrowDown : faArrowRight} />
        </Arrow>
        <Step>
          <FontAwesomeIcon icon={faTags} />
          <StepText>{t('step3')}</StepText>
        </Step>
      </Steps>
      <BottomText>
        {t('addInfo')}
      </BottomText>
    </Container>
  );
};

export default Tradein;