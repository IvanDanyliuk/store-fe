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
import { ProductListImage, RoundedButton } from '../ui';
import { selectOrder } from '../../features/order/selectors';
import { 
  decreaseOrderProductQuantity, 
  increaseOrderProductQuantity, 
  removeProductFromOrder 
} from '../../features/order/reducers';


const List = styled.ul`
  ${tw`
    max-h-full
    flex
    flex-col
    flex-1
    overflow-y-scroll
  `}
`;

const ShoppingListItem = styled.li`
  ${tw`
    py-2
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

const EmptyCartMessage = styled.div`
flex: 1;
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

  const handleDeleteFromCart = (id: string) => {
    if(order) {
      dispatch(removeProductFromOrder(id));
    } else {
      console.log('REMOVE FROM CART', id)
      dispatch(removeFromCart(id));
    }
  };

  return (
    <>
      {
        cart.length > 0 ? (
          <List>
            {cart.map(item => (
              <ShoppingListItem key={uuid()}>
                <ItemInfo>
                  <ProductListImage url={item.product.image} altText={item.product.title} />
                  <ProductTitle>{item.product.title}</ProductTitle>
                  <ProductPrice>{item.product.price}</ProductPrice>
                </ItemInfo>
                <ItemActions>
                  <ProductNumber>
                    <SetNumberBtn 
                      data-testid='increaseBtn' 
                      onClick={() => decreaseProductQuantity(item.id!)}
                    >
                      -
                    </SetNumberBtn>
                    <Number>{item.quantity}</Number>
                    <SetNumberBtn 
                      data-testid='decreaseBtn' 
                      onClick={() => increaseProductQuantity(item.id!)}
                    >
                      +
                    </SetNumberBtn>
                  </ProductNumber>
                  <RoundedButton 
                    type={ButtonType.Button} 
                    color={ButtonColor.Danger} 
                    onClick={() => handleDeleteFromCart(item.id!)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </RoundedButton>
                </ItemActions>
              </ShoppingListItem>
            ))}
          </List>
        ) : (
          <EmptyCartMessage>
            {t('cartEmptyMessage')}
          </EmptyCartMessage>
        )
      }
    </>
  );
};

export default ShoppingList;