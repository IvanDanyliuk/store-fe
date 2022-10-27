import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import ProductList from '../components/products/ProductList';
import { getProductsByCategory } from '../features/product/asyncActions';
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
  const { category } = useParams();

  //TEMPORARY PAGE DATA
  const page = 1;
  const productsPerPage = 10;
  //needs to add the logic of getting all amount of the available products or pages
  //needs to add the logic of changing of the current page number

  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectProducts);
  const status = useSelector(selectProductStatus);

  useEffect(() => {
    dispatch(getProductsByCategory({page, productsPerPage, category})); 
  }, [dispatch, category]);

  if(status === 'loading') {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <Container>
      <ProductList products={products} />
    </Container>
  );
};

export default Products;