import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Elements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import tw from 'twin.macro';
import Button from '../ui/Button';
import { ButtonColor, ButtonType } from '../../../types/types';


const stripePromise = loadStripe(`${process.env.PUBLISHABLE_KEY}`);

const Container = styled.div`
  ${tw`
  
  `}
`;


const Payment: React.FC = () => {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() =>{

  }, []);

  return (
    <Container>
      {clientSecret && (
        <Elements stripe={stripePromise}>
          <CardElement />
        </Elements>
      )}
    </Container>
  )
}

export default Payment;