import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import Modal from 'react-modal';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useMediaQuery } from 'react-responsive';
import { SCREENS } from '../../services/screens';
import Button from '../ui/Button';
import { ButtonColor, ButtonType } from '../../../types/types';
import { selectCartData } from '../../features/cart/selectors';
import { ICartItem } from '../../features/cart/types';
import ShoppingList from '../order/ShoppingList';


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

const Cart: React.FC = () => {
  const { t } = useTranslation(['modals']);
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
            <FormTitle>
              {t('cartTitle')}
            </FormTitle>
            <CloseBtn onClick={handleOpenModal}>
              <FontAwesomeIcon icon={faXmark} />
            </CloseBtn>
          </CartHeader>
          <ShoppingList cart={cart} />
          <CartFooter>
            <TotalAmount>
              <AmountTitle>
                {t('cartTotalOrderAmount')}
              </AmountTitle>
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
                {t('cartContinue')}
              </Button>
              <Button 
                type={ButtonType.Button} 
                color={ButtonColor.Success} 
                onClick={makeOrder}
              >
                {t('cartCheckoutBtn')}
              </Button>
            </FooterActions>
          </CartFooter>
        </Container>
      </Modal>
    </>
  );
};

export default Cart;