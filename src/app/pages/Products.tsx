import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import Filters from '../components/products/Filters';
import PaginatedProductList from '../components/products/PaginatedProductList';


const Container = styled.div`
  ${tw`
    pt-3
    pb-3
    w-full
    flex
    flex-col
    md:flex-row
    justify-between
  `}
`;


const Products: React.FC = () => {
  
  return (
    <Container>
      <Filters />
      <PaginatedProductList />
    </Container>
  );
};

export default Products;