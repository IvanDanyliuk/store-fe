import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { IProductListProps } from '../../../types/types';
import ProductCard from './ProductCard';


const Container = styled.ul`
  ${tw`
    flex
    flex-col
    md:flex-row
    md:flex-wrap
    gap-3
    md:gap-8
  `}
`;

const Message = styled.div`
  ${tw`
    w-full
    text-center
  `}
`;



const ProductList: React.FC<IProductListProps> = ({ products }) => {
  return (
    <Container>
      {
        products.length > 0 ? products.map((product: any) => (
          <ProductCard key={product._id} product={product} />
        )) : (
          <Message>Cannot find products for your request...</Message>
        )
      }
    </Container>
  );
};

export default ProductList;