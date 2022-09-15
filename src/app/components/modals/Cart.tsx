import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useMediaQuery } from 'react-responsive';
import { SCREENS } from '../../services/screens';
import { AppDispatch } from '../../features/store';
import { selectUser } from '../../features/user/selectors';
import Button from '../ui/Button';
import { ButtonColor, ButtonType } from '../../../types/types';
import { useNavigate } from 'react-router-dom';
import RoundedButton from '../ui/RoundedButton';
import { selectCartData } from '../../features/cart/selectors';
import { removeFromCart } from '../../features/cart/reducers';


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
    p-3
    text-gray-700
    hover:text-white
    transition
    ease-in
    delay-100
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
  min-height: 84%;
  flex: 1;
  ${tw`
    mb-2
    
    overflow-y-scroll
  `}
`;

const ShoppingListItem = styled.li`
  ${tw`
    pt-2
    pb-2
    flex
    justify-between
    hover:bg-gray-100
  `}
`;

const ItemInfo = styled.div`
  max-width: 75%;
  ${tw`
    flex
    items-center
  `}
`;

const ItemActions = styled.div`
  ${tw`
    mr-2
    flex
    items-center
  `}
`;

const ImgContainer = styled.div`
  ${tw`
    mr-3
    w-36
    h-16
    flex
    justify-center
  `}
`;

const ProductImg = styled.img`
  
  ${tw`
    h-full
    object-cover
    object-center
  `}
`;

const ProductTitle = styled.span`
  ${tw`
  
  `}
`;

const ProductPrice = styled.span`
  ${tw`
  
  `}
`;

const ProductNumber = styled.div`
  ${tw`
    mr-8
    w-20
    flex
    justify-between
    items-center
  `}
`;

const SetNumberBtn = styled.button`
  ${tw`
    text-2xl
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
    h-6
    flex
    justify-between
    items-center
  `}
`;

const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const cart = useSelector(selectCartData);
  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

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
    
  };

  const decreaseProductQuantity = (id: string) => {
    
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

  return (
    <>
      <CartBtn onClick={handleOpenModal}>
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
              cart.map(item => (
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
                      <SetNumberBtn>-</SetNumberBtn>
                      <Number>{item.quantity}</Number>
                      <SetNumberBtn>+</SetNumberBtn>
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
              ))
            }
          </ShoppingList>
          <CartFooter>
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
          </CartFooter>
        </Container>
      </Modal>
    </>
  )
}

export default Cart;