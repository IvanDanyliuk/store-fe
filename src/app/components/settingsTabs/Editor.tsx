import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';
import { ButtonColor, TableTypes } from '../../../types/types';
import { getProducts } from '../../features/product/asyncActions';
import { selectProducts } from '../../features/product/selectors';
import { AppDispatch } from '../../features/store';
import Table from '../table/Table';
import Button from '../ui/Button';

import { categories } from '../../data';


const Container = styled.div`
  ${tw`
  
  `}
`;

const Section = styled.section`
  ${tw`
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
  
  `}
`;


const Editor = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Container>
      <Section>
        <SectionHeader>
          <SubTitle>Products</SubTitle>
          <Button 
            color={ButtonColor.Success} 
            onClick={() => console.log('Hi!')}
          >
            Add new
          </Button>
        </SectionHeader>
        <Table tableType={TableTypes.Products} data={products} />
      </Section>
      <Section>
        <SectionHeader>
          <SubTitle>Categories</SubTitle>
          <Button 
            color={ButtonColor.Success} 
            onClick={() => console.log('Hi!')}
          >
            Add new
          </Button>
        </SectionHeader>
        <Table tableType={TableTypes.Categories} data={categories} />
      </Section>
    </Container>
  );
};

export default Editor;