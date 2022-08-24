import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { v4 as uuid } from 'uuid';
import Button from '../ui/Button';
import { SCREENS } from '../../helpers/screens';
import { setCellWidth } from '../../helpers/helpers';
import useTable from '../../hooks/useTable';
import { ButtonColor, IProduct, IProductCategory, ITableProps, TableTypes } from '../../../types/types';
import Pagination from './Pagination';


interface ICellProps {
  name: string;
}

const TableContainer = styled.table`
  ${tw`
    mt-3
    w-full
  `}
`;

const TableHead = styled.thead`
  ${tw`
    relative
    w-full
    border-b
  `}
`;

const TableBody = styled.tbody`
  ${tw`
    
  `}
`;

const TableRow = styled.tr`
  ${tw`
    relative
    w-full
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
  width: ${({ name }) => setCellWidth(name, false)};
  @media (max-width: ${SCREENS.md}) {
    width: ${({ name }) => setCellWidth(name, true)};
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
                    onClick={handleProductEdit}
                  >
                    Edit
                  </Button>
                  <Button 
                    color={ButtonColor.Danger} 
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
                    onClick={handleCategoryEdit}
                  >
                    Edit
                  </Button>
                  <Button 
                    color={ButtonColor.Danger} 
                    onClick={handleCategoryDelete}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
        }
      </TableBody>
      <Pagination 
        range={range} 
        slice={slice} 
        setPage={setPage} 
        page={page} 
      />
    </TableContainer>
  );
};

export default Table;