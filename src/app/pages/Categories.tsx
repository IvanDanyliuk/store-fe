import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import CategoriesList from '../components/categories/CategoriesList';
import SubCategoriesList from '../components/categories/SubCategoriesList';


const Container = styled.div`
  ${tw`
    w-full
    p-3
  `}
`;

const CategoryList = styled.ul`
  ${tw`
  
  `}
`;

const Categories: React.FC = () => {
  const location = useLocation();
  const category = location.pathname.split('/')[2];

  return (
    <Container>
      {
        category ? (
          <SubCategoriesList />
        ) : (
          <CategoriesList />
        )
      }
    </Container>
  );
};

export default Categories;