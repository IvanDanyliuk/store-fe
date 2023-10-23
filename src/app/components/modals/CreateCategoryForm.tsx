import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twin.macro';
import { v4 as uuid } from 'uuid';
import Modal from 'react-modal';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { storage } from '../../../firebase';
import { SCREENS } from '../../services/screens';
import { setCategoryUrl } from '../../helpers/helpers';
import { Button, FormErrorMessage } from '../ui';
import { ButtonColor, ButtonType } from '../../../types/types';
import { AppDispatch } from '../../features/store';
import { selectCategory } from '../../features/category/selectors';
import { createCategory, updateCategory } from '../../features/category/asyncActions';
import { clearCategory } from '../../features/category/reducers';
import { isCategoryDataValid } from '../../helpers/formValidation';
import { Input } from '../inputs';
import { 
  BASIC_BACKGROUND_WHITE, 
  MODAL_OVERLAY_COLOR, 
  SUCCESS_COLOR 
} from '../../services/constants';


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

const SubCategoriesList = styled.ul`
  ${tw`
    my-3
    pt-2
    px-3
    border
  `}
`;

const SubCategoryListItem = styled.li`
  ${tw`
    mb-2
    w-full
    flex
    justify-between
  `}
`;

const SubCategoryTitle = styled.p`
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


const CreateCategoryForm: React.FC = () => {
  const { t } = useTranslation(['modals']);
  const dispatch = useDispatch<AppDispatch>();
  const dataToUpdate = useSelector(selectCategory);
  
  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');
  const [progressPercent, setProgressPercent] = useState(0);

  const [mainCategory, setMainCategory] = useState({
    title: '',
    url: '',
  });

  const [subCategory, setSubCategory] = useState({
    title: '',
    url: '',
    image: '',
  });

  const [subCategories, setSubCategories] = useState<any>([]);

  const setInitialData = () => {
    setMainCategory({
      title: '',
      url: '',
    });
    setSubCategory({
      title: '',
      url: '',
      image: ''
    });
    setSubCategories([]);
  };

  const handleOpenModal = () => {
    if(isOpen && error) {
      setError('');
      setInitialData();
    }
    if(isOpen && dataToUpdate) {
      dispatch(clearCategory());
      setInitialData();
    }
    setIsOpen(!isOpen);
  };

  const handleError = (error: string) => {
    setError(error);
  };

  const handleMainCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMainCategory({
      ...mainCategory,
      title: e.target.value,
      url: setCategoryUrl(e.target.value),
    });
  };

  const handleSubCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSubCategory({
      ...subCategory,
      title: e.target.value,
      url: setCategoryUrl(e.target.value),
    });
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
          setSubCategory({
            ...subCategory,
            image: downloadUrl
          })
        });
      }
    );
  };

  const handleAddSubCategory = (e: SyntheticEvent) => {
    e.preventDefault();
    if(subCategory.title) {
      setSubCategories([...subCategories, subCategory]);
    }
    setSubCategory({
      title: '',
      url: '',
      image: '',
    });
  };

  const handleDeleteSubCategory = (title: string) => {
    setSubCategories(
      subCategories.filter((item: any) => item.title !== title)
    );
  };

  const createNewCategory = () => {
    const isDataValid = isCategoryDataValid({
      main: mainCategory,
      subCategories
    }, handleError);

    if(isDataValid) {
      dispatch(createCategory({
        main: mainCategory,
        subCategories,
      }));
      setInitialData();
      handleOpenModal();
    }
  };

  const updateExistingCategory = () => {
    const isDataValid = isCategoryDataValid({
      main: mainCategory,
      subCategories
    }, handleError);

    if(isDataValid) {
      dispatch(updateCategory({ 
        id: dataToUpdate?._id!, 
        updatedCategory: { 
          main: mainCategory, 
          subCategories, 
        }, 
      }));
      dispatch(clearCategory());
      setInitialData();
    }
  };

  const handleCategoryDataSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if(dataToUpdate) {
      updateExistingCategory();
    } else {
      createNewCategory();
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
      setMainCategory({
        title: dataToUpdate.main.title,
        url: dataToUpdate.main.url,
      });
      setSubCategories(dataToUpdate.subCategories);
    }
  }, [dataToUpdate]);

  return (
    <>
      <Button
        color={ButtonColor.Success}
        type={ButtonType.Button}
        onClick={handleOpenModal}
      >
        {t('categoryBtn')}
      </Button>
      <Modal 
        isOpen={isOpen}
        onRequestClose={handleOpenModal}
        style={styles}
      >
        <FormHeader>
          <FormTitle>
            {dataToUpdate ? t('categoryTitleUpdate') : t('categoryTitleCreate')}
          </FormTitle>
          <CloseBtn onClick={handleOpenModal}>
            <FontAwesomeIcon icon={faXmark} />
          </CloseBtn>
        </FormHeader>
        <FormErrorMessage error={error} />
        <CategoryForm onSubmit={handleCategoryDataSubmit}>
          <Inputs>
            <Input
              name='title'
              label={t('categoryName')}
              value={mainCategory.title}
              onChange={handleMainCategoryChange}
            />
            <Input 
              name='title'
              label={t('categorySubName')}
              value={subCategory.title}
              onChange={handleSubCategoryChange}
            />
            <Input 
              name='image'
              label={t('categoryImage')}
              type='file'
              onChange={handleUploadImage}
            />
            <Button
              color={ButtonColor.Secondary}
              type={ButtonType.Button}
              onClick={handleAddSubCategory}
            >
              {t('categoryCreateSubBtn')}
            </Button>
            {subCategories.length > 0 && (
              <SubCategoriesList>
              {subCategories.map((category: any) => (
                <SubCategoryListItem key={uuid()}>
                  <SubCategoryTitle>{category.title}</SubCategoryTitle>
                  <DeleteBtn 
                    type='button' 
                    onClick={() => handleDeleteSubCategory(category.title)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </DeleteBtn>
                </SubCategoryListItem>
              ))}
              </SubCategoriesList>
            )}
          </Inputs>
          <SubmitBtn type='submit'>Submit</SubmitBtn>
        </CategoryForm>
      </Modal>
    </>
  );
};

export default CreateCategoryForm;