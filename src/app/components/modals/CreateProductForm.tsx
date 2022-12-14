import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../../firebase';
import { v4 as uuid } from 'uuid';
import Modal from 'react-modal';
import { HexColorPicker } from 'react-colorful';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';
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
import FormErrorMessage from '../ui/FormErrorMessage';
import { IProductData } from '../../features/product/types';
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

const ProductForm = styled.form`
  ${tw`
    flex
    flex-col
    md:flex-row
    flex-wrap
    md:justify-center
  `}
  button {
    margin-top: 10px;
  }
`;

const Inputs = styled.div`
  ${tw`
    w-full
    md:w-2/3
    flex
    flex-wrap
  `}
`;

const Promotions = styled.div`
  ${tw`
    pl-2
    pr-2
    w-full
    md:w-1/3
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

const PromotionInputContainer = styled.div`
  ${tw`
    w-full
    flex
    justify-between
    items-center
  `}
  input {
    width: 80%;
  }
`;

const PromotionList = styled.ul`
  ${tw`
    mt-3
    mb-3
    pt-2
    pl-3
    pr-3
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


const CreateProductForm: React.FC = () => {
  const { t } = useTranslation(['modals']);
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(selectCategories);
  const dataToUpdate = useSelector(selectProduct);

  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');
  const [productColor, setProductColor] = useState('#ffffff');

  const [productData, setProductData] = useState<IProductData>({
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
    brand: '',
    price: 0,
    color: '#ffffff',
    rating: 0,
    image: '',
    promotion: [],
    isInStock: true,
    shortInfo: '',
    description: '',
  });

  const [currentCategory, setCurrentCategory] = useState({
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
  
  const setInitialData = () => {
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
      brand: '',
      price: 0,
      color: '#ffffff',
      rating: 0,
      image: '',
      promotion: [],
      isInStock: true,
      shortInfo: '',
      description: '',
    });
    setProductColor('#ffffff');
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

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target?.files?.[0];
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

  const handleProductDataChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setProductData({
      ...productData,
      color: productColor,
      [e.target.name]: e.target.value,
    });
  };

  const handleMainCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
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

  const handleSubCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
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

  const handleStockChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProductData({
      ...productData,
      isInStock: !productData.isInStock
    });
  };

  const handlePromotionsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPromotion(e.target.value);
  };

  const handleAddPromotion = () => {
    setProductData({
      ...productData,
      promotion: [...productData.promotion, newPromotion],
    })
    setNewPromotion('');
  };

  const handlePromotionDelete = (title: string) => {
    setProductData({
      ...productData,
      promotion: productData.promotion.filter((item: string) => item !== title)
    })
  };

  const createNewProduct = () => {
    const isDataValid = isProductDataValid(productData, handleError);
    if(isDataValid) {
      dispatch(createProduct(productData));
      setInitialData();
      setIsOpen(false);
    }
  };

  const updateExistingProduct = async () => {
    const isDataValid = isProductDataValid(productData, handleError);
    if(isDataValid) {
      await dispatch(updateProduct({
        id: dataToUpdate?._id!,
        updatedProduct: {
          _id: dataToUpdate?._id!,
          ...productData,
        },
      }));
      setInitialData();
      dispatch(clearProduct());
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
      width: isMobile ? '90%' : '70%',
      height: isMobile ? '100%' : 'auto',
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
        brand: '',
        price: 0,
        color: '',
        rating: 0,
        image: '',
        promotion: [],
        isInStock: true,
        shortInfo: '',
        description: '',
      });
    }
  }, [categories]);

  useEffect(() => {
    if(dataToUpdate) {
      setIsOpen(!isOpen);
      setProductData(dataToUpdate);
    }
  }, [dataToUpdate]);

  return (
    <>
      <Button
        color={ButtonColor.Success}
        type={ButtonType.Button}
        onClick={handleOpenModal}
      >
        {t('productBtn')}
      </Button>
      <Modal 
        isOpen={isOpen}
        onRequestClose={handleOpenModal}
        style={styles}
      >
        <FormHeader>
          <FormTitle>
            {dataToUpdate ? t('productTitleUpdate') : t('productTitleCreate')}
          </FormTitle>
          <CloseBtn onClick={handleOpenModal}>
            <FontAwesomeIcon icon={faXmark} />
          </CloseBtn>
        </FormHeader>
        <FormErrorMessage error={error} />
        <ProductForm onSubmit={handleProductDataSubmit}>
          <Inputs>
            <FormItem>
              <InputLabel>
                {t('productCategory')}
              </InputLabel>
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
              <InputLabel>
                {t('productSubCategory')}
              </InputLabel>
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
                label={t('productTitle')}
                value={productData.title}
                onChange={handleProductDataChange}
                isRequired
              />
            </FormItem>
            <FormItem>
              <Input 
                name='brand'
                label={t('productBrand')}
                value={productData.brand}
                onChange={handleProductDataChange}
                isRequired
              />
            </FormItem>
            <FormItem>
              <Input 
                name='price'
                label={t('productPrice')}
                value={productData.price}
                type='number'
                onChange={handleProductDataChange}
                isRequired
              />
              <InputLabel>
                {t('productRating')}
              </InputLabel>
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
              <Input 
                name='image'
                label={t('productImage')}
                type='file'
                onChange={handleUploadImage}
              />
            </FormItem>
            <FormItem>
              <InputLabel>Color</InputLabel>
              <HexColorPicker color={productColor} onChange={setProductColor} />
            </FormItem>
            <FormItem>
              <TextArea 
                name='shortInfo'
                label={t('productShortInfo')}
                value={productData.shortInfo}
                onChange={handleProductDataChange}
                rows={2}
              />
            </FormItem>
            <FormItem>
              <TextArea 
                name='description'
                label={t('productDescription')}
                value={productData.description}
                onChange={handleProductDataChange}
                rows={2}
              />
            </FormItem>
            <FormItem>
              <Checkbox 
                name='isInStock'
                label={t('promotionInStock')}
                checked={productData.isInStock}
                onChange={handleStockChange}
              />
            </FormItem>
          </Inputs>
          <Promotions>
              <PromotionInputContainer>
                <Input 
                  name='promotion'
                  label={t('productPromotion')}
                  value={newPromotion}
                  onChange={handlePromotionsChange}
                />
                <Button 
                  type={ButtonType.Button} 
                  color={ButtonColor.Secondary} 
                  onClick={handleAddPromotion}
                >
                  {t('productAddPromotionBtn')}
                </Button>
              </PromotionInputContainer>
              <PromotionList>
                {
                  productData.promotion.length > 0 ? productData.promotion.map((item: string) => (
                    <PromotionItem key={uuid()}>
                      <PromotionText>{item}</PromotionText>
                      <DeletePromotionBtn data-testid='deletePromotionBtn' onClick={() => handlePromotionDelete(item)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </DeletePromotionBtn>
                    </PromotionItem>
                  )) : (
                    <PromotionMessage>
                      {t('productNoPromotionText')}
                    </PromotionMessage>
                  )
                }
              </PromotionList>
            </Promotions>
          <Button 
            type={ButtonType.Submit} 
            color={ButtonColor.Success}
          >
            {t('productSubmitBtn')}
          </Button>
        </ProductForm>
      </Modal>
    </>
  );
};

export default CreateProductForm;