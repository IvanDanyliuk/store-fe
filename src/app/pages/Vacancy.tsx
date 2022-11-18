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
    mt-6
    mb-6
    text-xl
    font-semibold
  `}
`;

const Employment = styled.span`
  width: fit-content;
  ${tw`
    pl-3
    pr-3
    pt-2
    pb-2
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

const Text = styled.p``;

const ContactItem = styled.div``;

const Salary = styled.div`
  ${tw`
    mt-3
    mb-3
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
          <Text key={uuid()}>
            {skill}
          </Text>
        ))}
      </SectionContent>
      <SectionTitle>
        {t('responsibilities')}
      </SectionTitle>
      <SectionContent>{vacancy?.responsibilities.split('\n').map(responsibility => (
        <Text key={uuid()}>
          {responsibility}
        </Text>
      ))}</SectionContent>
      {
        vacancy?.salary && (
          <Salary>{t('salary')}: USD{vacancy?.salary}</Salary>
        )
      }
      <SectionContent>
        <ContactItem>{t('contactPerson')}: {vacancy?.contactPerson}</ContactItem>
        <ContactItem>{t('contactEmail')}: {vacancy?.contactPhone}</ContactItem>
        <ContactItem>{t('contactPhone')}: {vacancy?.contactPhone}</ContactItem>
      </SectionContent>
    </Container>
  );
};

export default Vacancy;