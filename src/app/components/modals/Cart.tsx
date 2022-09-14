import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useMediaQuery } from 'react-responsive';
import { SCREENS } from '../../services/screens';
import { AppDispatch } from '../../features/store';
import { selectUser } from '../../features/user/selectors';
import Button from '../ui/Button';
import { ButtonColor, ButtonType } from '../../../types/types';
import { useNavigate } from 'react-router-dom';


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
    flex
  `}
`;

const ItemInfo = styled.div`
  width: 70%;
  ${tw`
    flex
    items-center
  `}
`;

const ItemActions = styled.div`
  width: 30%;
  ${tw`
    flex
    items-center
  `}
`;

const ProductImg = styled.img`
  ${tw`
    mr-3
    h-16
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
  
  `}
`;

const SetNumberBtn = styled.button`
  ${tw`
  
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
            <ShoppingListItem>
              <ItemInfo>
                <ProductImg src='https://content1.rozetka.com.ua/goods/images/big/133898276.jpg' alt='product' />
                <ProductTitle>Монітор 34" Samsung Curved C34H890</ProductTitle>
                <ProductPrice>499</ProductPrice>
              </ItemInfo>
              <ItemActions>
                <ProductNumber>
                  <SetNumberBtn>-</SetNumberBtn>
                  <Number>1</Number>
                  <SetNumberBtn>+</SetNumberBtn>
                </ProductNumber>
              </ItemActions>
            </ShoppingListItem>
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