import React, { useEffect } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { v4 as uuid } from 'uuid';
import { IPaginationBtn, IPaginationProps } from '../../../types/types';
import { 
  PAGINATION_LINK_COLOR, 
  PAGINATION_ACTIVE_LINK_COLOR 
} from '../../services/constants';


const PaginationBody = styled.div`
  ${tw`
    pt-3
    pb-3
    w-full
    flex
    justify-center
  `}
`;

const PageButton = styled.button<IPaginationBtn>`
  font-weight: ${({ isActive }) => isActive ? '700' : '300'};
  color: ${({ isActive }) => isActive ? PAGINATION_ACTIVE_LINK_COLOR : PAGINATION_LINK_COLOR};
  ${tw`
    p-3
  `}
`;


const Pagination: React.FC<IPaginationProps> = ({ range, slice, setPage, page }) => {
  useEffect(() => {
    if(slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);

  return (
    <PaginationBody>
      {
        range.map((item: number) => (
          <PageButton 
            key={uuid()}
            isActive={page === item}
            onClick={() => setPage(item)}
          >
            {item}
          </PageButton>
        ))
      }
    </PaginationBody>
  );
};

export default Pagination;