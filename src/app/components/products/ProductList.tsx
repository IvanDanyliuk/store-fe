import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { products } from '../../data';
import Product from './Product';


const Container = styled.ul`
border: 1px solid red;
  ${tw`
    flex
    flex-wrap
    gap-8
  `}
`;

const ProductList: React.FC = () => {
  return (
    <Container>
      {products.map(product => (
        <Product key={product.title} product={product} />
      ))}
    </Container>
  );
};

export default ProductList;