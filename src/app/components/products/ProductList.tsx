import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { IProductListProps } from '../../../types/types';
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

const ProductList: React.FC<IProductListProps> = ({ category }) => {
  return (
    <Container>
      {category ? 
        products
          .filter(product => product.category.main.url === category)
          .map(product => (
            <ProductCard key={product._id} product={product} />
          )) : 
        products
          .map(product => (
            <ProductCard key={product._id} product={product} />
          )
      )}
    </Container>
  );
};

export default ProductList;