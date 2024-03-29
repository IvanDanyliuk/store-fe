import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twin.macro';
import Modal from 'react-modal';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { SCREENS } from '../../services/screens';
import { Button, FormErrorMessage } from '../ui';
import { ButtonColor, ButtonType } from '../../../types/types';
import { AppDispatch } from '../../features/store';
import { Input, TextArea } from '../inputs';
import { isVacancyDataValid } from '../../helpers/formValidation';
import { clearVacancy } from '../../features/vacancies/reducers';
import { createVacancy, updateVacancy } from '../../features/vacancies/asyncActions';
import { selectVacancy } from '../../features/vacancies/selectors';
import { IVacancy } from '../../features/vacancies/types';
import { BASIC_BACKGROUND_WHITE, MODAL_OVERLAY_COLOR } from '../../services/constants';


if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root');


const FormHeader = styled.div`
  ${tw`
    mb-4
    flex
    justify-center
  `}
`;

const FormTitle = styled.h6`
  ${tw`
    text-xl
    font-bold
  `}
`;

const CloseBtn = styled.button`
  ${tw`
    absolute
    top-2
    right-4
    text-xl
  `}
`;

const VacancyForm = styled.form`
  ${tw`
    flex
    flex-wrap
    justify-between
  `}
  div:first-child {
    width: 100%;
  }
  div {
    width: 49%;
  }
`;

const Select = styled.select`
  ${tw`
    mt-1
    mb-3
    p-2
    w-full
    border
    rounded
  `}
`;

const Option = styled.option``;


const CreateVacancyForm: React.FC = () => {
  const { t } = useTranslation(['modals']);
  const dispatch = useDispatch<AppDispatch>();
  const dataToUpdate = useSelector(selectVacancy);
  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');
  const [vacancyData, setVacancyData] = useState<IVacancy>({
    title: '',
    employment: 'full-time',
    character: 'office',
    responsibilities: '',
    mustHaves: '',
    experience: '',
    salary: '',
    contactPerson: '',
    contactPhone: '',
    contactEmail: '',
  });

  const setInitialData = () => {
    setVacancyData({
      title: '',
      employment: 'full-time',
      character: 'office',
      responsibilities: '',
      mustHaves: '',
      experience: '',
      salary: '',
      contactPerson: '',
      contactPhone: '',
      contactEmail: '',
    });
  };

  const handleOpenModal = () => {
    if(isOpen && error) {
      setError('');
    }
    if(isOpen && dataToUpdate) {
      dispatch(clearVacancy());
      setInitialData();
    }
    setIsOpen(!isOpen);
  };

  const handleError = (error: string) => {
    setError(error);
  };

  const handleVacancyDataChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setVacancyData({
      ...vacancyData,
      [e.target.name]: e.target.value,
    });
  };

  const createNewVacancyOption = () => {
    const isDataValid = isVacancyDataValid(vacancyData, handleError);
    if(isDataValid) {
      dispatch(createVacancy(vacancyData));
      setInitialData();
      handleOpenModal();
    }
  };

  const updateVacancyOption = async () => {
    const isDataValid = isVacancyDataValid(vacancyData, handleError);
    if(isDataValid) {
      await dispatch(updateVacancy({ 
        id: dataToUpdate!._id!, 
        updatedVacancy: vacancyData, 
      }));
      dispatch(clearVacancy());
      setInitialData();
      handleOpenModal();
    }
  };

  const submitVacancyData = (e: SyntheticEvent) => {
    e.preventDefault();
    if(dataToUpdate) {
      updateVacancyOption();
    } else {
      createNewVacancyOption();
    }
  };

  const styles = {
    content: {
      width: isMobile ? '90%' : '700px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      background: BASIC_BACKGROUND_WHITE,
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      background: MODAL_OVERLAY_COLOR,
    }
  };

  useEffect(() => {
    if(dataToUpdate) {
      setIsOpen(!isOpen);
      setVacancyData({
        ...dataToUpdate,
        title: dataToUpdate.title,
        employment: dataToUpdate.employment,
        character: dataToUpdate.character,
        responsibilities: dataToUpdate.responsibilities,
        mustHaves: dataToUpdate.mustHaves,
        experience: dataToUpdate.experience,
        salary: dataToUpdate.salary,
        contactPerson: dataToUpdate.contactPerson,
        contactPhone: dataToUpdate.contactPhone,
        contactEmail: dataToUpdate.contactEmail,
      });
    }
  }, [dataToUpdate]);

  return (
    <>
      <Button
        color={ButtonColor.Success}
        type={ButtonType.Button}
        onClick={handleOpenModal}
      >
        {t('vacanciesOpenFormBtn')}
      </Button>
      <Modal 
        isOpen={isOpen}
        onRequestClose={handleOpenModal}
        style={styles}
      >
        <FormHeader>
          <FormTitle>
            {dataToUpdate ? t('vacanciesTitleUpdate') : t('vacanciesTitleCreate')}
          </FormTitle>
          <CloseBtn data-testid='closeModalBtn' onClick={handleOpenModal}>
            <FontAwesomeIcon icon={faXmark} />
          </CloseBtn>
        </FormHeader>
        <FormErrorMessage error={error} />
        <VacancyForm onSubmit={submitVacancyData}>
          <Input 
            name='title'
            label={t('vacanciesTitle')}
            value={vacancyData.title}
            onChange={handleVacancyDataChange}
            isRequired
          />
          <Select
            name='employment'
            value={vacancyData.employment}
            onChange={handleVacancyDataChange}
          >
            <Option value='full-time'>
              {t('vacanciesFullTime')}
            </Option>
            <Option value='part-time'>
              {t('vacanciesPartTime')}
            </Option>
          </Select>
          <Select
            name='character'
            value={vacancyData.character}
            onChange={handleVacancyDataChange}
          >
            <Option value='office'>
              {t('vacantciesOffice')}
            </Option>
            <Option value='remote'>
              {t('vacanciesRemote')}
            </Option>
            <Option value='remote-office'>
              {t('vacanciesRemoteOffice')}
            </Option>
          </Select>
          <TextArea 
            name='responsibilities'
            label={t('vacanciesResponsibilities')}
            value={vacancyData.responsibilities}
            onChange={handleVacancyDataChange}
            isRequired
          />
          <TextArea 
            name='mustHaves'
            label={t('vacanciesMustHaves')}
            value={vacancyData.mustHaves}
            onChange={handleVacancyDataChange}
            isRequired
          />
          <Input 
            name='experience'
            label={t('vacanciesExperience')}
            value={vacancyData.experience}
            onChange={handleVacancyDataChange}
            isRequired
          />
          <Input 
            name='salary'
            label={t('vacanciesSalary')}
            value={vacancyData.salary}
            onChange={handleVacancyDataChange}
            isRequired
          />
          <Input 
            name='contactPerson'
            label={t('vacanciesContactPerson')}
            value={vacancyData.contactPerson}
            onChange={handleVacancyDataChange}
            isRequired
          />
          <Input 
            name='contactPhone'
            label={t('vacanciesContactPhone')}
            value={vacancyData.contactPhone}
            onChange={handleVacancyDataChange}
            isRequired
          />
          <Input 
            name='contactEmail'
            label={t('vacanciesContactEmail')}
            value={vacancyData.contactEmail}
            onChange={handleVacancyDataChange}
            isRequired
          />
          <Button
            type={ButtonType.Submit}
            color={ButtonColor.Success}
          >
            {t('vacanciesSubmitBtn')}
          </Button>
        </VacancyForm>
      </Modal>
    </>
  );
};

export default CreateVacancyForm;