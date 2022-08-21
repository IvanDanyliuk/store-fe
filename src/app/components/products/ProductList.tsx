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

const ProductList: React.FC<IProductListProps> = ({ products, category }) => {
  
  return (
    <Container>
      {category ? 
        products
          .filter((product: any) => product.category.subCategory.url === category)
          .map((product: any) => (
            <ProductCard key={product._id} product={product} />
          )) : 
        products
          .map((product: any) => (
            <ProductCard key={product._id} product={product} />
          )
      )}
    </Container>
  );
};

export default ProductList;