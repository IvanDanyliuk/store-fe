import React, { SyntheticEvent, ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';
import { v4 as uuid } from 'uuid';
import { useTranslation } from 'react-i18next';
import { ButtonColor, ButtonType, ICustomer } from '../../types/types';
import { OrderForm, Payment, ShoppingList } from '../components/order';
import { Button } from '../components/ui';
import { selectCartData } from '../features/cart/selectors';
import { ICartItem } from '../features/cart/types';
import { getShippings } from '../features/shipping/asyncActions';
import { selectShippings, selectShippingStatus } from '../features/shipping/selectors';
import { AppDispatch } from '../features/store';
import { selectUser } from '../features/user/selectors';
import { createOrder, updateOrder } from '../features/order/asyncActions';
import { useNavigate } from 'react-router-dom';
import { selectOrderError, selectOrder } from '../features/order/selectors';
import { clearCart } from '../features/cart/reducers';
import { clearOrder, clearOrderToUpdate } from '../features/order/reducers';
import { calculateOrderTotalAmount } from '../helpers/helpers';
import { PRIMARY_COLOR } from '../services/constants';


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
    my-6
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
  background-color: ${PRIMARY_COLOR};
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

const RadioTitle = styled.span`
  ${tw`
    text-base
    font-semibold
  `}
`;

const RadioContainer = styled.div`
  &[data-isChecked="true"] {
    border: 1px solid ${PRIMARY_COLOR};
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
  const { t } = useTranslation(['order']);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const order = useSelector(selectOrder);
  const user = useSelector(selectUser);
  const cart: ICartItem[] = useSelector(selectCartData);
  const shippings = useSelector(selectShippings);
  const shippingStatus = useSelector(selectShippingStatus);
  const errorStatus = useSelector(selectOrderError);
  
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

  const handleCustomerDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const handleReceiverDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRecepient({
      ...recepient,
      [e.target.name]: e.target.value,
    });
  };

  const handleCurrentShippingCompanyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentShippingCompany(e.target.value);
    const currentCompany = shippings.find(item => item.company === e.target.value);
    setCurrentShippingCity(currentCompany?.cities[0]!);
    setShippingAmount(currentCompany?.price!);
  };

  const handleCurrentPaymentMethodChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPaymentMethod(e.target.value);
  };

  const handleCurrentShippingCityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurrentShippingCity(e.target.value);
  };

  const submitOrder = async (e: SyntheticEvent) => {
    if(order) {
      dispatch(updateOrder({
        id: order._id!,
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
    return () => { order && dispatch(clearOrderToUpdate()) };
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
        <Title>{order ? t('updateOrder') : t('placingOrder')}</Title>
        <DetailsSection>
          <SubTitle>
            <SubTitleNum>1</SubTitleNum>
            <span>{t('contactData')}</span>
          </SubTitle>
          <OrderForm 
            data={customer} 
            onChange={handleCustomerDataChange} 
          />
        </DetailsSection>
        <DetailsSection>
          <SubTitle>
            <SubTitleNum>2</SubTitleNum>
            <span>{t('shipping')}</span>
          </SubTitle>
          <div>
            {
              shippings.map(item => (
                <RadioContainer 
                  key={uuid()} 
                  data-isChecked={currentShippingCompany === item.company}
                >
                  <div>
                    <Radio 
                      type='radio' 
                      name='shipping' 
                      value={item.company} 
                      checked={currentShippingCompany === item.company} 
                      onChange={handleCurrentShippingCompanyChange}
                    />
                    <RadioTitle>
                      {item.company === 'Self pickup' ? t('selfPickup') : item.company}
                    </RadioTitle>
                  </div>
                  <Select 
                    disabled={currentShippingCompany !== item.company}
                    value={currentShippingCity}
                    onChange={handleCurrentShippingCityChange}
                  >
                    {
                      item.cities.map(city => (
                        <option 
                          key={uuid()} 
                          value={city}
                        >
                          {city}
                        </option>
                      ))
                    }
                  </Select>
                </RadioContainer>
              ))
            }
          </div>
        </DetailsSection>
        <DetailsSection>
          <SubTitle>
            <SubTitleNum>3</SubTitleNum>
            <span>{t('orderDetails')}</span>
          </SubTitle>
          <ShoppingList cart={order ? order.products : cart} />
        </DetailsSection>
        <DetailsSection>
          <SubTitle>
            <SubTitleNum>4</SubTitleNum>
            <span>{t('paymentMethod')}</span>
          </SubTitle>
          <div>
            <RadioContainer data-isChecked={currentPaymentMethod === 'when-receiving'}>
              <div>
                <Radio 
                  type='radio' 
                  name='payment' 
                  value='when-receiving' 
                  checked={currentPaymentMethod === 'when-receiving'} 
                  onChange={handleCurrentPaymentMethodChange}
                />
                <RadioTitle>{t('receivingOrder')}</RadioTitle>
              </div>
            </RadioContainer>
            <RadioContainer data-isChecked={currentPaymentMethod === 'pay-now'}>
              <div>
                <Radio 
                  type='radio' 
                  name='payment' 
                  value='pay-now' 
                  checked={currentPaymentMethod === 'pay-now'} 
                  onChange={handleCurrentPaymentMethodChange}
                />
                <RadioTitle>{t('payByCard')}</RadioTitle>
              </div>
              <Payment />
            </RadioContainer>
          </div>
        </DetailsSection>
        <DetailsSection>
          <SubTitle>
            <SubTitleNum>5</SubTitleNum>
            <span>{t('recContactData')}</span>
          </SubTitle>
          <OrderForm 
            data={recepient} 
            onChange={handleReceiverDataChange} 
          />
        </DetailsSection>
      </OrderDetails>
      <AcceptOrderSection>
        <AcceptOrderTitle>{t('total')}</AcceptOrderTitle>
        <AcceptItem>
          <AcceptSubTitleText>
            {cart.length} {t('amount')}
          </AcceptSubTitleText>
          <AcceptSubTitleAmount>
            UAH {totalAmount}
          </AcceptSubTitleAmount>
        </AcceptItem>
        <AcceptItem>
          <AcceptSubTitleText>
            {t('shipping')}
          </AcceptSubTitleText>
          <AcceptSubTitleAmount>
            UAH {shippingAmount}
          </AcceptSubTitleAmount>
        </AcceptItem>
        <AcceptTotalItem>
          <AcceptSubTitleText>{t('paymentAmount')}</AcceptSubTitleText>
          <AcceptAmount>UAH {totalAmount + shippingAmount}</AcceptAmount>
        </AcceptTotalItem>
        <BtnContainer>
          <Button 
            type={ButtonType.Button} 
            color={ButtonColor.Success} 
            onClick={submitOrder}
          >
            {t('submitOrder')}
          </Button>
        </BtnContainer>
      </AcceptOrderSection>
    </Container>
  );
};

export default Order;