import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { v4 as uuid } from 'uuid';
import { useTranslation } from 'react-i18next';
import ReactPagination from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Button from '../ui/Button';
import { SCREENS } from '../../helpers/screens';
import { setCellWidth } from '../../helpers/helpers';
import useTable from '../../hooks/useTable';
import { ButtonColor, ButtonType, ICellProps, ITableProps, TableTypes } from '../../../types/types';
import { IProductCategory } from '../../features/category/types';
import { IShipping } from '../../features/shipping/types';
import Loader from '../ui/Loader';
import DeleteItemModal from '../modals/DeleteItemModal';
import { PAGINATION_ACTIVE_LINK_COLOR } from '../../services/constants';


const Container = styled.div`
  ${tw`
    h-full
    overflow-x-auto
    whitespace-nowrap
  `}
`;

const TableContainer = styled.table`
  ${tw`
    mt-3
    w-full
    border-b
  `}
`;

const TableHead = styled.thead`
  ${tw`
    relative
    w-full
    border-t
    border-b
  `}
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  ${tw`
    w-full
    h-20
  `}
`;

const TableHeaderCell = styled.th<ICellProps>`
  width: ${({ name }) => setCellWidth(name, false)};
  @media (max-width: ${SCREENS.md}) {
    width: ${({ name }) => setCellWidth(name, true)};
  }
  ${tw`
    pt-3
    pb-3
    text-left
  `}
`;

const TableCell = styled.td<ICellProps>`
  min-width: ${({ name }) => setCellWidth(name, false)};
  @media (max-width: ${SCREENS.md}) {
    min-width: ${({ name }) => setCellWidth(name, true)};
  }
  button {
    ${tw`
      ml-3
    `}
  }
  ${tw`
    pt-2
    pb-2
    text-sm
    md:text-base
  `}
`;

const WarningMessageBody = styled.div``;

const Message = styled.p``;

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


const Table: React.FC<ITableProps> = ({ tableType, data, status, onEdit, onDelete }) => {
  const { t } = useTranslation(['ui']);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);

  const emptyRows = page > 1 ? Math.max(0, page) * rowsPerPage - data.length : 0;

  useEffect(() => {
    if(emptyRows === rowsPerPage) {
      setPage(page - 1);
    }
  }, [data.length])

  if(status === 'loading') {
    return <Loader />;
  }

  if(data.length === 0) {
    return (
      <WarningMessageBody>
        <Message>
          {
            tableType === TableTypes.Categories ? 
              t('tableNoCategoriesMessage') : 
              t('tableNoShippingMessage')
          }
        </Message>
      </WarningMessageBody>
    );
  }

  return (
    <Container>
      <TableContainer>
        <TableHead>
          <TableRow>
            {
              tableType === TableTypes.Categories ? (
                <>
                  <TableHeaderCell name='categoryName'>
                    {t('tableHeadName')}
                  </TableHeaderCell>
                  <TableHeaderCell name='categoryActions'></TableHeaderCell>
                </>
              ) : (
                <>
                  <TableHeaderCell name='shippingName'>
                    {t('tableHeadCompany')}
                  </TableHeaderCell>
                  <TableHeaderCell name='shippingActions'></TableHeaderCell>
                </>
              )
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            tableType === TableTypes.Categories ? (
                slice.map((category: IProductCategory) => 'main' in category && (
                  <TableRow key={uuid()}>
                    <TableCell name='categoryName'>
                      {category.main.title}
                    </TableCell>
                    <TableCell name='categoryActions'>
                      <Button 
                        color={ButtonColor.Success} 
                        type={ButtonType.Button}
                        onClick={() => onEdit(category._id!)}
                      >
                        {t('tableEditBtn')}
                      </Button>
                      <DeleteItemModal 
                        deleteHandler={() => onDelete(category._id!)} 
                        message={'preDeleteCategoryAnswer'} 
                      />
                    </TableCell>
                  </TableRow>
                )
              )) : slice.map((shippingOption: IShipping) => 'company' in shippingOption && (
                <TableRow key={uuid()}>
                  <TableCell name='shippingName'>
                    {shippingOption.company}
                  </TableCell>
                  <TableCell name='shippingActions'>
                    <Button 
                      color={ButtonColor.Success} 
                      type={ButtonType.Button}
                      onClick={() => onEdit(shippingOption._id!)}
                    >
                      {t('tableEditBtn')}
                    </Button>
                    <DeleteItemModal 
                      deleteHandler={() => onDelete(shippingOption._id!)} 
                      message={'preDeleteShippingAnswer'} 
                    />
                  </TableCell>
                </TableRow>
              )
            )
          }
          {
            emptyRows > 0 && (
              <TableRow style={{height: 80 * emptyRows}}>
                <TableCell name='' />
              </TableRow>
            )
          }
        </TableBody>
      </TableContainer>
      <Pagination 
        breakLabel='...'
        nextLabel={<FontAwesomeIcon icon={faAngleRight} />}
        className='pagination-container'
        onPageChange={(e) => setPage(e.selected + 1)}
        pageRangeDisplayed={5}
        pageCount={Math.ceil(data.length / rowsPerPage)}
        previousLabel={<FontAwesomeIcon icon={faAngleLeft} />}
        renderOnZeroPageCount={() => null}
      />
    </Container>
  );
};

export default Table;