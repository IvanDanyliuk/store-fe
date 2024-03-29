import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { v4 as uuid } from 'uuid';
import { useTranslation } from 'react-i18next';
import { ButtonColor, ButtonType } from '../../types/types';
import { ProductList } from '../components/products';
import { Button, Loader, Pagination } from '../components/ui';
import { getBrands, getProducts } from '../features/product/asyncActions';
import { selectBrands, selectPagesCount, selectProducts, selectProductStatus } from '../features/product/selectors';
import { AppDispatch } from '../features/store';
import { PRODUCTS_PER_PAGE } from '../services/constants';


const Container = styled.div`
  ${tw`
    p-2
    w-full
    flex
    flex-col
    md:flex-row
    justify-between
  `}
`;

const Content = styled.div`
  ${tw`
    w-full
  `}
`;

const FiltersContainer = styled.div`
  ${tw`
    w-full
    md:w-1/6
  `}
  button {
    margin-right: 20px;
    margin-bottom: 20px;
  }
`;

const FilterGroup = styled.div`
  ${tw`
    mb-3
  `}
`;

const FilterGroupLabel = styled.div`
  ${tw`
    mb-1
    text-base
    font-semibold
  `}
`;

const BrandItem = styled.li`
  ${tw`
    flex
    items-center
  `}
`;

const Checkbox = styled.input`
  ${tw`
    mr-2
    h-5
  `}
`;

const PriceFilters = styled.div`
  ${tw`
    w-full
    flex
  `}
`;

const PriceField = styled.input`
  ${tw`
    mr-2
    p-1
    w-1/2
    border
    rounded
  `}
`;


const Products: React.FC = () => {
  const { t } = useTranslation(['filters']);
  const { category } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const [page, setPage] = useState(1);
  const [checkedBrandIds, setCheckedBrandIds] = useState<boolean[]>([]);
  const [priceData, setPriceData] = useState({
    minPrice: 0,
    maxPrice: 0,
  });
  const productsPerPage = PRODUCTS_PER_PAGE;

  const products = useSelector(selectProducts);
  const brands = useSelector(selectBrands);
  const pageCount = useSelector(selectPagesCount)
  const status = useSelector(selectProductStatus);

  const handleCheckingBrandChange = (position: number) => {
    const updatedCheckedBrandIds = checkedBrandIds
      .map((check: boolean, i) => i === position ? !check : check);
    setCheckedBrandIds(updatedCheckedBrandIds);
  };

  const handlePriceDataChange = (e: any) => {
    setPriceData({
      ...priceData,
      [e.target.name]: e.target.value,
    });
  };

  const clearFilters = () => {
    const isSomeBrandChecked = checkedBrandIds.some(brand => brand === true);
    if(priceData.minPrice > 0 || priceData.maxPrice > 0 || isSomeBrandChecked) {
      setCheckedBrandIds(checkedBrandIds.map(item => item === true && false));
      setPriceData({
        minPrice: 0, 
        maxPrice: 0
      });
      dispatch(getProducts({
        page: 1,
        productsPerPage, 
        filterData: {
          category
        }
      }));
    }
  };

  const handleFilterDataSubmit = () => {
    const isSomeBrandChecked = checkedBrandIds.some(brand => brand === true);
    if(priceData.minPrice > 0 || priceData.maxPrice > 0 || isSomeBrandChecked) {
      const selectedBrands = brands.filter((brand: string, i) => checkedBrandIds[i] && brand);
      dispatch(getProducts({ 
        page: 1, 
        productsPerPage,
        filterData: {
          ...priceData,
          category,
          brands: selectedBrands,
        } 
      }));
    }
  };

  useEffect(() => {
    if(category) {
      dispatch(getBrands(category));
    }
  }, [dispatch, category]);

  useEffect(() => {
    if(brands.length > 0) {
      setCheckedBrandIds(new Array(brands.length).fill(false));
    }
  }, [brands]);

  useEffect(() => {
    dispatch(getProducts({ page, productsPerPage, filterData: { category } })); 
  }, [dispatch, category, page]);

  return (
    <Container>
      <FiltersContainer>
        <FilterGroup>
          <FilterGroupLabel>
            {t('brands')}
          </FilterGroupLabel>
          <ul>
            {
              brands.map((brand: string, i) => (
                <BrandItem key={uuid()}>
                  <Checkbox 
                    id={brand} 
                    type='checkbox' 
                    name={brand}
                    value={brand}
                    checked={checkedBrandIds[i]} 
                    onChange={() => handleCheckingBrandChange(i)}
                  />
                  <label htmlFor={brand}>
                    {brand}
                  </label>
                </BrandItem>
              ))
            }
          </ul>
        </FilterGroup>
        <FilterGroup>
          <FilterGroupLabel>
            {t('price')}
          </FilterGroupLabel>
          <PriceFilters>
            <PriceField 
              data-testid='minPrice'
              type='number' 
              name='minPrice' 
              value={priceData.minPrice}
              placeholder='from' 
              onChange={handlePriceDataChange} 
            />
            <PriceField 
              data-testid='maxPrice'
              type='number' 
              name='maxPrice' 
              value={priceData.maxPrice}
              placeholder='to' 
              onChange={handlePriceDataChange} 
            />
          </PriceFilters>
        </FilterGroup>
        <Button
          type={ButtonType.Button}
          color={ButtonColor.Primary} 
          onClick={handleFilterDataSubmit}
        >
          {t('findBtn')}
        </Button>
        <Button
          type={ButtonType.Button}
          color={ButtonColor.Secondary}
          onClick={clearFilters}
        >
          {t('clearBtn')}
        </Button>
      </FiltersContainer>
      <Content>
        {
          status === 'succeeded' ? (
            <ProductList products={products} />
          ) : (
            <Loader />
          )
        }
        <Pagination 
          pageCount={pageCount}
          setPage={setPage}
        />
      </Content>
    </Container>
  );
};

export default Products;