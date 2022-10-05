import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import Button from '../ui/Button';
import { ButtonColor, ButtonType } from '../../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { payOrder } from '../../features/order/asyncActions';
import { AppDispatch } from '../../features/store';
import { selectClientSecret, selectPaymentStatus } from '../../features/order/selectors';
import { formatCardNumber } from '../../helpers/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcVisa } from '@fortawesome/free-brands-svg-icons';
import PaymentSystemIcon from './PaymentSystemIcon';
import AcceptPaymentModal from '../modals/AcceptPaymentModal';


const Container = styled.form`
  ${tw`
    w-full
  `}
`;

const Card = styled.div`
  ${tw`
    mt-3
    mb-3
    p-8
    w-full
    md:w-96
    bg-gray-300
    rounded-md
  `}
`;

const CardTopSection = styled.div`
  ${tw`
    mb-7
  `}
`;

const CardBottomSection = styled.div`
  ${tw`
    w-full
    flex
    justify-between
  `}
`;

const Label = styled.label`
  ${tw`
    mb-1
    text-xs
  `}
`;

const Fieldset = styled.fieldset`
  ${tw`
    flex
    flex-col
  `}
`;

const CardNumberContainer = styled.div`
  ${tw`
    flex
    items-center
  `}
`;

const CardNumber = styled.input`
  ${tw`
    p-2
    w-full
    border
    rounded-md
  `}
`;

const CardPeriodContainer = styled.div`
  ${tw`
    inline-block
    bg-white
    border
    rounded-md
  `}
`;

const CardPeriod = styled.input`
  ${tw`
    p-2
    w-10
  `}
`;

const Divider = styled.span`
  ${tw`
    ml-1
    mr-2
  `}
`;

const CardCvvCode = styled.input`
  ${tw`
    p-2
    w-12
    border
    rounded-md
  `}
`;

const Form = styled.form`
  ${tw`
  
  `}
`;


const Payment: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [cardData, setCardData] = useState({
    number: '',
    month: '',
    year: '',
    code: '',
  });

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  }

  const handleCardDataChange = (e: any) => {
    setCardData({
      ...cardData,
      [e.target.name]: e.target.value,
    });
  };

  const submitCardData = () => {

  };
  
  return (
    <Container>
      <AcceptPaymentModal isOpen={isModalOpen} onClose={handleModalOpen} />
      <Card>
        <CardTopSection>
          <Fieldset>
            <Label>Card number</Label>
            <CardNumberContainer>
              {cardData.number.length > 8 && (
                <PaymentSystemIcon cardNumber={cardData.number} />
              )}
              <CardNumber 
                name='number' 
                maxLength={20} 
                value={formatCardNumber(cardData.number)} 
                onChange={handleCardDataChange} 
              />
            </CardNumberContainer>
          </Fieldset>
        </CardTopSection>
        <CardBottomSection>
          <Fieldset>
            <Label>Valid thru</Label>
            <CardPeriodContainer>
              <CardPeriod 
                name='month' 
                maxLength={2} 
                value={cardData.month} 
                onChange={handleCardDataChange} 
              />
              <Divider>/</Divider>
              <CardPeriod 
                name='year' 
                maxLength={2} 
                value={cardData.year} 
                onChange={handleCardDataChange} 
              />
            </CardPeriodContainer>
          </Fieldset>
          <Fieldset>
            <Label>CVV</Label>
            <CardCvvCode 
              name='code' 
              maxLength={3} 
              value={cardData.code} 
              onChange={handleCardDataChange} 
            />
          </Fieldset>
        </CardBottomSection>
      </Card>
      <Button 
        type={ButtonType.Button} 
        color={ButtonColor.Secondary} 
        onClick={handleModalOpen}
      >
        Pay
      </Button>
    </Container>
  );
};

export default Payment;