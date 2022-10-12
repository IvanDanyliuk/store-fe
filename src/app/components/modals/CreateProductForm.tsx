import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../../firebase';
import { v4 as uuid } from 'uuid';
import Modal from 'react-modal';
import { useMediaQuery } from 'react-responsive';
import { SCREENS } from '../../services/screens';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { selectCategories } from '../../features/category/selectors';
import Button from '../ui/Button';
import { ButtonColor, ButtonType } from '../../../types/types';
import { AppDispatch } from '../../features/store';
import { createProduct, updateProduct } from '../../features/product/asyncActions';
import { selectProduct } from '../../features/product/selectors';
import { isProductDataValid } from '../../helpers/formValidation';
import Input from '../inputs/Input';
import Checkbox from '../inputs/Checkbox';
import TextArea from '../inputs/TextArea';
import { clearProduct } from '../../features/product/reducers';


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

const ProductForm = styled.form`
  ${tw`
    flex
    flex-col
    items-center
  `}
`;

const Inputs = styled.div`
  ${tw`
    flex
    flex-wrap
  `}
`;

const FormItem = styled.fieldset`
  ${tw`
    pl-2
    pr-2
    w-full
    md:w-1/2
    flex
    flex-col
  `}
`;

const PromotionContainer = styled.fieldset`
  ${tw`
    relative
    w-full
    flex
    flex-col
  `}
`;

const PromotionInputContainer = styled.div`
  ${tw`
    w-full
    flex
    justify-between
    items-center
  `}
`;

const PromotionList = styled.ul`
  ${tw`
    mt-3
    mb-3
    pt-2
    pl-3
    pr-3
    border
  `}
`;

const PromotionItem = styled.li`
  ${tw`
    mb-2
    w-full
    flex
    justify-between
  `}
`;

const PromotionText = styled.p`
  ${tw`
    italic
  `}
`;

const DeletePromotionBtn = styled.button`
  ${tw`
    text-gray-600
  `}
`;

const PromotionMessage = styled.p``;

const InputLabel = styled.label`
  ${tw`
    mb-1
    text-gray-500
    font-semibold
  `}
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

const ErrorMessage = styled.div`
  ${tw`
    pb-2
    text-center
    text-red-500
    text-sm
  `}
`;


const CreateProductForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(selectCategories);
  const dataToUpdate = useSelector(selectProduct);

  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');

  const [productData, setProductData] = useState({
    category: {
      main: {
        title: '',
        url: '',
      },
      subCategory: {
        title: '',
        url: '',
      },
    },
    title: '',
    price: 0,
    color: '',
    rating: 0,
    image: '',
    promotion: [],
    isInStock: true,
    shortInfo: '',
    description: '',
    reviews: [],
  });

  const [currentCategory, setCurrentCategory] = useState({
    // _id: '',
    main: {
      title: '',
      url: '',
    },
    subCategories: [{
      title: '',
      url: '',
    }],
  });

  const [progressPercent, setProgressPercent] = useState(0);

  const [newPromotion, setNewPromotion] = useState('');
  const [promotions, setPromotions] = useState<string[]>([]);

  const setInitialData = () => {
    setCurrentCategory(categories[0]);
    setPromotions([]);
    setProductData({
      category: {
        main: {
          title: categories[0].main.title,
          url: categories[0].main.url,
        },
        subCategory: {
          title: categories[0].subCategories[0].title,
          url: categories[0].subCategories[0].url,
        },
      },
      title: '',
      price: 0,
      color: '',
      rating: 0,
      image: '',
      promotion: [],
      isInStock: true,
      shortInfo: '',
      description: '',
      reviews: [],
    });
    setIsOpen(false);
  };

  const handleOpenModal = () => {
    if(isOpen && error) {
      setError('');
    }
    if(isOpen && dataToUpdate) {
      dispatch(clearProduct());
      setInitialData();
    }
    setIsOpen(!isOpen);
  };

  const handleError = (error: string) => {
    setError(error);
  };

  const handleUploadImage = (e: any) => {
    e.preventDefault();

    const file = e.target?.files[0];
    if(!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadData = uploadBytesResumable(storageRef, file);

    uploadData.on('state_changed', 
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgressPercent(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadData.snapshot.ref).then((downloadUrl) => {
          setProductData({
            ...productData,
            image: downloadUrl
          });
        });
      }
    );
  };

  const handleProductDataChange = (e: any) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleMainCategoryChange = (e: any) => {
    const current = categories.find(item => item.main.url === e.target.value)
    setCurrentCategory(current!);
    setProductData({
      ...productData,
      category: {
        main: {
          title: current?.main.title!,
          url: current?.main.url!,
        },
        subCategory: {
          title: current?.subCategories[0].title!,
          url: current?.subCategories[0].url!,
        },
      }
    });
  };

  const handleSubCategoryChange = (e: any) => {
    const current = currentCategory.subCategories.find(item => item.url === e.target.value);
    setProductData({
      ...productData,
      category: {
        main: currentCategory.main,
        subCategory: {
          title: current?.title!,
          url: current?.url!,
        },
      }
    });
  };

  const handleStockChange = (e: any) => {
    setProductData({
      ...productData,
      isInStock: !productData.isInStock
    });
  };

  const handlePromotionsChange = (e: any) => {
    setNewPromotion(e.target.value);
  };

  const handleAddPromotion = (e: any) => {
    setPromotions([...promotions, newPromotion]);
    setNewPromotion('');
  };

  const handlePromotionDelete = (title: string) => {
    setPromotions(promotions.filter(item => item !== title));
  };

  const createNewProduct = () => {
    const isDataValid = isProductDataValid(productData, handleError);
    console.log('Create a New Product', isDataValid)
    if(isDataValid) {
      console.log('New Product data', {...productData, promotion: promotions})
      dispatch(createProduct({...productData, promotion: promotions}));
      setInitialData();
    }
  };

  const updateExistingProduct = () => {
    const isDataValid = isProductDataValid(productData, handleError);
    if(isDataValid) {
      dispatch(updateProduct({
        id: dataToUpdate?._id!,
        updatedProduct: {
          _id: dataToUpdate?._id!,
          ...productData,
        },
      }));
      dispatch(clearProduct());
      setInitialData();
    }
  };

  const handleProductDataSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if(dataToUpdate) {
      updateExistingProduct();
    } else {
      createNewProduct();
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
      background: 'rgb(255, 255, 255',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      background: 'rgba(141, 141, 141, .6',
    }
  };

  useEffect(() => {
    if(categories.length > 0) {
      setCurrentCategory(categories[0]);
      setProductData({
        category: {
          main: {
            title: categories[0].main.title,
            url: categories[0].main.url,
          },
          subCategory: {
            title: categories[0].subCategories[0].title,
            url: categories[0].subCategories[0].url,
          },
        },
        title: '',
        price: 0,
        color: '',
        rating: 0,
        image: '',
        promotion: [],
        isInStock: true,
        shortInfo: '',
        description: '',
        reviews: [],
      });
    }
  }, [categories]);

  useEffect(() => {
    if(dataToUpdate) {
      setIsOpen(!isOpen);
      setProductData(dataToUpdate)
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
          <FormTitle>
            {dataToUpdate ? 'Update the product' : 'Create a new product'}
          </FormTitle>
          <CloseBtn onClick={handleOpenModal}>
            <FontAwesomeIcon icon={faXmark} />
          </CloseBtn>
        </FormHeader>
        {error && (
          <ErrorMessage>{error}</ErrorMessage>
        )}
        <ProductForm onSubmit={handleProductDataSubmit}>
          <Inputs>
            <FormItem>
              <InputLabel>Category</InputLabel>
              <Select 
                value={currentCategory.main.url}
                onChange={handleMainCategoryChange}
              >
                {
                  categories.map(category => (
                    <Option 
                      key={uuid()} 
                      value={category.main.url}
                    >
                      {category.main.title}
                    </Option>
                  ))
                }
              </Select>
            </FormItem>
            <FormItem>
              <InputLabel>Sub-category</InputLabel>
              <Select
                value={productData.category.subCategory.url}
                onChange={handleSubCategoryChange}
              >
                {
                  currentCategory.subCategories && currentCategory.subCategories.map(category => (
                    <Option 
                      key={uuid()} 
                      value={category.url}
                    >
                      {category.title}
                    </Option>
                  ))
                }
              </Select>
            </FormItem>
            <FormItem>
              <Input 
                name='title'
                label='Title'
                value={productData.title}
                onChange={handleProductDataChange}
                isRequired
              />
            </FormItem>
            <FormItem>
              <Input 
                name='price'
                label='Price'
                value={productData.price}
                type='number'
                onChange={handleProductDataChange}
                isRequired
              />
            </FormItem>
            <FormItem>
              <Input 
                name='color'
                label='Color'
                value={productData.color}
                onChange={handleProductDataChange}
                isRequired
              />
            </FormItem>
            <FormItem>
              <Input 
                name='image'
                label='Image'
                type='file'
                onChange={handleUploadImage}
              />
            </FormItem>
            <FormItem>
              <Checkbox 
                name='isInStock'
                label='In Stock'
                checked={productData.isInStock}
                onChange={handleStockChange}
              />
            </FormItem>
            <FormItem>
              <InputLabel>Rating</InputLabel>
              <Select
                name='rating'
                value={productData.rating}
                onChange={handleProductDataChange}
              >
                <Option value='0'>0</Option>
                <Option value='1'>1</Option>
                <Option value='2'>2</Option>
                <Option value='3'>3</Option>
                <Option value='4'>4</Option>
                <Option value='5'>5</Option>
              </Select>
            </FormItem>
            <FormItem>
              <TextArea 
                name='shortInfo'
                label='Short Information'
                value={productData.shortInfo}
                onChange={handleProductDataChange}
                rows={2}
              />
            </FormItem>
            <FormItem>
              <TextArea 
                name='description'
                label='Description'
                value={productData.description}
                onChange={handleProductDataChange}
                rows={2}
              />
            </FormItem>
            <PromotionContainer>
              <PromotionInputContainer>
                <FormItem>
                  <Input 
                    name='promotion'
                    label='Promotion'
                    value={newPromotion}
                    onChange={handlePromotionsChange}
                  />
                </FormItem>
                <Button 
                  type={ButtonType.Button} 
                  color={ButtonColor.Secondary} 
                  onClick={handleAddPromotion}
                >
                  Add
                </Button>
              </PromotionInputContainer>
              <PromotionList>
                {
                  promotions.length > 0 ? promotions.map(item => (
                    <PromotionItem key={uuid()}>
                      <PromotionText>{item}</PromotionText>
                      <DeletePromotionBtn onClick={() => handlePromotionDelete(item)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </DeletePromotionBtn>
                    </PromotionItem>
                  )) : (
                    <PromotionMessage>There are no promotions yet</PromotionMessage>
                  )
                }
              </PromotionList>
            </PromotionContainer>
          </Inputs>
          <Button 
            type={ButtonType.Submit} 
            color={ButtonColor.Success}
          >
            Submit
          </Button>
        </ProductForm>
      </Modal>
    </>
  );
};

export default CreateProductForm;