import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';
import { getOrders, getUserOrders } from '../../features/order/asyncActions';
import { selectOrders } from '../../features/order/selectors';
import { AppDispatch } from '../../features/store';
import { selectUser } from '../../features/user/selectors';
import OrderList from '../order/OrderList';


const Container = styled.div`
  ${tw`
  
  `}
`;


const Orders = () => {
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector(selectUser);
  const orders = useSelector(selectOrders);

  useEffect(() => {
    if(user?.isAdmin) {
      dispatch(getOrders());
    } else {
      dispatch(getUserOrders(user!.email!));
    }
  }, [user]);

  return (
    <Container>
      <OrderList orders={orders} />
    </Container>
  );
};

export default Orders;