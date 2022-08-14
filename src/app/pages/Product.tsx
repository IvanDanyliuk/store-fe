import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { products } from '../data';
import tw from 'twin.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';


interface IColor {
  color: string;
}

const ProductBody = styled.div`
  ${tw`
    pt-3
    pb-3
  `}
`;

const Breadcrumbs = styled.div`
  ${tw`
  
  `}
`;

const BreadCrumb = styled(Link)`
  ${tw`
  
  `}
`;

const BreadcrumbDivider = styled.span`
  ${tw`
    ml-2
    mr-2
  `}
`;

const Title = styled.h3`
  ${tw`
    mt-3
    mb-3
    text-2xl
    font-bold
  `}
`;

const Info = styled.div`
  ${tw`
    relative
    w-full
    flex
  `}
`;

const Gallery = styled.div`
  ${tw`
    p-3
    w-2/6
  `}
`;

const Image = styled.img`
  ${tw`
  
  `}
`;

const GeneralInfo = styled.div`
  ${tw`
    p-3
    w-4/6
  `}
`;

const ShortInfo = styled.div`
  ${tw`
    mt-3
    mb-3
  `}
`;

const TopSection = styled.div`
  ${tw`
    flex
    items-center
  `}
`;

const Stock = styled.div`
  background: rgb(43, 212, 161);
  ${tw`
    mr-3
    pt-2
    pb-2
    pl-3
    pr-3
    text-white
    text-base
    font-bold
    rounded
  `}
`;

const Rating = styled.div`
  color: #f0ab44;
  ${tw`
    text-xl
  `}
`;

const AdditionalInfo = styled.div`
  ${tw`
    mt-6
    flex
  `}
`;

const AdditionalSection = styled.div`
  ${tw`
    p-3
    w-1/2
  `}
`;

const ColorSection = styled.div`

`;

const InfoTitle = styled.p`
  ${tw`
    font-bold
  `}
`;

const Color = styled.div<IColor>`
  background-color: ${({ color }) => color};
  ${tw`
    mt-2
    mb-3
    w-6
    h-6
    rounded-xl
  `}
`;

const SellingSection = styled.div`
  ${tw`
    pt-3
    pb-3
    flex
  `}
`;

const Price = styled.div`
  ${tw`
    font-bold
  `}
`;

const Currency = styled.span`
  ${tw`
    text-2xl
  `}
`;

const Amount = styled.span`
  ${tw`
    text-4xl
  `}
`;

const ActionBtns = styled.div`
  ${tw`
    ml-10
    flex
  `}
`;

const BuyBtn = styled.button`
  background: rgb(48, 213, 249);
  ${tw`
    mr-3
    pt-2
    pb-2
    w-44
    rounded-lg
    text-white
    font-bold
  `}
`;

const CreditBuyBtn = styled.button`
  background: rgb(37, 160, 187);
  ${tw`
    pt-2
    pb-2
    w-44
    rounded-lg
    text-white
    font-bold
  `}
`;

const OrderInfo = styled.div`
  ${tw`
    mt-6
    flex
  `}
`;

const OrderInfoContainer = styled.div`
  ${tw`

  `}
`;

const OrderInfoList = styled.ul`
  ${tw`
    mr-20
  `}
`;

const OrderListItem = styled.li``;

const ReviewTopSection = styled.div`
  ${tw`
    flex
    justify-between
  `}
`;

const CommentBtn = styled.button`
  ${tw`
    pt-1
    pb-1
    pl-4
    pr-4
    rounded
    text-sm
    font-bold
    bg-gray-300
  `}
`;

const ReviewList = styled.ul`
  ${tw`
    pl-3

  `}
`;

const ReviewBody = styled.li`
  ${tw`
    mb-2
    pt-3
    pb-3
    border-b
  `}
`;

const ReviewHeader = styled.div`
  ${tw`
    flex
    justify-between
    items-center
  `}
`;

const UserInfo = styled.div`
  ${tw`
    flex
    items-center
  `}
`;

const Avatar = styled.img`
  ${tw`
    mr-2
    w-8
    h-8
    object-cover
    rounded-2xl
  `}
`;

const UserName = styled.div`
  ${tw`
    font-bold
    text-gray-600
  `}
`;

const PostDate = styled.div`
  ${tw`
    text-xs
    text-gray-500
  `}
`;

const Comment = styled.p`
  ${tw`
    mt-1
    mb-2
    text-sm
  `}
`;

const ReviewFooter = styled.div`
  ${tw`
    flex
    justify-end
  `}
`;

const LikeBtn = styled.button`
  background: rgb(43, 212, 161);
  ${tw`
  mr-2
    w-14
    h-6
    flex
    justify-center
    items-center
    text-sm
    rounded
    text-white
  `}
`;

const DislikeBtn = styled.button`
  background: rgb(237, 96, 96);
  ${tw`
    w-14
    h-6
    flex
    justify-center
    items-center
    text-sm
    rounded
    text-white
  `}
`;

const ReactionsNum = styled.span`
  ${tw`
    ml-1
    font-semibold
  `}
`;


const Product: React.FC = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const productData = products.find(product => product._id === id);

  return (
    <ProductBody>
      <Breadcrumbs>
        <BreadCrumb to={`/${productData!.category.main.url}`}>{productData!.category.main.title}</BreadCrumb>
        <BreadcrumbDivider>/</BreadcrumbDivider>
        <BreadCrumb to={`/${productData!.category.subCategory.url}`}>{productData!.category.subCategory.title}</BreadCrumb>
      </Breadcrumbs>
      <Title>{productData?.title}</Title>
      <Info>
        <Gallery>
          <Image src={productData?.image} alt={productData?.title} />
        </Gallery>
        <GeneralInfo>
          <TopSection>
            <Stock>In Stock</Stock>
            <Rating>{Array(productData?.rating).fill('').map(i => <FontAwesomeIcon icon={faStar} />)}</Rating>
          </TopSection>
          <ShortInfo>{productData?.shortInfo}</ShortInfo>
          <ColorSection>
            <InfoTitle>Color:</InfoTitle>
            <Color color={productData!.color}></Color>
          </ColorSection>
          <SellingSection>
            <Price>
              <Currency>$</Currency>
              <Amount>{productData!.price}</Amount>
            </Price>
            <ActionBtns>
              <BuyBtn>Buy</BuyBtn>
              <CreditBuyBtn>Buy on Credit</CreditBuyBtn>
            </ActionBtns>
          </SellingSection>
          <OrderInfo>
            <OrderInfoContainer>
              <InfoTitle>Shipping:</InfoTitle>
              <OrderInfoList>
                <OrderListItem>DHL</OrderListItem>
                <OrderListItem>FedEx</OrderListItem>
                <OrderListItem>Nova Poshta</OrderListItem>
                <OrderListItem>Self-Delivery</OrderListItem>
              </OrderInfoList>
            </OrderInfoContainer>
            <OrderInfoContainer>
              <InfoTitle>Payment:</InfoTitle>
              <OrderInfoList>
                <OrderListItem>Visa / MasterCard</OrderListItem>
                <OrderListItem>PayPal</OrderListItem>
                <OrderListItem>Payoneer</OrderListItem>
                <OrderListItem>Portmone</OrderListItem>
              </OrderInfoList>
            </OrderInfoContainer>
          </OrderInfo>
        </GeneralInfo>
      </Info>
      <AdditionalInfo>
        <AdditionalSection>
          {productData?.description}
        </AdditionalSection>
        <AdditionalSection>
          <ReviewTopSection>
            <InfoTitle>Reviews:</InfoTitle>
            <CommentBtn>Comment</CommentBtn>
          </ReviewTopSection>
          <ReviewList>
            {productData!.reviews.map(review => (
              <ReviewBody>
                <ReviewHeader>
                  <UserInfo>
                    <Avatar src={review.user.avatarUrl} />
                    <UserName>{`${review.user.firstName} ${review.user.lastName}`}</UserName>
                  </UserInfo>
                  <PostDate>{review.date}</PostDate>
                </ReviewHeader>
                <Comment>{review.comment}</Comment>
                <ReviewFooter>
                  <LikeBtn>
                    <FontAwesomeIcon icon={faThumbsUp} />
                    <ReactionsNum>{review.likes}</ReactionsNum>
                  </LikeBtn>
                  <DislikeBtn>
                    <FontAwesomeIcon icon={faThumbsDown} />
                    <ReactionsNum>{review.dislikes}</ReactionsNum>
                  </DislikeBtn>
                </ReviewFooter>
              </ReviewBody>
            ))}
          </ReviewList>
        </AdditionalSection>
      </AdditionalInfo>
    </ProductBody>
  );
};

export default Product;