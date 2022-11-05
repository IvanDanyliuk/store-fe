import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useTranslation } from 'react-i18next';
import { ButtonColor, ButtonType } from '../../../types/types';
import { getOrders, getUserOrders } from '../../features/order/asyncActions';
import { selectOrders } from '../../features/order/selectors';
import { IOrder } from '../../features/order/types';
import { AppDispatch } from '../../features/store';
import { selectUser } from '../../features/user/selectors';
import Input from '../inputs/Input';
import OrderList from '../order/OrderList';
import Button from '../ui/Button';


const Container = styled.div`
  ${tw`
    w-full
  `}
`;

const FilterSection = styled.div`
  ${tw`
    relative
    pt-5
    pb-5
    w-full
    h-auto
    flex
    items-stretch
  `}
  button {
    margin-top: 28px;
    margin-left: 10px;
    margin-bottom: 4px;
  }
`;


const Orders: React.FC = () => {
  const { t } = useTranslation(['settingTabsOrder']);
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector(selectUser);
  const orders = useSelector(selectOrders);
  
  const [filteredOrders, setFilteredOrders] = useState<IOrder[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchValueChange = (e: any) => {
    setSearchValue(e.target.value);
  };

  const handleOrderFind = () => {
    setFilteredOrders(orders.filter((order: IOrder) => order.customer.lastName === searchValue));
  };

  useEffect(() => {
    if(searchValue === '') {
      setFilteredOrders([]);
    }
  }, [searchValue]);

  useEffect(() => {
    if(user?.isAdmin!) {
      dispatch(getOrders());
    } else {
      dispatch(getUserOrders(user!.email!));
    }
  }, []);

  return (
    <Container>
      {user?.isAdmin && (
        <FilterSection>
          <Input 
            name='searchValue'
            label={t('searchInputTitle')}
            value={searchValue}
            onChange={handleSearchValueChange}
          />
          <Button
            type={ButtonType.Button}
            color={ButtonColor.Secondary}
            onClick={handleOrderFind}
          >
            {t('searchBtn')}
          </Button>
        </FilterSection>
      )}
      <OrderList orders={filteredOrders.length > 0 ? filteredOrders : orders} />
    </Container>
  );
};

export default Orders;