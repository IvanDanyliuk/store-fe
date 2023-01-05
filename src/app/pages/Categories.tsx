import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import CategoryList from '../components/categories/CategoryList';


const Container = styled.div`
  ${tw`
    w-full
    p-3
  `}
`;


const Categories: React.FC = () => {
  const { category } = useParams();

  return (
    <Container>
      {
        category ? (
          <CategoryList category={category} />
        ) : (
          <CategoryList />
        )
      }
    </Container>
  );
};

export default Categories;