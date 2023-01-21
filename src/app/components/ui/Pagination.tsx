import React from 'react';
import styled from 'styled-components';
import ReactPagination from 'react-paginate';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IPaginationProps } from '../../../types/types';
import { PAGINATION_ACTIVE_LINK_COLOR } from '../../services/constants';


const PaginationContainer = styled(ReactPagination)`
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


const Pagination: React.FC<IPaginationProps> = ({
  pageCount, 
  setPage
}) => {
  return (
    <PaginationContainer 
      breakLabel='...'
      nextLabel={<FontAwesomeIcon icon={faAngleRight} />}
      className='pagination-container'
      onPageChange={(e) => setPage(e.selected + 1)}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel={<FontAwesomeIcon icon={faAngleLeft} />}
      renderOnZeroPageCount={() => null}
    />
  );
};

export default Pagination;