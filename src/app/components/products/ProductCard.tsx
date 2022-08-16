import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { v4 as uuid } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { IProductCardProps } from '../../../types/types';


const Card = styled.li`
  ${tw`
    relative
    p-3
    md:w-1/6
    border
    border-solid
    border-gray-300
    rounded-md
  `}
`;

const ImageSection = styled.div`
  ${tw`
    relative
    h-56
    flex
    justify-center
  `}
`;

const Image = styled.img`
  ${tw`
    h-56
  `}
`;

const ProductLink = styled(Link)``;

const InfoSection = styled.div``;

const Promotions = styled.div`
  ${tw`
    flex
    pt-2
  `}
`;

const PromotionChip = styled.div`
  background: #ca3939;
  ${tw`
    mr-2
    pt-1
    pb-1
    pl-3
    pr-3
    text-xs
    text-white
    font-black
    rounded
  `}
`;

const Title = styled.div`
  ${tw`
    pt-2
    pb-2
    text-base
    font-medium
  `}
`;

const Rating = styled.div`
  ${tw`
    pb-2
  `}
`;

const RatingIcon = styled.span`
  color: #f0ab44;
`;

const HeartIcon = styled.button`
  color: #1fcdd6;
  transition: ease-in-out .3s;
  z-index: 100;

  &:hover {
    color: #f6c430;
  }

  ${tw`
    absolute
    top-2
    right-2
    text-2xl
  `}
`;

const Price = styled.div`
  ${tw`
    font-bold
  `}
`;

const Currency = styled.span`
  ${tw`
    text-lg
  `}
`;

const Amount = styled.span`
  ${tw`
    text-2xl
  `}
`;

const ProductCard: React.FC<IProductCardProps> = ({ product }) => {
  const { category } = useParams();
  
  return (
    <Card>
      <HeartIcon>
        <FontAwesomeIcon icon={faHeart} />
      </HeartIcon>
      <ImageSection>
        <Image src={product.image} alt={product.title} />
      </ImageSection>
      <InfoSection>
        <ProductLink to={`/products/${category}/${product._id}`}>
          <Promotions>
            {product.promotion.map(item => (
              <PromotionChip key={uuid()}>
                {item}
              </PromotionChip>
            ))}
          </Promotions>
          <Title>
            {product.title}
          </Title>
          <Rating>
            {Array(product.rating).fill('').map(star => (
              <RatingIcon key={uuid()}>
                <FontAwesomeIcon icon={faStar} />
              </RatingIcon>
            ))}
          </Rating>
          <Price>
            <Currency>$</Currency>
            <Amount>
              {product.price}
            </Amount>
          </Price>
        </ProductLink>
      </InfoSection>
    </Card>
  );
};

export default ProductCard;