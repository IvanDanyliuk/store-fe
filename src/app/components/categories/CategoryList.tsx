import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { v4 as uuid } from 'uuid';
import { ISubCategoriesProps } from '../../../types/types';
import { getCategories } from '../../features/category/asyncActions';
import { selectCategories } from '../../features/category/selectors';
import { AppDispatch } from '../../features/store';


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


const CategoryList: React.FC<ISubCategoriesProps> = ({ category }) => {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(selectCategories);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <List>
      {
        category ? categories
        .find(item => item.main.url === category)
        ?.subCategories.map(item => (
          <CategoryItem key={uuid()}>
            <CategoryLink to={`/products/${item.url}`}>
              <Image src={''} alt={item.title} />
              <Title>{item.title}</Title>
            </CategoryLink>
          </CategoryItem>
        )) : categories.map(category => (
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

export default CategoryList;