import React, { useEffect } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { v4 as uuid } from 'uuid';
import { IPaginationProps } from '../../../types/types';


const PaginationBody = styled.div`
  ${tw`
  
  `}
`;

const PageButton = styled.button`
  ${tw`
  
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