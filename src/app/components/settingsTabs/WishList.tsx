import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';
import { selectWishList } from '../../features/user/selectors';
import ProductList from '../products/ProductList';

const Container = styled.div`
  ${tw`
    w-full
    
  `}
`;

const WarningMessage = styled.div`
  
  ${tw`
    w-full
    h-full
    flex
    justify-center
    items-center
  `}
`;

const WishList = () => {
  const wishList = useSelector(selectWishList);
  return (
    <Container>
      {
        wishList.length > 0 ? (
          <ProductList products={wishList} />
        ) : (
          <WarningMessage>Your wish-list is empty</WarningMessage>
        )
      }
    </Container>
  );
};

export default WishList;