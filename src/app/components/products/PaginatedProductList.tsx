import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { getProducts } from '../../features/product/asyncActions';
import { selectPagesCount, selectProducts, selectProductStatus } from '../../features/product/selectors';
import { AppDispatch } from '../../features/store';
import ProductList from './ProductList';
import ProductListPagination from './ProductListPagination';


const Content = styled.div`
  ${tw`
    w-full
  `}
`;


const PaginatedProductList: React.FC = () => {
  const { category } = useParams();

  const [page, setPage] = useState(1);
  const productsPerPage = 10;

  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectProducts);
  const pageCount = useSelector(selectPagesCount)
  const status = useSelector(selectProductStatus);

  useEffect(() => {
    dispatch(getProducts({ page, productsPerPage, category })); 
  }, [dispatch, category, page]);

  if(status === 'loading') {
    return (
      <div>Loading...</div>
    );
  }
  return (
    <Content>
        <ProductList products={products} />
        <ProductListPagination 
          pageCount={pageCount}
          currentPage={page}
          setPage={setPage}
        />
      </Content>
  );
};

export default PaginatedProductList;