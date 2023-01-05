import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { v4 as uuid } from 'uuid';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import Button from '../ui/Button';
import { SCREENS } from '../../helpers/screens';
import { setCellWidth } from '../../helpers/helpers';
import { ButtonColor, ButtonType, ICellProps, IVacanciesTableProps } from '../../../types/types';
import { IVacancy } from '../../features/vacancies/types';
import Loader from '../ui/Loader';


const Container = styled.div`
  ${tw`
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
  `}
`;

const WarningMessageBody = styled.div``;

const Message = styled.p``;


const VacanciesTable: React.FC<IVacanciesTableProps> = ({ vacancies, status, onEdit, onDelete }) => {
  const { t } = useTranslation(['settingTabsEditor']);

  if(status === 'loading') {
    return <Loader />;
  }

  if(vacancies.length === 0) {
    return (
      <WarningMessageBody>
        <Message>
          {t('vacanciesNoDataMessage')}
        </Message>
      </WarningMessageBody>
    );
  }

  return (
    <Container>
      <TableContainer>
        <TableHead>
          <TableRow>
            <TableHeaderCell name='vacancyName'>
              {t('vacanciesTableTitleName')}
            </TableHeaderCell>
            <TableHeaderCell name='vacancyDate'>
              {t('vacanciesTableTitlePrice')}
            </TableHeaderCell>
            <TableHeaderCell name='vacancyActions'></TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            vacancies.map((vacancy: IVacancy) => (
              <TableRow key={uuid()}>
                <TableCell name='vacancyName'>
                  {vacancy.title}
                </TableCell>
                <TableCell name='vacancyDate'>
                  {moment(vacancy.createdAt).format('DD MM YYYY')}
                </TableCell>
                <TableCell name='vacancyActions'>
                  <Button 
                    color={ButtonColor.Success} 
                    type={ButtonType.Button}
                    onClick={() => onEdit(vacancy._id!)}
                  >
                    {t('editBtn')}
                  </Button>
                  <Button 
                    color={ButtonColor.Danger} 
                    type={ButtonType.Button}
                    onClick={() => onDelete(vacancy._id!)}
                  >
                    {t('deleteBtn')}
                  </Button>
                </TableCell>
              </TableRow>
            )) 
          }
        </TableBody>
      </TableContainer>
    </Container>
  );
};

export default VacanciesTable;