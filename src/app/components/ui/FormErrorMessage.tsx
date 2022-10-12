import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';


interface IFormErrorMessage {
  error: string;
}

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
  return (
    <Container>
      {
        error && (
          <ErrorMessage>{error}</ErrorMessage>
        )
      }
    </Container>
  );
};

export default FormErrorMessage;