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
import { SECONDARY_COLOR } from '../../services/constants';


const List = styled.ul`
  ${tw`
    mt-3
    w-full
    grid
    grid-cols-1
    md:grid-cols-4
    gap-6
  `}
`;

const CategoryItem = styled.li`
  ${tw`
    p-3
    border
    border-gray-300
    rounded-lg
    shadow-md
  `}
`;

const CategoryLink = styled(Link)`
  ${tw`
    h-full
    text-center
    flex
    flex-col
    content-between 
  `}
`;

const Image = styled.img`
  ${tw`
    m-auto
    max-h-44
  `}
`;

const Title = styled.h4`
  ${tw`
    mt-4
    text-base
    text-center
    font-semibold
  `}
`;

const BackLink = styled(Link)`
  color: ${SECONDARY_COLOR};
`;


const CategoryList: React.FC<ISubCategoriesProps> = ({ category }) => {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(selectCategories);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <>
      <BackLink to={'/categories'}>{category && 'back to categories'}</BackLink>
      <List>
        {
          category ? categories
          .find(item => item.main.url === category)
          ?.subCategories.map(item => (
            <CategoryItem key={uuid()}>
              <CategoryLink to={`/products/${item.url}`}>
                <Image src={item.image} alt={item.title} />
                <Title>{item.title}</Title>
              </CategoryLink>
            </CategoryItem>
          )) : categories.map(category => (
            <CategoryItem key={uuid()}>
              <CategoryLink to={`/categories/${category.main.url}`}>
                <Image src={category.subCategories[0].image} alt={category.main.title} />
                <Title>{category.main.title}</Title>
              </CategoryLink>
            </CategoryItem>
          ))
        }
      </List>
    </>  
  );
};

export default CategoryList;