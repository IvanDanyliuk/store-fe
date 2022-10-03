import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { v4 as uuid } from 'uuid';
import { IOrder } from '../../features/order/types';


interface IOrdersListProps {
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

const OrderDetails = styled.div`
  ${tw`
  
  `}
`;

const Actions = styled.div`
  ${tw`
  
  `}
`;


const OrdersList: React.FC<IOrdersListProps> = ({ orders }) => {
  

  return (
    <List>
      {orders.map(order => (
        <ListItem key={uuid()}>
          <OrderDetails>

          </OrderDetails>
          <Actions>

          </Actions>
        </ListItem>
      ))}
    </List>
  );
};

export default OrdersList;