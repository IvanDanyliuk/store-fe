import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { v4 as uuid } from 'uuid';
import Button from '../ui/Button';
import { SCREENS } from '../../helpers/screens';
import { setCellWidth } from '../../helpers/helpers';
import useTable from '../../hooks/useTable';
import { ButtonColor, ButtonType, IProduct, IProductCategory, ITableProps, TableTypes } from '../../../types/types';
import Pagination from './Pagination';


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

const TableBody = styled.tbody`
  tr {
    ${tw`
      
    `}
  }
  ${tw`
    
  `}
`;

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

const ProductImage = styled.img`
  ${tw`
    w-12
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

const WarningMessageBody = styled.div`
  ${tw`
  
  `}
`;

const Message = styled.p`
  ${tw`

  `}
`;


const Table: React.FC<ITableProps> = ({ tableType, data }) => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);

  const handleProductEdit = () => {

  };

  const handleProductDelete = () => {

  };

  const handleCategoryEdit = () => {

  };

  const handleCategoryDelete = () => {

  };

  const emptyRows = page > 1 ? Math.max(0, page) * rowsPerPage - data.length : 0;

  if(data.length === 0) {
    return (
      <WarningMessageBody>
        <Message>
          There are no available {tableType === TableTypes.Products ? 'products' : 'categories'}
        </Message>
      </WarningMessageBody>
    )
  }

  return (
    <Container>
      <TableContainer>
        <TableHead>
          <TableRow>
            {
              tableType === TableTypes.Products ? (
                <>
                  <TableHeaderCell name='productName'>Name</TableHeaderCell>
                  <TableHeaderCell name='productPrice'>Price</TableHeaderCell>
                  <TableHeaderCell name='productRating'>Rating</TableHeaderCell>
                  <TableHeaderCell name='productImage'></TableHeaderCell>
                  <TableHeaderCell name='productActions'></TableHeaderCell>
                </>
              ) : (
                <>
                  <TableHeaderCell name='categoryName'>Name</TableHeaderCell>
                  <TableHeaderCell name='categoryActions'></TableHeaderCell>
                </>
              )
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            tableType === TableTypes.Products ? 
              slice.map((product: IProduct) => 'title' in product && (
                <TableRow key={uuid()}>
                  <TableCell name='productName'>{product.title}</TableCell>
                  <TableCell name='productPrice'>{product.price}</TableCell>
                  <TableCell name='productRating'>{product.rating}</TableCell>
                  <TableCell name='productImage'>
                    <ProductImage src={product.image} alt={product.title} />
                  </TableCell>
                  <TableCell name='productActions'>
                    <Button 
                      color={ButtonColor.Success} 
                      type={ButtonType.Button}
                      onClick={handleProductEdit}
                    >
                      Edit
                    </Button>
                    <Button 
                      color={ButtonColor.Danger} 
                      type={ButtonType.Button}
                      onClick={handleProductDelete}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              )) : 
              slice.map((category: IProductCategory) => 'main' in category && (
                <TableRow key={uuid()}>
                  <TableCell name='categoryName'>{category.main.title}</TableCell>
                  <TableCell name='categoryActions'>
                    <Button 
                      color={ButtonColor.Success} 
                      type={ButtonType.Button}
                      onClick={handleCategoryEdit}
                    >
                      Edit
                    </Button>
                    <Button 
                      color={ButtonColor.Danger} 
                      type={ButtonType.Button}
                      onClick={handleCategoryDelete}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
          }
          {
            emptyRows > 0 && (
              <TableRow style={{height: 80 * emptyRows}}>
                <TableCell name='' />
              </TableRow>
            )
          }
        </TableBody>
      </TableContainer>
      <Pagination 
        range={range} 
        slice={slice} 
        setPage={setPage} 
        page={page} 
      />
    </Container>
  );
};

export default Table;