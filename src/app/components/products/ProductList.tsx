import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useTranslation } from 'react-i18next';
import { IProductListProps } from '../../../types/types';
import ProductCard from './ProductCard';


const Container = styled.ul`
  ${tw`
    grid
    grid-cols-1
    md:grid-cols-4
    gap-5
  `}
`;

const Message = styled.div`
  ${tw`
    w-full
    text-center
  `}
`;


const ProductList: React.FC<IProductListProps> = ({ products }) => {
  const { t } = useTranslation(['products']);
  
  return (
    <Container>
      {
        products.length > 0 ? products.map((product: any) => (
          <ProductCard key={product._id} product={product} />
        )) : (
          <Message>
            {t('errorMessage')}
          </Message>
        )
      }
    </Container>
  );
};

export default ProductList;