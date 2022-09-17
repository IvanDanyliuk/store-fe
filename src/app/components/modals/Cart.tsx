import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useMediaQuery } from 'react-responsive';
import { SCREENS } from '../../services/screens';
import { AppDispatch } from '../../features/store';
import Button from '../ui/Button';
import { ButtonColor, ButtonType } from '../../../types/types';
import RoundedButton from '../ui/RoundedButton';
import { selectCartData } from '../../features/cart/selectors';
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../../features/cart/reducers';
import { ICartItem } from '../../features/cart/types';


Modal.setAppElement('#root');

const Container = styled.div`
  ${tw`
    flex
    flex-col
    h-full
  `}
`;

const CartBtn = styled.button`
  ${tw`
    relative
    p-1
    text-gray-700
    hover:text-white
    transition
    ease-in
    delay-100
  `}
`;

const CartSize = styled.span`
  background: #f0ab44;
  ${tw`
    absolute
    top-0
    right-0
    w-4
    h-4
    rounded-xl
    text-xs
    text-black
    font-semibold
  `}
`;

const CartHeader = styled.div`
  ${tw`
    h-6
    mb-4
    flex
    justify-center
  `}
`;

const FormTitle = styled.h6`
  ${tw`
    text-xl
    font-bold
  `}
`;

const CloseBtn = styled.button`
  ${tw`
    absolute
    top-2
    right-4
    text-xl
  `}
`;

const ShoppingList = styled.ul`
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

const CartFooter = styled.div`
  ${tw`
    mt-3
    w-full
    h-24
  `}
`;

const TotalAmount = styled.div`
  ${tw`
    pt-4
    pb-4
    flex
    justify-center
    items-end
    text-xl
  `}
`;

const AmountTitle = styled.p`
  ${tw`
    mr-3
  `}
`;

const AmountValue = styled.p`
  ${tw`
    font-semibold
  `}
`;

const Currency = styled.span`
  ${tw`
    mr-1
  `}
`;

const Sum = styled.span`
  ${tw`
    text-2xl
  `}
`;

const FooterActions = styled.div`
  ${tw`
    w-full
    flex
    justify-between
    items-center
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

const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const cart: ICartItem[] = useSelector(selectCartData);
  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

  const totalOrderAmount = cart.reduce((acc: number, cur: ICartItem) => acc + (+cur.product.price * cur.quantity), 0);

  const [isOpen, setIsOpen] = useState(false);
  
  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };

  const makeOrder = () => {
    navigate('/order');

    console.log('Going to the order page...');

    setIsOpen(false);
  };

  const increaseProductQuantity = (id: string) => {
    dispatch(increaseQuantity(id));
  };

  const decreaseProductQuantity = (id: string) => {
    dispatch(decreaseQuantity(id));
  };

  const hadnleDeleteFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const styles = {
    content: {
      width: isMobile ? '90%' : '900px',
      height: '90%',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      background: 'rgb(255, 255, 255',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      background: 'rgba(141, 141, 141, .6',
      zIndex: '500',
    }
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <CartBtn onClick={handleOpenModal}>
        {
          cart.length > 0 && (
            <CartSize>{cart.length}</CartSize>
          )
        }
        <FontAwesomeIcon icon={faCartShopping} />
      </CartBtn>
      <Modal
        isOpen={isOpen}
        onRequestClose={handleOpenModal}
        style={styles}
      >
        <Container>
          <CartHeader>
            <FormTitle>Cart</FormTitle>
            <CloseBtn onClick={handleOpenModal}>
              <FontAwesomeIcon icon={faXmark} />
            </CloseBtn>
          </CartHeader>
          <ShoppingList>
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
                  Cart is empty...
                </EmptyCartMessage>
              )
            }
          </ShoppingList>
          <CartFooter>
            <TotalAmount>
              <AmountTitle>Total Order:</AmountTitle>
              <AmountValue>
                <Currency>$</Currency>
                <Sum>{totalOrderAmount}</Sum>
              </AmountValue>
            </TotalAmount>
            <FooterActions>
              <Button 
                type={ButtonType.Button} 
                color={ButtonColor.Secondary} 
                onClick={handleOpenModal}
              >
                Continue shopping
              </Button>
              <Button 
                type={ButtonType.Button} 
                color={ButtonColor.Success} 
                onClick={makeOrder}
              >
                Order
              </Button>
            </FooterActions>
          </CartFooter>
        </Container>
      </Modal>
    </>
  );
};

export default Cart;