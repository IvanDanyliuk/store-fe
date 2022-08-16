import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { v4 as uuid } from 'uuid';
import ProductCard from '../components/products/ProductCard';
import ProductList from '../components/products/ProductList';
import { products } from '../data';


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
  return (
    <Container>
      <ProductList category={category} />
    </Container>
  );
};

export default Products;