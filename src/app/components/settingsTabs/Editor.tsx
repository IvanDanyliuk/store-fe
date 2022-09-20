import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';
import { TableTypes } from '../../../types/types';
import { getProducts, deleteProduct } from '../../features/product/asyncActions';
import { selectProducts } from '../../features/product/selectors';
import { AppDispatch } from '../../features/store';
import Table from '../table/Table';
import CreateCategoryForm from '../modals/CreateCategoryForm';
import { selectCategories } from '../../features/category/selectors';
import { getCategories, deleteCategory } from '../../features/category/asyncActions';
import { clearCategory, getCategory } from '../../features/category/reducers';
import CreateProductForm from '../modals/CreateProductForm';
import {clearProduct, setProductToUpdate } from '../../features/product/reducers';
import { selectUser } from '../../features/user/selectors';
import { useNavigate } from 'react-router-dom';
import { selectShippings } from '../../features/shipping/selectors';
import { deleteShipping, getShippings } from '../../features/shipping/asyncActions';
import CreateShippingForm from '../modals/CreateShippingForm';
import { getShipping } from '../../features/shipping/reducers';


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
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectProducts);
  const categories = useSelector(selectCategories);
  const shippings = useSelector(selectShippings);
  const user = useSelector(selectUser);

  if(!user!.isAdmin) {
    navigate('/settings/orders');
  }

  const handleProductEdit = (id: string) => {
    dispatch(setProductToUpdate(id));
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

  const handleShippingEdit = (id: string) => {
    dispatch(getShipping(id));
  };

  const handleShippingDelete = (id: string) => {
    dispatch(deleteShipping(id));
  };

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getShippings());
    return () => { 
      dispatch(clearProduct());
      dispatch(clearCategory());
    };
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
      <Section>
        <SectionHeader>
          <SubTitle>Shipping</SubTitle>
          <CreateShippingForm />
        </SectionHeader>
        <Table 
          tableType={TableTypes.Shipping} 
          data={shippings} 
          onEdit={handleShippingEdit} 
          onDelete={handleShippingDelete} 
        />
      </Section>
    </>
  );
};

export default Editor;