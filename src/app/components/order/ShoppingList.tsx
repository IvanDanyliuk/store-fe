import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';
import { v4 as uuid } from 'uuid';
import { useTranslation } from 'react-i18next';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonColor, ButtonType, IShoppingListProps } from '../../../types/types';
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../../features/cart/reducers';
import { AppDispatch } from '../../features/store';
import RoundedButton from '../ui/RoundedButton';
import ProductListImage from '../ui/ProductListImage';
import { selectOrder } from '../../features/order/selectors';
import { 
  decreaseOrderProductQuantity, 
  increaseOrderProductQuantity, 
  removeProductFromOrder 
} from '../../features/order/reducers';


const List = styled.ul`
  flex: 1;
  ${tw`
    overflow-y-scroll
  `}
`;

const ShoppingListItem = styled.li`
  ${tw`
    pt-2
    pb-2
    flex
    flex-col
    md:flex-row
    justify-between
    hover:bg-gray-100
  `}
`;

const ItemInfo = styled.div`
  ${tw`
    w-full
    md:w-3/4
    flex
    items-center
  `}
`;

const ItemActions = styled.div`
  ${tw`
    mr-2
    w-full
    md:w-1/4
    flex
    justify-between
    md:justify-around
    items-center
  `}
`;

const ProductTitle = styled.span`
  ${tw`
    w-4/6
    text-sm
    md:text-base
  `}
`;

const ProductPrice = styled.span`
  ${tw`
    w-1/6
    text-lg
    text-center
    font-semibold
  `}
`;

const ProductNumber = styled.div`
  ${tw`
    w-20
    flex
    justify-between
    items-center
  `}
`;

const SetNumberBtn = styled.button`
  ${tw`
    p-2
    text-4xl
    md:text-2xl
  `}
`;

const Number = styled.span`
  ${tw`
    text-xl
  `}
`;

const EmptyCartMessage = styled.li`
  ${tw`
    h-full
    flex
    justify-center
    items-center
    text-2xl
    text-gray-500
    font-semibold
  `}
`;

const ShoppingList: React.FC<IShoppingListProps> = ({ cart }) => {
  const { t } = useTranslation(['modals']);
  const dispatch = useDispatch<AppDispatch>();
  const order = useSelector(selectOrder);

  const increaseProductQuantity = (id: string) => {
    if(order) {
      dispatch(increaseOrderProductQuantity(id));
    } else {
      dispatch(increaseQuantity(id));
    }
  };

  const decreaseProductQuantity = (id: string) => {
    if(order) {
      dispatch(decreaseOrderProductQuantity(id));
    } else {
      dispatch(decreaseQuantity(id));
    }
  };

  const hadnleDeleteFromCart = (id: string) => {
    if(order) {
      dispatch(removeProductFromOrder(id));
    } else {
      dispatch(removeFromCart(id));
    }
  };

  return (
    <List>
      {
        cart.length > 0 ? cart.map(item => (
          <ShoppingListItem key={uuid()}>
            <ItemInfo>
              <ProductListImage url={item.product.image} altText={item.product.title} />
              <ProductTitle>{item.product.title}</ProductTitle>
              <ProductPrice>{item.product.price}</ProductPrice>
            </ItemInfo>
            <ItemActions>
              <ProductNumber>
                <SetNumberBtn onClick={() => decreaseProductQuantity(item._id)}>-</SetNumberBtn>
                <Number>{item.quantity}</Number>
                <SetNumberBtn onClick={() => increaseProductQuantity(item._id)}>+</SetNumberBtn>
              </ProductNumber>
              <RoundedButton 
                type={ButtonType.Button} 
                color={ButtonColor.Danger} 
                onClick={() => hadnleDeleteFromCart(item._id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </RoundedButton>
            </ItemActions>
          </ShoppingListItem>
        )) : (
          <EmptyCartMessage>
            {t('cartEmptyMessage')}
          </EmptyCartMessage>
        )
      }
    </List>
  );
};

export default ShoppingList;