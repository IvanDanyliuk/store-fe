import React from 'react';
import styled from 'styled-components';
import creditCardType from 'credit-card-type';
import tw from 'twin.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcMastercard, faCcVisa } from '@fortawesome/free-brands-svg-icons';
import { faMoneyCheckDollar } from '@fortawesome/free-solid-svg-icons';


interface IPaymentSystemIconProps {
  cardNumber: string;
}

const Container = styled.div`
  ${tw`
    w-8
    text-xl
  `}
`;

const PaymentSystemIcon: React.FC<IPaymentSystemIconProps> = ({ cardNumber }) => {
  const numberToValidate = cardNumber.replace(/\s+/g, '');
  const paymentSystemType = creditCardType(numberToValidate)[0];

  const setIcon = (type: any) => {
    if(type === 'visa') {
      return faCcVisa;
    }
    return faCcMastercard;
  };

  return (
    <Container>
      <FontAwesomeIcon icon={paymentSystemType ? setIcon(paymentSystemType.type) : faMoneyCheckDollar} />
    </Container>
  );
};

export default PaymentSystemIcon;