import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import ProductList from '../components/products/ProductList';
import ProductListPagination from '../components/products/ProductListPagination';
import { getProductsByCategory } from '../features/product/asyncActions';
import { selectPagesCount, selectProducts, selectProductStatus } from '../features/product/selectors';
import { AppDispatch } from '../features/store';


const Container = styled.div`
  ${tw`
    pt-3
    pb-3
    w-full
    flex
    flex-col
    justify-between
  `}
`;

const Products: React.FC = () => {
  const { category } = useParams();

  const [page, setPage] = useState(1);
  const productsPerPage = 10;

  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectProducts);
  const pageCount = useSelector(selectPagesCount)
  const status = useSelector(selectProductStatus);

  useEffect(() => {
    dispatch(getProductsByCategory({ page, productsPerPage, category })); 
  }, [dispatch, category, page]);

  if(status === 'loading') {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <Container>
      <ProductList products={products} />
      <ProductListPagination 
        pageCount={pageCount}
        currentPage={page}
        setPage={setPage}
      />
    </Container>
  );
};

export default Products;