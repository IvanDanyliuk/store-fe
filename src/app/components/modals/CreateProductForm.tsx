import React, { SyntheticEvent, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import Modal from 'react-modal';
import StarRating from 'react-star-rate';
import { useMediaQuery } from 'react-responsive';
import { SCREENS } from '../../services/screens';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faXmark } from '@fortawesome/free-solid-svg-icons';


Modal.setAppElement('#root');

const AddProductBtn = styled.button`
  ${tw`
    pt-3
    pb-3
    pl-8
    pr-8
    md:pt-1
    md:pb-1
    md:pl-4
    md:pr-4
    rounded
    text-sm
    font-bold
    bg-gray-300
  `}
`;

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

const ProductForm = styled.form`
  ${tw`
    flex
    flex-col
    items-center
  `}
`;

const Inputs = styled.fieldset``;

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

const TextArea = styled.textarea`
  ${tw`
    p-2
    w-full
    border
    rounded
    mb-3
  `}
`;

const Select = styled.select`
  ${tw`
  
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


const CreateProductForm: React.FC = () => {
  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });
  const [isOpen, setIsOpen] = useState(false);

  const [productData, setProductData] = useState({
    category: '',
    subCategory: '',
    name: '',
    price: '',
    shortInfo: '',
    description: '',
    color: '',
  });

  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };

  const handleProductDataChange = (e: any) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProductDataSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if(productData.name) {
      console.log(productData);
    }

    setIsOpen(false);
    setProductData({
      category: '',
      subCategory: '',
      name: '',
      price: '',
      shortInfo: '',
      description: '',
      color: '',
    });
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

  return (
    <>
      <AddProductBtn onClick={handleOpenModal}>New product</AddProductBtn>
      <Modal 
        isOpen={isOpen}
        onRequestClose={handleOpenModal}
        style={styles}
      >
        <FormHeader>
          <FormTitle>Create a new product</FormTitle>
          <CloseBtn onClick={handleOpenModal}>
            <FontAwesomeIcon icon={faXmark} />
          </CloseBtn>
        </FormHeader>
        <ProductForm onSubmit={handleProductDataSubmit}>
          <Inputs>
            <InputLabel>Name</InputLabel>
            <Input 
              name='name' 
              value={productData.name} 
              onChange={handleProductDataChange} 
            />
            <InputLabel>Disadvantages</InputLabel>
            <Input 
              name='price' 
              value={productData.price} 
              onChange={handleProductDataChange} 
            />
            <InputLabel>Short Description</InputLabel>
            <TextArea 
              name='shortInfo'
              value={productData.shortInfo} 
              onChange={handleProductDataChange} 
              rows={5}
            />
            <InputLabel>Main Description</InputLabel>
            <TextArea 
              name='shortInfo'
              value={productData.shortInfo} 
              onChange={handleProductDataChange} 
              rows={5}
            />
          </Inputs>
          <SubmitBtn type='submit'>Submit</SubmitBtn>
        </ProductForm>
      </Modal>
    </>
  );
};

export default CreateProductForm;