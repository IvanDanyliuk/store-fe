import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { v4 as uuid } from 'uuid';
import { useTranslation } from 'react-i18next';
import Button from '../ui/Button';
import { SCREENS } from '../../helpers/screens';
import { setCellWidth } from '../../helpers/helpers';
import { ButtonColor, ButtonType, IProductsTableProps } from '../../../types/types';
import { IProduct } from '../../features/product/types';
import ProductListImage from '../ui/ProductListImage';


interface ICellProps {
  name: string;
}

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

const WarningMessageBody = styled.div``;

const Message = styled.p``;


const ProductTable: React.FC<IProductsTableProps> = ({ products, onEdit, onDelete }) => {
  const { t } = useTranslation(['settingTabsEditor']);

  if(products.length === 0) {
    return (
      <WarningMessageBody>
        <Message>
          {t('productsNoDataMessage')}
        </Message>
      </WarningMessageBody>
    );
  }

  return (
    <Container>
      <TableContainer>
        <TableHead>
          <TableRow>
            <TableHeaderCell name='productName'>
              {t('productsTableTitleName')}
            </TableHeaderCell>
            <TableHeaderCell name='productPrice'>
              {t('productsTableTitlePrice')}
            </TableHeaderCell>
            <TableHeaderCell name='productRating'>
              {t('productsTableTitleRating')}
            </TableHeaderCell>
            <TableHeaderCell name='productImage'></TableHeaderCell>
            <TableHeaderCell name='productActions'></TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            products.map((product: IProduct) => (
              <TableRow key={uuid()}>
                <TableCell name='productName'>{product.title}</TableCell>
                <TableCell name='productPrice'>{product.price}</TableCell>
                <TableCell name='productRating'>{product.rating}</TableCell>
                <TableCell name='productImage'>
                  <ProductListImage url={product.image} altText={product.title} />
                </TableCell>
                <TableCell name='productActions'>
                  <Button 
                    color={ButtonColor.Success} 
                    type={ButtonType.Button}
                    onClick={() => onEdit(product._id)}
                  >
                    {t('editBtn')}
                  </Button>
                  <Button 
                    color={ButtonColor.Danger} 
                    type={ButtonType.Button}
                    onClick={() => onDelete(product._id)}
                  >
                    {t('deleteBtn')}
                  </Button>
                </TableCell>
              </TableRow>
            )) 
          }
        </TableBody>
      </TableContainer>
    </Container>
  );
};

export default ProductTable;