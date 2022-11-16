import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';


const Container = styled.div`
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
    color: rgb(63, 197, 255);
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