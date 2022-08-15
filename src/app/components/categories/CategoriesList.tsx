import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { v4 as uuid } from 'uuid';
import { categories } from '../../data';


const List = styled.ul`
  ${tw`
    w-full
    flex
    flex-col
    md:flex-row
    flex-wrap
  `}
`;

const CategoryItem = styled.li`
  ${tw`
    m-1
    p-3
    w-full
    md:w-1/6
    border
    border-gray-300
    rounded-lg
  `}
`;

const CategoryLink = styled(Link)``;

const Image = styled.img`
  ${tw`
    h-44
  `}
`;

const Title = styled.h4`
  ${tw`
    text-sm
    text-center
    font-semibold
  `}
`;


const CategoriesList: React.FC = () => {
  return (
    <List>
      {
        categories.map(category => (
          <CategoryItem key={uuid()}>
            <CategoryLink to={`/categories/${category.main.url}`}>
              <Image src={''} alt={category.main.title} />
              <Title>{category.main.title}</Title>
            </CategoryLink>
          </CategoryItem>
        ))
      }
    </List>  
  );
};

export default CategoriesList