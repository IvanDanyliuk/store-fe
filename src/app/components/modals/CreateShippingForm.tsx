import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twin.macro';
import { v4 as uuid } from 'uuid';
import Modal from 'react-modal';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { SCREENS } from '../../services/screens';
import { Button, FormErrorMessage } from '../ui';
import { ButtonColor, ButtonType } from '../../../types/types';
import { AppDispatch } from '../../features/store';
import { IShipping } from '../../features/shipping/types';
import { selectShipping } from '../../features/shipping/selectors';
import { createShipping, updateShipping } from '../../features/shipping/asyncActions';
import { clearShipping } from '../../features/shipping/reducers';
import { Input } from '../inputs';
import { isShippingDataValid } from '../../helpers/formValidation';
import { BASIC_BACKGROUND_WHITE, MODAL_OVERLAY_COLOR, SUCCESS_COLOR } from '../../services/constants';


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

const CategoryForm = styled.form`
  ${tw`
    flex
    flex-col
    items-center
  `}
`;

const Inputs = styled.fieldset`
  ${tw`
    w-full
  `}
`;

const CitiesList = styled.ul`
  ${tw`
    my-3
    pt-2
    px-3
    border
  `}
`;

const City = styled.li`
  ${tw`
    mb-2
    w-full
    flex
    justify-between
  `}
`;

const CityName = styled.p`
  ${tw`
    italic
  `}
`;

const DeleteBtn = styled.button`
  ${tw`
    text-gray-600
  `}
`;

const SubmitBtn = styled.button`
  background: ${SUCCESS_COLOR};
  ${tw`
    mt-3
    p-2
    w-1/2
    rounded
    text-white
    font-bold
  `}
`;


const CreateShippingForm: React.FC = () => {
  const { t } = useTranslation(['modals']);
  const dispatch = useDispatch<AppDispatch>();
  const dataToUpdate = useSelector(selectShipping);
  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');
  const [shippingData, setShippingData] = useState<IShipping>({
    company: '',
    country: '',
    price: 0,
    cities: [],
  });
  const [city, setCity] = useState('');

  const setInitialData = () => {
    setShippingData({
      company: '',
      country: '',
      price: 0,
      cities: [],
    });
    setCity('');
  };

  const handleOpenModal = () => {
    if(isOpen && error) {
      setError('');
    }
    if(isOpen && dataToUpdate) {
      dispatch(clearShipping());
      setInitialData();
    }
    setIsOpen(!isOpen);
  };

  const handleError = (error: string) => {
    setError(error);
  };

  const handleShippingDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShippingData({
      ...shippingData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleAddCity = (e: SyntheticEvent) => {
    e.preventDefault();
    if(city) {
      setShippingData({
        ...shippingData,
        cities: [...shippingData.cities, city]
      });
    }
    setCity('');
  };

  const handleDeleteCity = (name: SyntheticEvent) => {
    setShippingData({
      ...shippingData,
      cities: shippingData.cities.filter((item: any) => item !== name)
    });
  };

  const createNewShippingOption = () => {
    const isDataValid = isShippingDataValid(shippingData, handleError);
    if(isDataValid) {
      dispatch(createShipping(shippingData));
      setInitialData();
      handleOpenModal();
    }
  };

  const updateShippingOption = () => {
    const isDataValid = isShippingDataValid(shippingData, handleError);
    if(isDataValid) {
      dispatch(updateShipping({ 
        id: dataToUpdate?._id!, 
        updatedShipping: shippingData, 
      }));
      dispatch(clearShipping());
      setInitialData();
      handleOpenModal();
    }
  };

  const submitShippingData = (e: SyntheticEvent) => {
    e.preventDefault();
    if(dataToUpdate) {
      updateShippingOption();
    } else {
      createNewShippingOption();
    }
  };

  const styles = {
    content: {
      width: isMobile ? '90%' : '500px',
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
      setShippingData({
        company: dataToUpdate.company,
        country: dataToUpdate.country,
        price: dataToUpdate.price,
        cities: dataToUpdate.cities
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
        {t('shippingBtn')}
      </Button>
      <Modal 
        isOpen={isOpen}
        onRequestClose={handleOpenModal}
        style={styles}
      >
        <FormHeader>
          <FormTitle>
            {dataToUpdate ? t('shippingTitleUpdate') : t('shippingTitleCreate')}
          </FormTitle>
          <CloseBtn data-testid='closeDialogBtn' onClick={handleOpenModal}>
            <FontAwesomeIcon icon={faXmark} />
          </CloseBtn>
        </FormHeader>
        <FormErrorMessage error={error} />
        <CategoryForm onSubmit={submitShippingData}>
          <Inputs>
            <Input 
              name='company'
              label={t('shippingCompany')}
              value={shippingData.company}
              onChange={handleShippingDataChange}
              isRequired
            />
            <Input 
              name='country'
              label={t('shippingCountry')}
              value={shippingData.country}
              onChange={handleShippingDataChange}
            />
          </Inputs>
          <Inputs>
            <Input 
              name='city'
              label={t('shippingCity')}
              value={city}
              onChange={handleCityChange}
            />
            <Button
              color={ButtonColor.Secondary}
              type={ButtonType.Button}
              onClick={handleAddCity}
            >
              {t('shipingAddNewCityBtn')}
            </Button>
            {shippingData.cities.length > 0 && (
              <CitiesList>
              {shippingData.cities.map((city: any) => (
                <City key={uuid()}>
                  <CityName>{city}</CityName>
                  <DeleteBtn 
                    data-testid='deleteCityBtn'
                    type='button' 
                    onClick={() => handleDeleteCity(city)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </DeleteBtn>
                </City>
              ))}
              </CitiesList>
            )}
          </Inputs>
          <Inputs>
            <Input 
              name='price'
              type='number'
              label={t('shippingPrice')}
              value={shippingData.price}
              onChange={handleShippingDataChange}
            />
          </Inputs>
          <SubmitBtn type='submit'>
            {t('shippingSubmitBtn')}
          </SubmitBtn>
        </CategoryForm>
      </Modal>
    </>
  );
};

export default CreateShippingForm;