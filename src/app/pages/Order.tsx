import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';
import OrderForm from '../components/order/OrderForm';
import ShoppingList from '../components/order/ShoppingList';
import { selectCartData } from '../features/cart/selectors';
import { AppDispatch } from '../features/store';
import { selectUser } from '../features/user/selectors';


interface ICustomer {
  firstName: string | undefined,
  lastName: string | undefined,
  phone: string | undefined,
  email: string | undefined,
}


const Container = styled.div`
  ${tw`
    w-full
    flex
  `}
`;

const OrderDetails = styled.div`
  ${tw`
    w-3/4
  `}
`;

const Title = styled.h3`
  ${tw`
    mb-3
    text-lg
    font-semibold
  `}
`;

const SubTitle = styled.h6`
  ${tw`
    mb-2
    flex
    items-center
    text-base
    font-semibold
    leading-none
  `}
`;

const SubTitleNum = styled.span`
  background-color: rgb(63, 197, 255);
  ${tw`
    mr-1
    w-6
    h-6
    flex
    justify-center
    items-center
    text-white
    rounded-xl
  `}
`;

const SubTitleText = styled.span`
  ${tw`
  
  `}
`;

const AcceptOrderSection = styled.div`
  ${tw`
  
  `}
`;

const DetailsSection = styled.div`
  ${tw`
    mb-6
  `}
`;


const Order: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const cart = useSelector(selectCartData);

  const [customer, setCustomer] = useState<ICustomer>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });

  const [receiver, setReceiver] = useState<ICustomer>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });

  const handleCustomerDataChange = (e: any) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const handleReceiverDataChange = (e: any) => {
    setReceiver({
      ...receiver,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setCustomer({
      firstName: user?.firstName,
      lastName: user?.lastName,
      phone: user?.phone,
      email: user?.email,
    });
    setReceiver({
      firstName: user?.firstName,
      lastName: user?.lastName,
      phone: user?.phone,
      email: user?.email,
    })
  }, [user]);

  return (
    <Container>
      <OrderDetails>
        <Title>Placing an Order</Title>
        <DetailsSection>
          <SubTitle>
            <SubTitleNum>1</SubTitleNum>
            <SubTitleText>Your contact data</SubTitleText>
          </SubTitle>
          <OrderForm 
            data={customer} 
            onChange={handleCustomerDataChange} 
          />
        </DetailsSection>
        <DetailsSection>
          <SubTitle>
            <SubTitleNum>2</SubTitleNum>
            <SubTitleText>Shipping</SubTitleText>
          </SubTitle>
        </DetailsSection>
        <DetailsSection>
          <SubTitle>
            <SubTitleNum>3</SubTitleNum>
            <SubTitleText>Order Details</SubTitleText>
          </SubTitle>
          <ShoppingList cart={cart} />
        </DetailsSection>
        <DetailsSection>
          <SubTitle>
            <SubTitleNum>4</SubTitleNum>
            <SubTitleText>Receiver's contact data</SubTitleText>
          </SubTitle>
          <OrderForm 
            data={receiver} 
            onChange={handleReceiverDataChange} 
          />
        </DetailsSection>
      </OrderDetails>
      <AcceptOrderSection>

      </AcceptOrderSection>
    </Container>
  );
};

export default Order;