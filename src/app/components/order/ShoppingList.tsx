import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';
import { ButtonColor, ButtonType } from '../../../types/types';
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../../features/cart/reducers';
import { ICartItem } from '../../features/cart/types';
import { AppDispatch } from '../../features/store';
import RoundedButton from '../ui/RoundedButton';


interface IShoppingListProps {
  cart: ICartItem[] | [];
}


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

const ImgContainer = styled.div`
  ${tw`
    mr-3
    w-2/6
    md:w-36
    h-16
    flex
    justify-center
    items-center
  `}
`;

const ProductImg = styled.img`
  max-height: 100%;
  ${tw`
    inline-block
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
  const dispatch = useDispatch<AppDispatch>();

  const increaseProductQuantity = (id: string) => {
    dispatch(increaseQuantity(id));
  };

  const decreaseProductQuantity = (id: string) => {
    dispatch(decreaseQuantity(id));
  };

  const hadnleDeleteFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  };

  return (
    <List>
      {
        cart.length > 0 ? cart.map(item => (
          <ShoppingListItem key={item.id}>
            <ItemInfo>
              <ImgContainer>
                <ProductImg src={item.product.image} alt={item.product.title} />
              </ImgContainer>
              <ProductTitle>{item.product.title}</ProductTitle>
              <ProductPrice>{item.product.price}</ProductPrice>
            </ItemInfo>
            <ItemActions>
              <ProductNumber>
                <SetNumberBtn onClick={() => decreaseProductQuantity(item.id)}>-</SetNumberBtn>
                <Number>{item.quantity}</Number>
                <SetNumberBtn onClick={() => increaseProductQuantity(item.id)}>+</SetNumberBtn>
              </ProductNumber>
              <RoundedButton 
                type={ButtonType.Button} 
                color={ButtonColor.Danger} 
                onClick={() => hadnleDeleteFromCart(item.id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </RoundedButton>
            </ItemActions>
          </ShoppingListItem>
        )) : (
          <EmptyCartMessage>
            Your cart is empty. Choose the product.
          </EmptyCartMessage>
        )
      }
    </List>
  );
};

export default ShoppingList;