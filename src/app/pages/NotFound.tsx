import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { PRIMARY_COLOR } from '../services/constants';


const Container = styled.div`
  min-height: 30vh;
  flex: 1;
  ${tw`
    w-full
    flex
    flex-col
    justify-center
    items-center
  `}
  svg {
    font-size: 50px;
    color: ${PRIMARY_COLOR};
  }
`;

const Message = styled.div`
  ${tw`
    text-lg
    font-semibold
  `}
`;


const NotFound: React.FC = () => {
  const { t } = useTranslation(['notfound']);

  return (
    <Container>
      <FontAwesomeIcon icon={faQuestion} />
      <Message>{t('notFoundMessage')}</Message>
    </Container>
  );
};

export default NotFound;