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
  
  `}
`;

const ListItem = styled.li`
  ${tw`
    pt-2
    pb-2
    w-full
    flex
    items-center
    hover:bg-gray-100
  `}
`;

const OrderInfo = styled.div`
  ${tw`
    relative
    w-4/6
    flex
    items-center
  `}
`;

const Text = styled.div`
  ${tw`
    mr-3
    w-2/6
    text-sm
  `}
`;

const ProductImages = styled.div`
  ${tw`
    w-2/6
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
    w-2/6
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
          <OrderInfo>
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