import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';
import { ButtonColor, ButtonType, TableTypes } from '../../../types/types';
import { getProducts, deleteProduct } from '../../features/product/asyncActions';
import { selectProducts } from '../../features/product/selectors';
import { AppDispatch } from '../../features/store';
import Table from '../table/Table';
import Button from '../ui/Button';
import CreateCategoryForm from '../modals/CreateCategoryForm';
import { selectCategories, selectCategory } from '../../features/category/selectors';
import { getCategories, deleteCategory } from '../../features/category/asyncActions';
import { getCategory } from '../../features/category/reducers';
import CreateProductForm from '../modals/CreateProductForm';


const Section = styled.section`
  ${tw`
    relative
    w-full
    mt-6
    mb-6
  `}
`;

const SectionHeader = styled.div`
  ${tw`
    flex
    justify-between
    items-center
  `}
`;

const SubTitle = styled.h6`
  ${tw`
    text-lg
    font-semibold
  `}
`;


const Editor: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectProducts);
  const categories = useSelector(selectCategories);


  const handleProductEdit = (id: string) => {
    console.log(`Product with id: ${id} has been edited.`);
  };

  const handleProductDelete = (id: string) => {
    dispatch(deleteProduct(id));
  };

  const handleCategoryEdit = (id: string) => {
    dispatch(getCategory(id));
  };

  const handleCategoryDelete = (id: string) => {
    dispatch(deleteCategory(id));
  };

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <>
      <Section>
        <SectionHeader>
          <SubTitle>Products</SubTitle>
          <CreateProductForm />
        </SectionHeader>
        <Table 
          tableType={TableTypes.Products} 
          data={products} 
          onEdit={handleProductEdit} 
          onDelete={handleProductDelete} 
        />
      </Section>
      <Section>
        <SectionHeader>
          <SubTitle>Categories</SubTitle>
          <CreateCategoryForm />
        </SectionHeader>
        <Table 
          tableType={TableTypes.Categories} 
          data={categories} 
          onEdit={handleCategoryEdit} 
          onDelete={handleCategoryDelete} 
        />
      </Section>
    </>
  );
};

export default Editor;