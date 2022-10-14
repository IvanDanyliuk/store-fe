import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { v4 as uuid } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { ButtonColor, ButtonType, IProductCardProps } from '../../../types/types';
import RoundedButton from '../ui/RoundedButton';
import { IProduct } from '../../features/product/types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../features/store';
import { addToCart } from '../../features/cart/reducers';
import { selectCartData } from '../../features/cart/selectors';
import { selectUser } from '../../features/user/selectors';
import { updateUser } from '../../features/user/asyncActions';


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
    w-full
    h-44
    flex
    justify-center
    items-center
  `}
`;

const Image = styled.img`
  max-height: 100%;
  max-width: 100%;
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
  &[data-isPicked='true'] {
    color: #f6c430;
  }
  &[data-isPicked='false'] {
    color: #1fcdd6;
  }
  transition: ease-in-out .3s;
  z-index: 10;

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

const CardFooter = styled.div`
  ${tw`
    w-full
    flex
    justify-between
  `}
`;

const BtnContainer = styled.div`
  ${tw`
    absolute
    right-3
    bottom-3
  `}
`;


const ProductCard: React.FC<IProductCardProps> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { category } = useParams();
  const cart = useSelector(selectCartData);
  const user = useSelector(selectUser);
  const token = localStorage.getItem('profile') && JSON.parse(localStorage.getItem('profile') || '').token;
  const isProductInWishList = user?.wishList.some(item => item._id === product._id);

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product._id,
      quantity: 1,
      product
    }));
    localStorage.setItem(
      'cart', 
      JSON.stringify([
        ...cart, 
        { id: product._id, quantity: 1, product }
      ])
    );
  };

  const handleAddToWishList = () => {
    const isInWishList = user!.wishList!.some(item => item._id === product._id);
    if(!isInWishList) {
      dispatch(
        updateUser({ 
          id: user?._id!, 
          userData: { 
            ...user!, 
            wishList: [ ...user?.wishList!, product ],
          }, 
        })
      );
      localStorage.setItem('profile', JSON.stringify({ 
        token, 
        result: { 
          ...user!, 
          wishList: [ ...user?.wishList!, product ],
        } 
      }));
    } else {
      const updatedWishList = user?.wishList.filter(item => item._id !== product._id);
      dispatch(
        updateUser({
          id: user?._id!,
          userData: {
            ...user!,
            wishList: updatedWishList!,
          },
        })
      );
      localStorage.setItem('profile', JSON.stringify({ 
        token, 
        result: { 
          ...user!,
          wishList: updatedWishList!,
        } 
      }));
    }
  };
  
  return (
    <Card>
      <HeartIcon data-isPicked={isProductInWishList} onClick={handleAddToWishList}>
        <FontAwesomeIcon icon={faHeart} />
      </HeartIcon>
      <ProductLink to={`/products/${category}/${product._id}`}>
        <ImageSection>
          <Image src={product.image} alt={product.title} />
        </ImageSection>
      </ProductLink>
      <InfoSection>
        <Promotions>
          {product.promotion.map((item: any) => (
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
        <CardFooter>
          <Price>
            <Currency>$</Currency>
            <Amount>
              {product.price}
            </Amount>
          </Price>
          <BtnContainer>
            <RoundedButton type={ButtonType.Button} color={ButtonColor.Success} onClick={handleAddToCart}>
              <FontAwesomeIcon icon={faCartShopping} />
            </RoundedButton>
          </BtnContainer>
        </CardFooter>
      </InfoSection>
    </Card>
  );
};

export default ProductCard;