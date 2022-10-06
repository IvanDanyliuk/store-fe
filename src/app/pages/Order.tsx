import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';
import { v4 as uuid } from 'uuid';
import { ButtonColor, ButtonType } from '../../types/types';
import OrderForm from '../components/order/OrderForm';
import Payment from '../components/order/Payment';
import ShoppingList from '../components/order/ShoppingList';
import Button from '../components/ui/Button';
import { selectCartData } from '../features/cart/selectors';
import { ICartItem } from '../features/cart/types';
import { getShippings } from '../features/shipping/asyncActions';
import { selectShippings, selectShippingStatus } from '../features/shipping/selectors';
import { AppDispatch } from '../features/store';
import { selectUser } from '../features/user/selectors';
import { createOrder, updateOrder } from '../features/order/asyncActions';
import { useNavigate } from 'react-router-dom';
import { selectErrorStatus, selectOrder } from '../features/order/selectors';
import { clearCart } from '../features/cart/reducers';
import { clearOrder, clearOrderToUpdate } from '../features/order/reducers';
import { calculateOrderTotalAmount } from '../helpers/helpers';


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
    flex-col
    md:flex-row
  `}
`;

const OrderDetails = styled.div`
  ${tw`
    p-3
    w-full
    md:w-3/4
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

const SubTitle = styled.h6`
  ${tw`
    mb-6
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
    relative
    md:fixed
    md:top-20
    md:right-0
    p-3
    md:p-6
    w-full
    md:w-1/4
    bg-white
  `}
`;

const DetailsSection = styled.div`
  max-height: 70vh;
  ${tw`
    mb-8
    flex
    flex-col
  `}
`;

const SelectionContainer = styled.div`
  ${tw`
  
  `}
`;

const RadioBody = styled.div``;

const RadioTitle = styled.span`
  ${tw`
    text-base
    font-semibold
  `}
`;

const RadioContainer = styled.div`
  &[data-isChecked="true"] {
    border: 1px solid rgb(63, 197, 255);
  } 
  ${tw`
    mb-3
    p-3
    rounded
  `}
`;

const Radio = styled.input`
  ${tw`
    mr-2
  `}
`;

const Select = styled.select`
  ${tw`
    mt-1
    p-2
    w-full
    border
    rounded
  `}
`;

const Option = styled.option``;

const AcceptOrderTitle = styled.div`
  ${tw`
    mb-4
    text-2xl
    font-semibold
  `}
`;

const AcceptItem = styled.div`
  ${tw`
    mb-3
    w-full
    flex
    justify-between
    items-center
  `}
`;

const AcceptSubTitleText = styled.span`
  ${tw`
    w-7/12
    text-sm
  `}
`;

const AcceptSubTitleAmount = styled.span`
  ${tw`
    w-5/12
    text-base
    font-semibold
  `}
`;

const AcceptTotalItem = styled.div`
  ${tw`
    mb-6
    w-full
    flex
    justify-between
    items-center
  `}
`;

const AcceptAmount = styled.span`
  ${tw`
    w-5/12
    text-lg
    font-semibold
  `}
`;

const BtnContainer = styled.div`
  ${tw`
    p-3
    md:p-0
    w-full
    flex
    justify-center
    md:justify-start
  `}
`;


const Order: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const order = useSelector(selectOrder);
  const user = useSelector(selectUser);
  const cart: ICartItem[] = useSelector(selectCartData);
  const shippings = useSelector(selectShippings);
  const shippingStatus = useSelector(selectShippingStatus);
  const errorStatus = useSelector(selectErrorStatus);
  
  const totalAmount = calculateOrderTotalAmount(order ? order.products : cart);

  const [currentShippingCompany, setCurrentShippingCompany] = useState('');
  const [currentShippingCity, setCurrentShippingCity] = useState('');
  const [shippingAmount, setShippingAmount] = useState(0);

  const [currentPaymentMethod, setCurrentPaymentMethod] = useState('when-receiving');

  const [customer, setCustomer] = useState<ICustomer>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });

  const [recepient, setRecepient] = useState<ICustomer>({
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
    setRecepient({
      ...recepient,
      [e.target.name]: e.target.value,
    });
  };

  const handleCurrentShippingCompanyChange = (e: any) => {
    setCurrentShippingCompany(e.target.value);
    const currentCompany = shippings.find(item => item.company === e.target.value);
    setCurrentShippingCity(currentCompany?.cities[0]!);
    setShippingAmount(currentCompany?.price!);
  };

  const handleCurrentPaymentMethodChange = (e: any) => {
    setCurrentPaymentMethod(e.target.value);
  };

  const handleCurrentShippingCityChange = (e: any) => {
    setCurrentShippingCity(e.target.value);
  };

  const submitOrder = async (e: any) => {
    if(order) {
      dispatch(updateOrder({
        id: order._id,
        updatedOrder: {
          products: order.products,
          amount: totalAmount,
          customer,
          recepient,
          isPaid: false,
          isShipped: false,
          shippingCity: currentShippingCity,
          shippingCompany: currentShippingCompany,
          paymentMethod: currentPaymentMethod,
          creditCardNumber: '',
        }
      }));
    } else {
      await dispatch(createOrder({
        products: cart.map(product => ({ product: product.product, quantity: product.quantity })),
        amount: totalAmount,
        customer,
        recepient,
        isPaid: false,
        isShipped: false,
        shippingCity: currentShippingCity,
        shippingCompany: currentShippingCompany,
        paymentMethod: currentPaymentMethod,
        creditCardNumber: '',
      }));
    }
    if(!errorStatus) {
      navigate('/');
      dispatch(clearCart());
      dispatch(clearOrder());
    }
  };

  useEffect(() => {
    dispatch(getShippings());
    if(order) {
      setCustomer({
        firstName: order.customer.firstName,
        lastName: order.customer.lastName,
        phone: order.customer.phone,
        email: order.customer.email,
      });
      setRecepient({
        firstName: order.recepient.firstName,
        lastName: order.recepient.lastName,
        phone: order.recepient.phone,
        email: order.recepient.email,
      });
      setCurrentShippingCompany(order.shippingCompany);
      setCurrentShippingCity(order.shippingCity);
      setShippingAmount(order.amount);
      setCurrentPaymentMethod(order.paymentMethod);
    } else {
      setCustomer({
        firstName: user?.firstName,
        lastName: user?.lastName,
        phone: user?.phone,
        email: user?.email,
      });
      setRecepient({
        firstName: user?.firstName,
        lastName: user?.lastName,
        phone: user?.phone,
        email: user?.email,
      });
    }
    // return () => { order && dispatch(clearOrderToUpdate()) };
  }, []);

  

  useEffect(() => {
    if(shippingStatus === 'succeeded') {
      setCurrentShippingCompany(shippings[0].company);
      setCurrentShippingCity(shippings[0].cities[0]);
      setShippingAmount(shippings[0].price);
    }
  }, [shippingStatus]);

  return (
    <Container>
      <OrderDetails>
        <Title>{order ? 'Update an Order' : 'Placing an Order'}</Title>
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
          <SelectionContainer>
            {
              shippings.map(item => (
                <RadioContainer 
                  key={uuid()} 
                  data-isChecked={currentShippingCompany === item.company}
                >
                  <RadioBody>
                    <Radio 
                      type='radio' 
                      name='shipping' 
                      value={item.company} 
                      checked={currentShippingCompany === item.company} 
                      onChange={handleCurrentShippingCompanyChange}
                    />
                    <RadioTitle>
                      {item.company} {item.company === 'Self pickup' && '(only for Ukrainian customers)'}
                    </RadioTitle>
                  </RadioBody>
                  <Select 
                    disabled={currentShippingCompany !== item.company}
                    value={currentShippingCity}
                    onChange={handleCurrentShippingCityChange}
                  >
                    {
                      item.cities.map(city => (
                        <Option 
                          key={uuid()} 
                          value={city}
                        >
                          {city}
                        </Option>
                      ))
                    }
                  </Select>
                </RadioContainer>
              ))
            }
          </SelectionContainer>
        </DetailsSection>
        <DetailsSection>
          <SubTitle>
            <SubTitleNum>3</SubTitleNum>
            <SubTitleText>Order Details</SubTitleText>
          </SubTitle>
          <ShoppingList cart={order ? order.products : cart} />
        </DetailsSection>
        <DetailsSection>
          <SubTitle>
            <SubTitleNum>4</SubTitleNum>
            <SubTitleText>Payment Method</SubTitleText>
          </SubTitle>
          <SelectionContainer>
            <RadioContainer data-isChecked={currentPaymentMethod === 'when-receiving'}>
              <RadioBody>
                <Radio 
                  type='radio' 
                  name='payment' 
                  value='when-receiving' 
                  checked={currentPaymentMethod === 'when-receiving'} 
                  onChange={handleCurrentPaymentMethodChange}
                />
                <RadioTitle>Pay when receiving an order</RadioTitle>
              </RadioBody>
            </RadioContainer>
            <RadioContainer data-isChecked={currentPaymentMethod === 'pay-now'}>
              <RadioBody>
                <Radio 
                  type='radio' 
                  name='payment' 
                  value='pay-now' 
                  checked={currentPaymentMethod === 'pay-now'} 
                  onChange={handleCurrentPaymentMethodChange}
                />
                <RadioTitle>Pay now by card</RadioTitle>
              </RadioBody>
              <Payment />
            </RadioContainer>
          </SelectionContainer>
        </DetailsSection>
        <DetailsSection>
          <SubTitle>
            <SubTitleNum>5</SubTitleNum>
            <SubTitleText>Receiver's contact data</SubTitleText>
          </SubTitle>
          <OrderForm 
            data={recepient} 
            onChange={handleReceiverDataChange} 
          />
        </DetailsSection>
      </OrderDetails>
      <AcceptOrderSection>
        <AcceptOrderTitle>Total</AcceptOrderTitle>
        <AcceptItem>
          <AcceptSubTitleText>
            {cart.length} goods for the amount of
          </AcceptSubTitleText>
          <AcceptSubTitleAmount>
            UAH {totalAmount}
          </AcceptSubTitleAmount>
        </AcceptItem>
        <AcceptItem>
          <AcceptSubTitleText>
            Shipping
          </AcceptSubTitleText>
          <AcceptSubTitleAmount>
            UAH {shippingAmount}
          </AcceptSubTitleAmount>
        </AcceptItem>
        <AcceptTotalItem>
          <AcceptSubTitleText>Amount to be paid</AcceptSubTitleText>
          <AcceptAmount>UAH {totalAmount + shippingAmount}</AcceptAmount>
        </AcceptTotalItem>
        <BtnContainer>
          <Button 
            type={ButtonType.Button} 
            color={ButtonColor.Success} 
            onClick={submitOrder}
          >
            Submit Order
          </Button>
        </BtnContainer>
      </AcceptOrderSection>
    </Container>
  );
};

export default Order;