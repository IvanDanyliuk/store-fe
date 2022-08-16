import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import CategoriesList from '../components/categories/CategoriesList';


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
  const { category } = useParams();

  return (
    <Container>
      {
        category ? (
          <CategoriesList category={category} />
        ) : (
          <CategoriesList />
        )
      }
    </Container>
  );
};

export default Categories;