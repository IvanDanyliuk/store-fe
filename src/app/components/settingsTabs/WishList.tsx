import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useTranslation } from 'react-i18next';
import { selectWishList } from '../../features/user/selectors';
import { ProductList } from '../products';


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

const WishList: React.FC = () => {
  const { t } = useTranslation(['settingTabsWishList']);
  const wishList = useSelector(selectWishList);
  
  return (
    <Container>
      {
        wishList.length > 0 ? (
          <ProductList products={wishList} />
        ) : (
          <WarningMessage>{t('message')}</WarningMessage>
        )
      }
    </Container>
  );
};

export default WishList;