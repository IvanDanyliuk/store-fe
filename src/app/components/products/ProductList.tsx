import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useTranslation } from 'react-i18next';
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
    justify-center
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