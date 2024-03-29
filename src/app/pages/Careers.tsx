import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { AppDispatch } from '../features/store';
import { selectVacancyPagesCount, selectVacancies, selectVacancyStatus } from '../features/vacancies/selectors';
import { getVacancies } from '../features/vacancies/asyncActions';
import { VACANCIES_PER_PAGE } from '../services/constants';
import { Loader, Pagination } from '../components/ui';


const Container = styled.div`
  ${tw`
    p-3
    w-full
    flex
    flex-col
  `}
`;

const Title = styled.h3`
  ${tw`
    my-6
    text-xl
    font-semibold
  `}
`;

const VacancyItem = styled.li`
  ${tw`
    border-b
  `}
`;

const VacancyLink = styled(Link)`
  ${tw`
    pt-3
    pb-3
    flex
    justify-between
    items-center
  `}
`;

const VacancyTitle = styled.span`
  ${tw`
    font-semibold
  `}
`;

const VacancyDate = styled.span`
  ${tw`
    text-sm
  `}
`;

const Message = styled.div`
  ${tw`
    w-full
    h-full
    flex
    justify-center
    items-center
  `}
`;


const Careers: React.FC = () => {
  const { t } = useTranslation(['careers']);
  const dispatch = useDispatch<AppDispatch>();

  const [page, setPage] = useState(1);
  const vacancies = useSelector(selectVacancies);
  const status = useSelector(selectVacancyStatus);
  const pageCount = useSelector(selectVacancyPagesCount);

  useEffect(() => {
    dispatch(getVacancies({ page, itemsPerPage: VACANCIES_PER_PAGE }));
  }, [dispatch, page]);

  return (
    <Container>
      <Title>
        {t('title')}      
      </Title>
      <div>
        {
          status === 'loading' ? (
            <Loader />
          ) : 
          vacancies.length > 0 ? (
            <ul>
              {
                vacancies.map(vacancy => (
                  <VacancyItem>
                    <VacancyLink to={`/careers/${vacancy._id}`}>
                      <VacancyTitle>
                        {vacancy.title}
                      </VacancyTitle>
                      <VacancyDate>
                        {moment(vacancy.createdAt).format('DD MM YYYY')}
                      </VacancyDate>
                    </VacancyLink>
                  </VacancyItem>
                ))
              }
            </ul>
          ) : (
            <Message>{t('vacanciesErrorMessage')}</Message>
          )
        }
      </div>
      <Pagination 
        pageCount={pageCount} 
        setPage={setPage} 
      />
    </Container>
  );
};

export default Careers;