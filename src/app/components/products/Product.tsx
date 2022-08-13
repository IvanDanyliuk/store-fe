import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { IProductProps } from '../../../types/types';


const Card = styled.div`
  ${tw`
    relative
    w-1/6
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

const InfoSection = styled.div`

`;

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
    text-lg
    font-medium
  `}
`;

const Rating = styled.div``;

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

const Product: React.FC<IProductProps> = ({ product }) => {
  return (
    <Card>
      <HeartIcon>
        <FontAwesomeIcon icon={faHeart} />
      </HeartIcon>
      <ImageSection>
        <Image src={product.image} alt={product.title} />
      </ImageSection>
      <InfoSection>
        <Promotions>
          {product.promotion.map((item, i) => (
            <PromotionChip key={`${item}_${i}`}>{item}</PromotionChip>
          ))}
        </Promotions>
        <Title>{product.title}</Title>
        <Rating>
          {Array(product.rating).fill('').map(star => (
            <RatingIcon>
              <FontAwesomeIcon icon={faStar} />
            </RatingIcon>
          ))}
        </Rating>
        <Price>
          <Currency>$</Currency>
          <Amount>{product.price}</Amount>
        </Price>
      </InfoSection>
    </Card>
  );
};

export default Product;