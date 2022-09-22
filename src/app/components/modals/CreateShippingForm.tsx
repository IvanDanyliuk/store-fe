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
import { selectShipping } from '../../features/shipping/selectors';
import { createShipping, updateShipping } from '../../features/shipping/asyncActions';
import { clearShipping } from '../../features/shipping/reducers';


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

const InputLabel = styled.label`
  ${tw`
    mb-1
    text-gray-500
    font-semibold
  `}
`;

const Input = styled.input`
  ${tw`
    p-2
    w-full
    border
    rounded
    mb-3
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


const CreateShippingForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const dataToUpdate = useSelector(selectShipping);
  
  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });
  const [isOpen, setIsOpen] = useState(false);

  const [shippingData, setShippingData] = useState({
    company: '',
    country: '',
    price: 0,
  });

  const [city, setCity] = useState('');

  const [cities, setCities] = useState<any>([]);

  const handleOpenModal = () => {
    setIsOpen(!isOpen);
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
      setCities([...cities, city]);
    }
    setCity('');
  };

  const handleDeleteCity = (name: any) => {
    setCities(
      cities.filter((item: any) => item !== name)
    );
  };

  const handleShippingDataSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if(dataToUpdate) {
      dispatch(updateShipping({ 
        id: dataToUpdate._id, 
        updatedShipping: { 
          ...shippingData,
          cities 
        }, 
      }));
      dispatch(clearShipping());
    } else {
      dispatch(createShipping({
        ...shippingData,
        cities
      }));
    }

    setShippingData({
      company: '',
      country: '',
      price: 0,
    });
    setCity('');
    setCities([]);
    setIsOpen(false);
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
        price: dataToUpdate.price
      });
      setCities(dataToUpdate.cities);
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
        <CategoryForm onSubmit={handleShippingDataSubmit}>
          <Inputs>
            <InputLabel>Company</InputLabel>
            <Input
              name='company'
              value={shippingData.company}
              onChange={handleShippingDataChange}
            />
            <InputLabel>Country</InputLabel>
            <Input
              name='country'
              value={shippingData.country}
              onChange={handleShippingDataChange}
            />
          </Inputs>
          <Inputs>
            <InputLabel>City</InputLabel>
            <Input
              name='city'
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
            {cities.length > 0 && (
              <CitiesList>
              {cities.map((city: any) => (
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
            <InputLabel>Price</InputLabel>
            <Input
              name='price'
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