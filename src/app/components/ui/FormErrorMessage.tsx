import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useTranslation } from 'react-i18next';
import { IFormErrorMessage } from '../../../types/types';


const Container = styled.div``;

const ErrorMessage = styled.div`
  ${tw`
    pb-2
    text-center
    text-red-500
    text-sm
  `}
`;


const FormErrorMessage: React.FC<IFormErrorMessage> = ({ error }) => {
  const { t } = useTranslation(['modals']);
  
  return (
    <Container>
      {
        error && (
          <ErrorMessage>{t(error)}</ErrorMessage>
        )
      }
    </Container>
  );
};

export default FormErrorMessage;