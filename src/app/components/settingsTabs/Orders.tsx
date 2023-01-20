import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useTranslation } from 'react-i18next';
import ReactPagination from 'react-paginate';
import { ButtonColor, ButtonType } from '../../../types/types';
import { getOrders, getUserOrders } from '../../features/order/asyncActions';
import { selectOrderPages, selectOrders, selectOrderStatus } from '../../features/order/selectors';
import { AppDispatch } from '../../features/store';
import { selectUser } from '../../features/user/selectors';
import Input from '../inputs/Input';
import Button from '../ui/Button';
import OrdersTable from '../table/OrdersTable';
import { ORDERS_PER_TABLE, PAGINATION_ACTIVE_LINK_COLOR } from '../../services/constants';
import Loader from '../ui/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';


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
    flex
  `}
  input {
    margin-bottom: 0;
  }

  button {
    margin-top: 28px;
    margin-left: 10px;
    margin-bottom: 4px;
  }
`;

const Content = styled.div``;

const Pagination = styled(ReactPagination)`
  &.pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    font-size: 1.1rem;
  }

  li a {
    padding: 10px;
    color: #000000;
  }

  li.selected a {
    font-weight: 700;
    color: ${PAGINATION_ACTIVE_LINK_COLOR};
  }
`;


const Orders: React.FC = () => {
  const { t } = useTranslation(['settingTabsOrder']);
  const dispatch = useDispatch<AppDispatch>();

  const { isAdmin, email } = useSelector(selectUser);
  const orders = useSelector(selectOrders);
  const orderLoadingStatus = useSelector(selectOrderStatus);
  const pageCount = useSelector(selectOrderPages);
  
  const [page, setPage] = useState(1);
  const ordersPerPage = ORDERS_PER_TABLE;
  const [searchValue, setSearchValue] = useState('');

  const handleSearchValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleOrderFind = () => {
    setPage(1);
    dispatch(getOrders({ page: 1, ordersPerPage, filterData: searchValue }));
  };

  useEffect(() => {
    if(isAdmin!) {
      if(searchValue) {
        dispatch(getOrders({ page, ordersPerPage, filterData: searchValue }));
      } else {
        dispatch(getOrders({ page, ordersPerPage }));
      }
    } else {
      dispatch(getUserOrders({ page, ordersPerPage, email }));
    }
  }, [dispatch, page]);

  return (
    <Container>
      {isAdmin && (
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
      <Content>
        {
          orderLoadingStatus === 'succeeded' ? (
            <OrdersTable orders={orders} />
          ) : (
            <Loader />
          )
        }
        <Pagination 
          breakLabel='...'
          nextLabel={<FontAwesomeIcon icon={faAngleRight} />}
          className='pagination-container'
          onPageChange={(e) => setPage(e.selected + 1)}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel={<FontAwesomeIcon icon={faAngleLeft} />}
          renderOnZeroPageCount={() => null}
        />
      </Content>
    </Container>
  );
};

export default Orders;