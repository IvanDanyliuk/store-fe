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
import { setCategoryUrl } from '../../helpers/helpers';
import Button from '../ui/Button';
import { ButtonColor, ButtonType } from '../../../types/types';
import { AppDispatch } from '../../features/store';
import { selectCategory } from '../../features/category/selectors';
import { createCategory, updateCategory } from '../../features/category/asyncActions';
import { clearCategory } from '../../features/category/reducers';
import { isCategoryDataValid } from '../../helpers/formValidation';
import FormErrorMessage from '../ui/FormErrorMessage';


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

const SubCategoriesList = styled.ul`
  ${tw`
    mt-3
    mb-3
    pt-2
    pl-3
    pr-3
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


const CreateCategoryForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const dataToUpdate = useSelector(selectCategory);
  
  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');

  const [mainCategory, setMainCategory] = useState({
    title: '',
    url: '',
  });

  const [subCategory, setSubCategory] = useState({
    title: '',
    url: '',
  });

  const [subCategories, setSubCategories] = useState<any>([]);

  const setInitialData = () => {
    setMainCategory({
      title: '',
      url: '',
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

  const handleMainCategoryChange = (e: any) => {
    setMainCategory({
      ...mainCategory,
      title: e.target.value,
      url: setCategoryUrl(e.target.value),
    });
  };

  const handleSubCategoryChange = (e: any) => {
    setSubCategory({
      ...subCategory,
      title: e.target.value,
      url: setCategoryUrl(e.target.value),
    });
  };

  const handleAddSubCategory = (e: any) => {
    e.preventDefault();
    if(subCategory.title && subCategory.url) {
      setSubCategories([...subCategories, subCategory]);
    }
    setSubCategory({
      title: '',
      url: '',
    });
  };

  const handleDeleteSubCategory = (title: any) => {
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
        id: dataToUpdate?._id, 
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
        Add new
      </Button>
      <Modal 
        isOpen={isOpen}
        onRequestClose={handleOpenModal}
        style={styles}
      >
        <FormHeader>
          <FormTitle>
            {dataToUpdate ? 'Update the category' : 'Create a new category'}
          </FormTitle>
          <CloseBtn onClick={handleOpenModal}>
            <FontAwesomeIcon icon={faXmark} />
          </CloseBtn>
        </FormHeader>
        <FormErrorMessage error={error} />
        <CategoryForm onSubmit={handleCategoryDataSubmit}>
          <Inputs>
            <InputLabel>Main Category Name</InputLabel>
            <Input
              name='title'
              value={mainCategory.title}
              onChange={handleMainCategoryChange}
            />
          </Inputs>
          <Inputs>
            <InputLabel>Sub Category Name</InputLabel>
            <Input
              name='title'
              value={subCategory.title}
              onChange={handleSubCategoryChange}
            />
            <Button
              color={ButtonColor.Secondary}
              type={ButtonType.Button}
              onClick={handleAddSubCategory}
            >
              New sub-category
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