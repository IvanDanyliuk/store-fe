import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import ProductList from '../components/products/ProductList';
import { getProducts } from '../features/product/asyncActions';
import { selectProducts } from '../features/product/selectors';
import { AppDispatch } from '../features/store';


const Container = styled.div`
  ${tw`
    pt-3
    pb-3
    w-full
  `}
`;

const Products: React.FC = () => {
  const { pathname } = useLocation();
  const category = pathname.split('/')[2];

  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(getProducts(category)); 
  }, []);
  return (
    <Container>
      <ProductList products={products} category={category} />
    </Container>
  );
};

export default Products;