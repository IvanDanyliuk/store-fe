import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { v4 as uuid } from 'uuid';


interface IProductListPaginationProps {
  pageCount: number;
  currentPage: number;
  setPage: (e: any) => void;
}


const Container = styled.ul`
  ${tw`
    pt-7
    pb-4
    flex
    justify-center
  `}
`;

const NumberItem = styled.li`
  ${tw`
    mr-3
  `}
`;

const NumberBtn = styled.button`
  &[data-isactive='true'] {
    font-weight: 700;
    color: #1fcdd6;
  }
  &[data-isactive='false'] {
    color: #000000;
  }
  ${tw`
  
  `}
`;


const ProductListPagination: React.FC<IProductListPaginationProps> = ({
  pageCount, 
  currentPage, 
  setPage
}) => {
  const numbers = [...Array(pageCount).keys()].map(i => i + 1);

  return (
    <Container>
      {numbers.map(number => (
        <NumberItem key={uuid()}>
          <NumberBtn data-isactive={currentPage === number} onClick={() => setPage(number)}>
            {number}
          </NumberBtn>
        </NumberItem>
      ))}
    </Container>
  );
};

export default ProductListPagination;