import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { v4 as uuid } from 'uuid';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../features/store';
import { getVacancy } from '../features/vacancies/asyncActions';
import { selectVacancy } from '../features/vacancies/selectors';


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

const Employment = styled.span`
  width: fit-content;
  ${tw`
    px-3
    py-2
    text-sm
    bg-gray-600
    text-white
    rounded
  `}
`;

const SectionTitle = styled.h6`
  ${tw`
    mt-3
    text-lg
    font-semibold
  `}
`;

const SectionContent = styled.p`
  ${tw`
    mb-3
  `}
`;

const Salary = styled.div`
  ${tw`
    my-3
    font-semibold
  `}
`;


const Vacancy: React.FC = () => {
  const { t } = useTranslation(['vacancy']);
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const vacancy = useSelector(selectVacancy);

  useEffect(() => {
    if(id) {
      dispatch(getVacancy(id));
    }
  }, []);

  return (
    <Container>
      <Title>
        {vacancy?.title}
      </Title>
      <Employment>
        {vacancy?.employment} | {vacancy?.character}
      </Employment>
      <SectionTitle>
        {t('skills')}
      </SectionTitle>
      <SectionContent>
        {vacancy?.mustHaves.split('\n').map(skill => (
          <p key={uuid()}>
            {skill}
          </p>
        ))}
      </SectionContent>
      <SectionTitle>
        {t('responsibilities')}
      </SectionTitle>
      <SectionContent>{vacancy?.responsibilities.split('\n').map(responsibility => (
        <p key={uuid()}>
          {responsibility}
        </p>
      ))}</SectionContent>
      {
        vacancy?.salary && (
          <Salary>{t('salary')}: USD{vacancy?.salary}</Salary>
        )
      }
      <SectionContent>
        <div>
          {t('contactPerson')}: {vacancy?.contactPerson}
        </div>
        <div>
          {t('contactEmail')}: {vacancy?.contactPhone}
        </div>
        <div>
          {t('contactPhone')}: {vacancy?.contactPhone}
        </div>
      </SectionContent>
    </Container>
  );
};

export default Vacancy;