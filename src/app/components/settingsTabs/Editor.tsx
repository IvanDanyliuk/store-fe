import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useTranslation } from 'react-i18next';
import { TableTypes } from '../../../types/types';
import { getProducts, deleteProduct } from '../../features/product/asyncActions';
import { selectPagesCount, selectProducts } from '../../features/product/selectors';
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
import ProductTable from '../table/ProductTable';
import PageListPagination from '../ui/PageListPagination';
import CreateVacancyForm from '../modals/CreateVacancyModal';
import { selectVacancies, selectVacancyPagesCount } from '../../features/vacancies/selectors';
import VacanciesTable from '../table/VacanciesTable';
import { deleteVacancy, getVacancies, updateVacancy } from '../../features/vacancies/asyncActions';
import { setVacancyToUpdate } from '../../features/vacancies/reducers';


const Container = styled.div`
  ${tw`
    w-full
    flex
    flex-col
  `}
`;

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
  const { t } = useTranslation(['settingTabsEditor']);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectProducts);
  const productsPageCount = useSelector(selectPagesCount);
  const categories = useSelector(selectCategories);
  const shippings = useSelector(selectShippings);
  const user = useSelector(selectUser);
  const vacancies = useSelector(selectVacancies);
  const vacanciesPageCount = useSelector(selectVacancyPagesCount);

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

  const handleVacancyEdit = (id: string) => {
    dispatch(setVacancyToUpdate(id));
  };

  const handleVacancyDelete = (id: string) => {
    dispatch(deleteVacancy(id));
  };

  const [productsPage, setProductsPage] = useState(1);
  const [vacanciesPage, setVacanciesPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    dispatch(getProducts({ page: productsPage, productsPerPage }));
  }, [dispatch, productsPage]);

  useEffect(() => {
    dispatch(getVacancies({ page: vacanciesPage, itemsPerPage: productsPerPage }))
  }, [dispatch, vacanciesPage]);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getShippings());
    return () => { 
      dispatch(clearProduct());
      dispatch(clearCategory());
    };
  }, [dispatch]);

  return (
    <Container>
      <Section>
        <SectionHeader>
          <SubTitle>{t('products')}</SubTitle>
          <CreateProductForm />
        </SectionHeader>
        <ProductTable 
          products={products} 
          onEdit={handleProductEdit}
          onDelete={handleProductDelete}
        />
        <PageListPagination 
          currentPage={productsPage}
          pageCount={productsPageCount}
          setPage={setProductsPage}
        />
      </Section>
      <Section>
        <SectionHeader>
          <SubTitle>{t('categories')}</SubTitle>
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
          <SubTitle>{t('shipping')}</SubTitle>
          <CreateShippingForm />
        </SectionHeader>
        <Table 
          tableType={TableTypes.Shipping} 
          data={shippings} 
          onEdit={handleShippingEdit} 
          onDelete={handleShippingDelete} 
        />
      </Section>
      <Section>
        <SectionHeader>
          <SubTitle>{t('vacancies')}</SubTitle>
          <CreateVacancyForm />
        </SectionHeader>
        <VacanciesTable 
          vacancies={vacancies}
          onEdit={handleVacancyEdit}
          onDelete={handleVacancyDelete}
        />
        <PageListPagination 
          currentPage={vacanciesPage}
          pageCount={vacanciesPageCount}
          setPage={setVacanciesPage}
        />
      </Section>
    </Container>
  );
};

export default Editor;