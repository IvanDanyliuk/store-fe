import React, { SyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import Modal from 'react-modal';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import { useTranslation } from 'react-i18next';
import RoundedButton from '../ui/RoundedButton';
import { ButtonColor, ButtonType, ICellProps, IOrderDetailsProps } from '../../../types/types';
import { useMediaQuery } from 'react-responsive';
import { SCREENS } from '../../services/screens';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faXmark } from '@fortawesome/free-solid-svg-icons';
import { setOrderCellWidth } from '../../helpers/helpers';
import ProductListImage from '../ui/ProductListImage';
import Button from '../ui/Button';
import { AppDispatch } from '../../features/store';
import { deleteOrder } from '../../features/order/asyncActions';
import { setOrderToUpdate } from '../../features/order/reducers';
import { BASIC_BACKGROUND_WHITE, MODAL_OVERLAY_COLOR } from '../../services/constants';


if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root');

const Container = styled.div`
  ${tw`
    flex
    flex-col
    h-full
  `}
`;

const OrderHeader = styled.div`
  ${tw`
    h-16
    flex
    flex-col
    md:flex-row
    justify-between
    items-center
  `}
`;

const OrderInfo = styled.div`
  flex: 1;
  ${tw`
    overflow-y-scroll
  `}
`;

const OrderFooter = styled.div`
  ${tw`
    relative
    pt-3
    w-full
    flex
    flex-col
    md:flex-row
  `}
`;

const Summary = styled.div`
  ${tw`
    mb-3
    md:mb-0
    w-full
    md:w-5/6
    flex
    flex-wrap
  `}
`;

const Actions = styled.div`
  ${tw`
    w-full
    md:w-1/6
    h-full
    flex
    md:flex-col
    justify-between
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

const HeaderData = styled.div`
  ${tw`
    text-sm
    text-gray-500
  `}
`;

const Table = styled.table`
  ${tw`
    w-full
  `}
`;

const TableHead = styled.thead`
  ${tw`
    relative
    w-full
    border-t
    border-b
  `}
`;

const TableBody = styled.tbody``;

const Row = styled.tr`
  ${tw`
    w-full
    h-12
    text-sm
  `}
`;

const TableHeaderCell = styled.th<ICellProps>`
  width: ${({ name }) => setOrderCellWidth(name, false)};
  @media (max-width: ${SCREENS.md}) {
    width: ${({ name }) => setOrderCellWidth(name, true)};
  }
  ${tw`
    pt-3
    pb-3
    text-left
  `}
`;

const TableCell = styled.td<ICellProps>`
  min-width: ${({ name }) => setOrderCellWidth(name, false)};
  @media (max-width: ${SCREENS.md}) {
    min-width: ${({ name }) => setOrderCellWidth(name, true)};
  }
  button {
    ${tw`
      ml-3
    `}
  }
  ${tw`
    pt-2
    pb-2
  `}
`;

const Details = styled.div`
  ${tw`
    w-1/2
    md:w-1/4
  `}
`;

const DetailsTitle = styled.div`
  ${tw`
    mb-2
    text-sm
    font-semibold
  `}
`;

const DetailsInfo = styled.div`
  ${tw`
    mb-1
    text-xs
  `}
`;


const OrderDetails: React.FC<IOrderDetailsProps> = ({ order }) => {
  const { t } = useTranslation(['modals']);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };

  const handleOrderEdit = (e: SyntheticEvent) => {
    dispatch(setOrderToUpdate(order));
    navigate('/order');
  };

  const handleOrderDelete = () => {
    dispatch(deleteOrder(order._id!));
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
      background: BASIC_BACKGROUND_WHITE,
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      background: MODAL_OVERLAY_COLOR,
      zIndex: '500',
    }
  };

  return (
    <>
      <RoundedButton
        type={ButtonType.Button}
        color={ButtonColor.Secondary}
        onClick={handleOpenModal}
      >
        <FontAwesomeIcon icon={faInfo} />
      </RoundedButton>
      <Modal
        isOpen={isOpen}
        onRequestClose={handleOpenModal}
        style={styles}
      >
        <Container>
          <CloseBtn onClick={handleOpenModal}>
            <FontAwesomeIcon icon={faXmark} />
          </CloseBtn>
          <OrderHeader>
            <HeaderData>{t('orderDetialsId')}: {order._id}</HeaderData>
            <HeaderData>{moment(order.createdAt).format('LLL')}</HeaderData>
          </OrderHeader>
          <OrderInfo>
            <Table>
              <TableHead>
                <Row>
                  <TableHeaderCell name='image'></TableHeaderCell>
                  <TableHeaderCell name='title'>
                    {t('orderDetailsProductName')}
                  </TableHeaderCell>
                  <TableHeaderCell name='quantity'>
                    {t('orderDetailsQuantity')}
                  </TableHeaderCell>
                  <TableHeaderCell name='price'>
                    {t('orderDetailsPrice')}
                  </TableHeaderCell>
                </Row>
              </TableHead>
              <TableBody>
                {order.products.map(product => (
                  <Row key={uuid()}>
                    <TableCell name='image'>
                      <ProductListImage 
                        url={product.product.image} 
                        altText={product.product.title} 
                      />
                    </TableCell>
                    <TableCell name='title'>
                      {product.product.title}
                    </TableCell>
                    <TableCell name='quantity'>
                      {product.quantity}
                    </TableCell>
                    <TableCell name='price'>
                      UAH {product.product.price}
                    </TableCell>
                  </Row>
                ))}
              </TableBody>
            </Table>
          </OrderInfo>
          <OrderFooter>
            <Summary>
              <Details>
                <DetailsTitle>
                  {t('orderDetailsTotalAmount')}
                </DetailsTitle>
                <DetailsInfo>UAH {order.amount}</DetailsInfo>
              </Details>
              <Details>
                <DetailsTitle>
                  {t('orderDetailsShipping')}
                </DetailsTitle>
                <DetailsInfo>
                  {order.shippingCompany}
                </DetailsInfo>
                <DetailsInfo>
                  {order.shippingCity}
                </DetailsInfo>
                <DetailsInfo>
                  {
                    order.isShipped ? 
                      t('orderDetailsShippingStatusShipped') : 
                      t('orderDetailsShippingStatusNotShipped')
                  }
                </DetailsInfo>
                <DetailsInfo>
                  {
                    order.isPaid ? 
                      t('orderDetailsPaymentStatusPaid') : 
                      t('orderDetailsPaymentStatusNotPaid')
                  }
                </DetailsInfo>
              </Details>
              <Details>
                <DetailsTitle>
                  {t('orderDetailsCustomer')}
                </DetailsTitle>
                <DetailsInfo>
                  {`${order.customer.firstName} ${order.customer.lastName}`}
                </DetailsInfo>
                <DetailsInfo>
                  {order.customer.email}
                </DetailsInfo>
                <DetailsInfo>
                  {order.customer.phone}
                </DetailsInfo>
              </Details>
              <Details>
                <DetailsTitle>
                  {t('orderDetailsRecepient')}
                </DetailsTitle>
                <DetailsInfo>
                  {`${order.recepient.firstName} ${order.recepient.lastName}`}
                </DetailsInfo>
                <DetailsInfo>
                  {order.recepient.email}
                </DetailsInfo>
                <DetailsInfo>
                  {order.recepient.phone}
                </DetailsInfo>
              </Details>
            </Summary>
            <Actions>
              <Button 
                type={ButtonType.Button} 
                color={ButtonColor.Secondary}
                onClick={handleOrderEdit}
              >
                {t('orderDetailsEditBtn')}
              </Button>
              <Button
                type={ButtonType.Button}
                color={ButtonColor.Danger}
                onClick={handleOrderDelete}
              >
                {t('orderDetailsDeleteBtn')}
              </Button>
            </Actions>
          </OrderFooter>
        </Container>
      </Modal>
    </>
  );
};

export default OrderDetails;