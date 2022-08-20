import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';
import { IProductListProps } from '../../../types/types';
import { IProductState } from '../../features/product/types';
import { AppDispatch } from '../../features/store';
import { getProducts } from '../../features/product/asyncActions';
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
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: any) => state.product.products);

  useEffect(() => {
    dispatch(getProducts()); 
  }, []);
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