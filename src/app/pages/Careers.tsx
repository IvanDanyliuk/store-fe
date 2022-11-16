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
import PageListPagination from '../components/ui/PageListPagination';


const Container = styled.div`
  ${tw`
    w-full
    flex
    flex-col
  `}
`;

const Title = styled.h3`
  ${tw`
    mt-6
    mb-6
    text-xl
    font-semibold
  `}
`;

const Content = styled.div``;

const VacanciesList = styled.ul``;

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
  const itemsPerPage = 10;
  const vacancies = useSelector(selectVacancies);
  const status = useSelector(selectVacancyStatus);
  const pageCount = useSelector(selectVacancyPagesCount);

  useEffect(() => {
    dispatch(getVacancies({ page, itemsPerPage }));
  }, [dispatch, page])

  return (
    <Container>
      <Title>
        {t('title')}      
      </Title>
      <Content>
        {
          status === 'loading' ? (
            <Message>{t('vacanciesLoading')}</Message>
          ) : 
          vacancies.length > 0 ? (
            <VacanciesList>
              {
                vacancies.map(vacancy => (
                  <VacancyItem>
                    <VacancyLink to={`/careers/${vacancy._id}`}>
                      <VacancyTitle>{vacancy.title}</VacancyTitle>
                      <VacancyDate>{moment(vacancy.createdAt).format('DD MM YYYY')}</VacancyDate>
                    </VacancyLink>
                  </VacancyItem>
                ))
              }
            </VacanciesList>
          ) : (
            <Message>{t('vacanciesMessage')}</Message>
          )
        }
      </Content>
      <PageListPagination 
        currentPage={page} 
        pageCount={pageCount} 
        setPage={setPage} 
      />
    </Container>
  );
};

export default Careers;