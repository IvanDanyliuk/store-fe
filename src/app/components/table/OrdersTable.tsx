import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { v4 as uuid } from 'uuid';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { SCREENS } from '../../helpers/screens';
import { getOtherProductsQuantity, setCellWidth } from '../../helpers/helpers';
import { ICellProps, IOrdersTableProps } from '../../../types/types';
import OrderDetails from '../modals/OrderDetails';
import ProductListImage from '../ui/ProductListImage';


const Container = styled.div`
  ${tw`
    overflow-x-auto
    whitespace-nowrap
  `}
`;

const TableContainer = styled.table`
  ${tw`
    mt-3
    w-full
    border-b
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

const TableRow = styled.tr`
  ${tw`
    w-full
    h-20
  `}
`;

const TableHeaderCell = styled.th<ICellProps>`
  width: ${({ name }) => setCellWidth(name, false)};
  @media (max-width: ${SCREENS.md}) {
    width: ${({ name }) => setCellWidth(name, true)};
  }
  ${tw`
    pt-3
    pb-3
    text-left
  `}
`;

const TableCell = styled.td<ICellProps>`
  min-width: ${({ name }) => setCellWidth(name, false)};
  @media (max-width: ${SCREENS.md}) {
    min-width: ${({ name }) => setCellWidth(name, true)};
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

const ProductImages = styled.div`
  ${tw`
    w-1/2
    md:w-4/12
    flex
    items-center
  `}
`;

const OtherProducts = styled.span`
  ${tw`
    text-xs
  `}
`;

const WarningMessageBody = styled.div``;

const Message = styled.p``;


const OrdersTable: React.FC<IOrdersTableProps> = ({ orders }) => {
  const { t } = useTranslation(['settingTabsOrder']);

  if(orders.length === 0) {
    return (
      <WarningMessageBody>
        <Message>
          {t('noOrdersMessage')}
        </Message>
      </WarningMessageBody>
    );
  }

  return (
    <Container>
      <TableContainer>
        <TableHead>
          <TableRow>
            <TableHeaderCell name='orderId'>
              {t('tableOrderId')}
            </TableHeaderCell>
            <TableHeaderCell name='orderDate'>
              {t('tableOrderDate')}
            </TableHeaderCell>
            <TableHeaderCell name='orderAmount'>
              {t('tableOrderAmount')}
            </TableHeaderCell>
            <TableHeaderCell name='orderImage'></TableHeaderCell>
            <TableHeaderCell name='orderActions'></TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            orders.map(order => (
              <TableRow key={uuid()}>
                <TableCell name='orderId'>
                  {order._id}
                </TableCell>
                <TableCell name='orderDate'>
                  {moment(order.createdAt).format('DD MM YYYY')}
                </TableCell>
                <TableCell name='orderAmount'>
                  {order.amount}
                </TableCell>
                <TableCell name='orderImage'>
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
                </TableCell>
                <TableCell name='orderActions'>
                  <OrderDetails order={order} />
                </TableCell>
              </TableRow>
            )) 
          }
        </TableBody>
      </TableContainer>
    </Container>
  );
};

export default OrdersTable;