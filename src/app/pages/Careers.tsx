import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useTranslation } from 'react-i18next';
import { AppDispatch } from '../features/store';
import { selectPagesCount, selectVacancies, selectVacancyStatus } from '../features/vacancies/selectors';
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

const Content = styled.div`
  ${tw`
  
  `}
`;

const VacanciesList = styled.ul`
  ${tw`
  
  `}
`;

const VacancyItem = styled.li`
  ${tw`
  
  `}
`;

const VacancyLink = styled(Link)`
  ${tw`
  
  `}
`;


const Careers: React.FC = () => {
  const { t } = useTranslation(['careers']);
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const vacancies = useSelector(selectVacancies);
  const status = useSelector(selectVacancyStatus);
  const pageCount = useSelector(selectPagesCount);

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
            <div>Loading...</div>
          ) : (
            <VacanciesList>
              {
                vacancies.map(vacancy => (
                  <VacancyItem>
                    <VacancyLink to={`/vacancies/${vacancy._id}`}>
                      {vacancy.title}
                    </VacancyLink>
                  </VacancyItem>
                ))
              }
            </VacanciesList>
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