import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import { IOrder } from '../../features/order/types';
import OrderDetails from '../modals/OrderDetails';
import ProductListImage from '../ui/ProductListImage';
import { getOtherProductsQuantity } from '../../helpers/helpers';


interface IOrderListProps {
  orders: IOrder[];
}

const List = styled.ul`
  ${tw`
    w-full
  `}
`;

const ListItem = styled.li`
  ${tw`
    mb-4
    md:mb-0
    p-2
    w-full
    flex
    flex-wrap
    md:flex-row
    box-border
    hover:bg-gray-100
  `}
`;

const Text = styled.div`
  ${tw`
    mb-2
    md:mb-0
    w-1/2
    md:w-3/12
    text-xs
    md:text-sm
  `}
`;

const ProductImages = styled.div`
  ${tw`
    w-1/2
    md:w-4/12
    flex
    items-center
  `}
`;

const OtherProducts = styled.span`
  ${tw`
    text-xs
  `}
`;

const Actions = styled.div`
  ${tw`
    w-1/2
    md:w-2/12
    flex
    justify-end
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
          <Text>{order._id}</Text>
          <Text>{moment(order.createdAt).format('LLL')}</Text>
          <ProductImages>
            {order.products.slice(0, 3).map(product => (
              <ProductListImage 
                key={uuid()} 
                url={product.product.image} 
                altText={product.product.title} 
              />
            ))}
            <OtherProducts>
              {getOtherProductsQuantity(3, order.products.length)}
            </OtherProducts>
          </ProductImages>
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