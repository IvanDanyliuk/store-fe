import React, { SyntheticEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twin.macro';
import { v4 as uuid } from 'uuid';
import Modal from 'react-modal';
import { useMediaQuery } from 'react-responsive';
import { SCREENS } from '../../services/screens';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import Button from '../ui/Button';
import { ButtonColor, ButtonType } from '../../../types/types';
import { AppDispatch } from '../../features/store';
import { IShipping } from '../../features/shipping/types';
import { selectShipping } from '../../features/shipping/selectors';
import { createShipping, updateShipping } from '../../features/shipping/asyncActions';
import { clearShipping } from '../../features/shipping/reducers';
import Input from '../inputs/Input';
import { isShippingDataValid } from '../../helpers/formValidation';


Modal.setAppElement('#root');

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
    mt-3
    mb-3
    pt-2
    pl-3
    pr-3
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
  background: rgb(43, 212, 161);
  ${tw`
    mt-3
    p-2
    w-1/2
    rounded
    text-white
    font-bold
  `}
`;

const ErrorMessage = styled.div`
  ${tw`
    pb-2
    text-center
    text-red-500
    text-sm
  `}
`;


const CreateShippingForm: React.FC = () => {
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

  const handleOpenModal = () => {
    if(isOpen && error) {
      setError('');
    }
    setIsOpen(!isOpen);
  };

  const handleError = (error: string) => {
    setError(error);
  };

  const handleShippingDataChange = (e: any) => {
    setShippingData({
      ...shippingData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCityChange = (e: any) => {
    setCity(e.target.value);
  };

  const handleAddCity = (e: any) => {
    e.preventDefault();
    if(city) {
      setShippingData({
        ...shippingData,
        cities: [...shippingData.cities, city]
      });
    }
    setCity('');
  };

  const handleDeleteCity = (name: any) => {
    setShippingData({
      ...shippingData,
      cities: shippingData.cities.filter((item: any) => item !== name)
    });
  };

  const setInitialData = () => {
    setShippingData({
      company: '',
      country: '',
      price: 0,
      cities: [],
    });
    setCity('');
    setIsOpen(false);
  };

  const createNewShippingOption = () => {
    const isDataValid = isShippingDataValid(shippingData, handleError);
    if(isDataValid) {
      dispatch(createShipping(shippingData));
      setInitialData();
    }
  };

  const updateShippingOption = () => {
    const isDataValid = isShippingDataValid(shippingData, handleError);
    if(isDataValid) {
      dispatch(updateShipping({ 
        id: dataToUpdate?._id, 
        updatedShipping: shippingData, 
      }));
      dispatch(clearShipping());
      setInitialData();
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
      background: 'rgb(255, 255, 255',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      background: 'rgba(141, 141, 141, .6',
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
        Add new
      </Button>
      <Modal 
        isOpen={isOpen}
        onRequestClose={handleOpenModal}
        style={styles}
      >
        <FormHeader>
          <FormTitle>Create a new category</FormTitle>
          <CloseBtn onClick={handleOpenModal}>
            <FontAwesomeIcon icon={faXmark} />
          </CloseBtn>
        </FormHeader>
        {error && (
          <ErrorMessage>{error}</ErrorMessage>
        )}
        <CategoryForm onSubmit={submitShippingData}>
          <Inputs>
            <Input 
              name='company'
              label='Company'
              value={shippingData.company}
              onChange={handleShippingDataChange}
              isRequired
            />
            <Input 
              name='country'
              label='Country'
              value={shippingData.country}
              onChange={handleShippingDataChange}
            />
          </Inputs>
          <Inputs>
            <Input 
              name='city'
              label='City'
              value={city}
              onChange={handleCityChange}
            />
            <Button
              color={ButtonColor.Secondary}
              type={ButtonType.Button}
              onClick={handleAddCity}
            >
              New city
            </Button>
            {shippingData.cities.length > 0 && (
              <CitiesList>
              {shippingData.cities.map((city: any) => (
                <City key={uuid()}>
                  <CityName>{city}</CityName>
                  <DeleteBtn 
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
              label='Price'
              value={shippingData.price}
              onChange={handleShippingDataChange}
            />
          </Inputs>
          <SubmitBtn type='submit'>Submit</SubmitBtn>
        </CategoryForm>
      </Modal>
    </>
  );
};

export default CreateShippingForm;