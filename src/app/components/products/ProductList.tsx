import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { products } from '../../data';
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

const ProductList: React.FC = () => {
  return (
    <Container>
      {products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </Container>
  );
};

export default ProductList;