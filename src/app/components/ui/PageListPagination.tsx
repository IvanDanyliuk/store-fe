import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { v4 as uuid } from 'uuid';
import { IPageListPaginationProps } from '../../../types/types';
import { 
  PAGINATION_LINK_COLOR, 
  PAGINATION_ACTIVE_LINK_COLOR 
} from '../../services/constants';


const Container = styled.ul`
  ${tw`
    pt-7
    pb-4
    flex
    justify-center
  `}
`;

const NumberItem = styled.li`
  ${tw`
    mr-3
  `}
`;

const NumberBtn = styled.button`
  &[data-isactive='true'] {
    font-weight: 700;
    color: ${PAGINATION_LINK_COLOR};
  }
  &[data-isactive='false'] {
    color: ${PAGINATION_ACTIVE_LINK_COLOR};
  }
`;


const PageListPagination: React.FC<IPageListPaginationProps> = ({
  pageCount, 
  currentPage, 
  setPage
}) => {
  const numbers = [...Array(pageCount).keys()].map(i => i + 1);

  return (
    <Container>
      {numbers.map(number => (
        <NumberItem key={uuid()}>
          <NumberBtn 
            data-isactive={currentPage === number} 
            onClick={() => setPage(number)}
          >
            {number}
          </NumberBtn>
        </NumberItem>
      ))}
    </Container>
  );
};

export default PageListPagination;