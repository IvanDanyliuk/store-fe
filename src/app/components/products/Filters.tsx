import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';
import { v4 as uuid } from 'uuid';
import { ButtonColor, ButtonType } from '../../../types/types';
import { AppDispatch } from '../../features/store';
import Button from '../ui/Button';


interface IFiltersProps {
  brands: string[];
}

const Container = styled.div`
  ${tw`
    pr-3
    w-full
    md:w-1/6
  `}
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

const BrandList = styled.ul`
  ${tw`
  
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

const Label = styled.label`
  ${tw`
  
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


const temporaryData = [
  'Samsung',
  'Apple',
  'Sony',
  'LG',
  'OPPO',
]


const Filters: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [filterData, setFilterData] = useState({
    brands: [],
    minPrice: 0,
    maxPrice: 0,
  });

  return (
    <Container>
      <FilterGroup>
        <FilterGroupLabel>Brands</FilterGroupLabel>
        <BrandList>
          {
            temporaryData.map(brand => (
              <BrandItem key={uuid()}>
                <Checkbox id={brand} type='checkbox' checked />
                <Label htmlFor={brand}>
                  {brand}
                </Label>
              </BrandItem>
            ))
          }
        </BrandList>
      </FilterGroup>
      <FilterGroup>
        <FilterGroupLabel>Price</FilterGroupLabel>
        <PriceFilters>
          <PriceField type='number' name='minPrice' placeholder='from' />
          <PriceField type='number' name='maxPrice' placeholder='to' />
        </PriceFilters>
      </FilterGroup>
      <Button
        type={ButtonType.Button}
        color={ButtonColor.Primary}
      >
        Find
      </Button>
    </Container>
  );
};

export default Filters;