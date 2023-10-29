import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { v4 as uuid } from 'uuid';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ButtonColor, ButtonType, TableTypes } from '../../../types/types';
import { getProducts, deleteProduct } from '../../features/product/asyncActions';
import { selectPagesCount, selectProducts, selectProductStatus } from '../../features/product/selectors';
import { AppDispatch } from '../../features/store';
import { selectCategories, selectCategoryStatus } from '../../features/category/selectors';
import { getCategories, deleteCategory } from '../../features/category/asyncActions';
import { clearCategory, getCategory } from '../../features/category/reducers';
import {clearProduct, setProductToUpdate } from '../../features/product/reducers';
import { selectUser } from '../../features/user/selectors';
import { selectShippings, selectShippingStatus } from '../../features/shipping/selectors';
import { deleteShipping, getShippings } from '../../features/shipping/asyncActions';
import { getShipping } from '../../features/shipping/reducers';
import { ProductTable, Table, VacanciesTable } from '../table';
import { selectVacancies, selectVacancyPagesCount, selectVacancyStatus } from '../../features/vacancies/selectors';
import { deleteVacancy, getVacancies } from '../../features/vacancies/asyncActions';
import { setVacancyToUpdate } from '../../features/vacancies/reducers';
import { PRODUCTS_PER_TABLE, VACANCIES_PER_TABLE } from '../../services/constants';
import { AddGalleryImageModal, CreateVacancyModal, CreateShippingForm, CreateProductForm, CreateCategoryForm } from '../modals';
import { selectGalleryImages, selectGalleryStatus } from '../../features/gallery/selectors';
import { deleteGalleryImage, getGalleryImages } from '../../features/gallery/asyncActions';
import { Loader, Pagination, RoundedButton } from '../ui';


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
    my-6
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

const GalleryImagesList = styled.ul`
  ${tw`
    mt-6
    w-full
    flex
    flex-col
    md:flex-row
    flex-wrap
  `}
`;

const GalleryImageItem = styled.li`
  ${tw`
    p-3
    relative
    w-full
    md:w-1/3
  `}
  button {
    ${tw`
      absolute
      top-3
      right-3
    `}
  }
`;


const Editor: React.FC = () => {
  const { t } = useTranslation(['settingTabsEditor']);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectProducts);
  const productsLoadingStatus = useSelector(selectProductStatus);
  const productsPageCount = useSelector(selectPagesCount);
  const categories = useSelector(selectCategories);
  const categoriesLoadingStatus = useSelector(selectCategoryStatus);
  const shippings = useSelector(selectShippings);
  const shippingLoadingStatus = useSelector(selectShippingStatus);
  const user = useSelector(selectUser);
  const vacancies = useSelector(selectVacancies);
  const vacanciesLoadingStatus = useSelector(selectVacancyStatus);
  const vacanciesPageCount = useSelector(selectVacancyPagesCount);
  const galleryImages = useSelector(selectGalleryImages);
  const galleryLoadingStatus = useSelector(selectGalleryStatus);

  const [productsPage, setProductsPage] = useState(1);
  const [vacanciesPage, setVacanciesPage] = useState(1);

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

  const handleGalleryImageDelete = (id: string) => {
    dispatch(deleteGalleryImage(id));
  };

  useEffect(() => {
    dispatch(getProducts({ page: productsPage, productsPerPage: PRODUCTS_PER_TABLE }));
  }, [dispatch, productsPage]);

  useEffect(() => {
    dispatch(getVacancies({ page: vacanciesPage, itemsPerPage: VACANCIES_PER_TABLE }))
  }, [dispatch, vacanciesPage]);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getShippings());
    dispatch(getGalleryImages());
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
          status={productsLoadingStatus}
          onEdit={handleProductEdit}
          onDelete={handleProductDelete}
        />
        <Pagination 
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
          status={categoriesLoadingStatus}
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
          status={shippingLoadingStatus}
          onEdit={handleShippingEdit} 
          onDelete={handleShippingDelete} 
        />
      </Section>
      <Section>
        <SectionHeader>
          <SubTitle>{t('vacancies')}</SubTitle>
          <CreateVacancyModal />
        </SectionHeader>
        <VacanciesTable 
          vacancies={vacancies}
          status={vacanciesLoadingStatus}
          onEdit={handleVacancyEdit}
          onDelete={handleVacancyDelete}
        />
        <Pagination 
          pageCount={vacanciesPageCount}
          setPage={setVacanciesPage}
        />
      </Section>
      <Section>
        <SectionHeader>
          <SubTitle>{t('gallery')}</SubTitle>
          <AddGalleryImageModal />
        </SectionHeader>
        {
          galleryLoadingStatus === 'succeeded' ? (
            <GalleryImagesList>
              {galleryImages.map(image => (
                <GalleryImageItem key={uuid()}>
                  <img src={image.url} alt={image._id} />
                  <RoundedButton
                    type={ButtonType.Button}
                    color={ButtonColor.Danger}
                    onClick={() => handleGalleryImageDelete(image._id!)}
                  >
                    <FontAwesomeIcon 
                      data-testid='deleteGalleryImageBtn' 
                      icon={faTrash} 
                    />
                  </RoundedButton>
                </GalleryImageItem>
              ))}
            </GalleryImagesList>
          ) : (
            <Loader />
          )
        }
      </Section>
    </Container>
  );
};

export default Editor;