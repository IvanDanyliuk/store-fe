import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import Modal from 'react-modal';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import Button from '../ui/Button';
import { ButtonColor, ButtonType } from '../../../types/types';
import { IOrder } from '../../features/order/types';
import { useMediaQuery } from 'react-responsive';
import { SCREENS } from '../../services/screens';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { setOrderCellWidth } from '../../helpers/helpers';


Modal.setAppElement('#root');

interface IOrderDetailsProps {
  order: IOrder;
}

interface ICellProps {
  name: string;
}

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

const Summary = styled.div`
  ${tw`
    pt-3
    h-24
    flex
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

const TableBody = styled.tbody`
  ${tw`
  
  `}
`;

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

const ImageContainer = styled.div`
  ${tw`
    mr-3
    w-2/6
    md:w-10
    h-10
    flex
    justify-center
    items-center
  `}
`;

const Image = styled.img`
  max-height: 100%;
  ${tw`
    inline-block
  `}
`;

const Details = styled.div`
  ${tw`
    w-1/4
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
  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(!isOpen);
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
      <Button
        type={ButtonType.Button}
        color={ButtonColor.Secondary}
        onClick={handleOpenModal}
      >
        Details
      </Button>
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
            <HeaderData>Order ID: {order._id}</HeaderData>
            <HeaderData>{moment(order.createdAt).format('LLL')}</HeaderData>
          </OrderHeader>
          <OrderInfo>
            <Table>
              <TableHead>
                <Row>
                  <TableHeaderCell name='image'></TableHeaderCell>
                  <TableHeaderCell name='title'>Product name</TableHeaderCell>
                  <TableHeaderCell name='quantity'>Quantity</TableHeaderCell>
                  <TableHeaderCell name='price'>Price</TableHeaderCell>
                </Row>
              </TableHead>
              <TableBody>
                {order.products.map(product => (
                  <Row key={uuid()}>
                    <TableCell name='image'>
                      <ImageContainer>
                        <Image src={product.product.image} alt={product.product.title} />
                      </ImageContainer>
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
          <Summary>
            <Details>
              <DetailsTitle>Total amount</DetailsTitle>
              <DetailsInfo>UAH {order.amount}</DetailsInfo>
            </Details>
            <Details>
              <DetailsTitle>Shipping</DetailsTitle>
              <DetailsInfo>{order.shippingCompany}</DetailsInfo>
              <DetailsInfo>{order.shippingCity}</DetailsInfo>
            </Details>
            <Details>
              <DetailsTitle>Customer</DetailsTitle>
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
              <DetailsTitle>Recepient</DetailsTitle>
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
        </Container>
      </Modal>
    </>
  );
};

export default OrderDetails;