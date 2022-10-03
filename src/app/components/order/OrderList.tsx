import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import { IOrder } from '../../features/order/types';
import OrderDetails from '../modals/OrderDetails';


interface IOrderListProps {
  orders: IOrder[];
}

const List = styled.ul`
  ${tw`
  
  `}
`;

const ListItem = styled.li`
  ${tw`
  
  `}
`;

const OrderInfo = styled.div`
  ${tw`
  
  `}
`;

const Actions = styled.div`
  ${tw`
  
  `}
`;

const Message = styled.div`
  ${tw`
  
  `}
`;


const OrderList: React.FC<IOrderListProps> = ({ orders }) => {
  

  return (
    <List>
      {orders.length > 0 ? orders.map(order => (
        <ListItem key={uuid()}>
          <OrderInfo>
            <span>{order._id}</span>
            <span>{moment(order.createdAt).format('LLL')}</span>
          </OrderInfo>
          <Actions>
            <OrderDetails order={order} />
          </Actions>
        </ListItem>
      )) : (
        <Message>There are no available orders!</Message>
      )}
    </List>
  );
};

export default OrderList;