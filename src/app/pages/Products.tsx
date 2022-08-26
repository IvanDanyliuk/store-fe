import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import ProductList from '../components/products/ProductList';
import { getProducts } from '../features/product/asyncActions';
import { selectProducts, selectProductStatus } from '../features/product/selectors';
import { AppDispatch } from '../features/store';


const Container = styled.div`
  ${tw`
    pt-3
    pb-3
    w-full
  `}
`;

const Products: React.FC = () => {
  // const { pathname } = useLocation();
  // const category = pathname.split('/')[2];

  const { category } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectProducts);
  const status = useSelector(selectProductStatus);

  useEffect(() => {
    dispatch(getProducts(category)); 
  }, [dispatch, category]);

  if(status === 'loading') {
    return (
      <div>Loading...</div>
    )
  }

  console.log(category, products)

  return (
    <Container>
      <ProductList products={products} />
    </Container>
  );
};

export default Products;