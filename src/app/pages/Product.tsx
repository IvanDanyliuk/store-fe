import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import tw from 'twin.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import AddCommentForm from '../components/modals/AddCommentForm';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../features/store';
import { selectProduct, selectProductStatus } from '../features/product/selectors';
import { getProduct } from '../features/product/asyncActions';


interface IColor {
  color: string | undefined;
}

const ProductBody = styled.div`
  ${tw`
    pt-3
    pb-3
  `}
`;

const Breadcrumbs = styled.div`
  ${tw`
    flex
  `}
`;

const BreadCrumb = styled(Link)`
  ${tw`
    ml-3
    mr-3
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
    ml-3
    mr-3
    text-2xl
    font-bold
  `}
`;

const Info = styled.div`
  ${tw`
    relative
    w-full
    flex
    flex-col
    md:flex-row
  `}
`;

const Gallery = styled.div`
  ${tw`
    pt-3
    pb-3
    pl-12
    pr-12
    md:p-3
    md:w-2/6
    w-full
  `}
`;

const Image = styled.img``;

const GeneralInfo = styled.div`
  ${tw`
    p-3
    w-full
    md:w-4/6
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
    flex-col
    md:flex-row
  `}
`;

const AdditionalSection = styled.div`
  ${tw`
    p-3
    md:w-1/2
  `}
`;

const ColorSection = styled.div``;

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
    flex-col
    md:flex-row
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
    mt-3
    md:ml-10
    flex
  `}
`;

const BuyBtn = styled.button`
  background: rgb(48, 213, 249);
  ${tw`
    mr-3
    pt-2
    pb-2
    w-1/2
    md:w-44
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
    w-1/2
    md:w-44
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
    w-full
  `}
`;

const OrderInfoList = styled.ul`
  ${tw`
    w-1/2
  `}
`;

const OrderListItem = styled.li``;

const ReviewTopSection = styled.div`
  ${tw`
    flex
    justify-between
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
    w-16
    h-8
    md:w-14
    md:h-6
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
    w-16
    h-8
    md:w-14
    md:h-6
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
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const product = useSelector(selectProduct);
  const status = useSelector(selectProductStatus);

  useEffect(() => {
    dispatch(getProduct(id!));
  }, [dispatch, id]);
  
  if(status === 'loading') {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <ProductBody>
      <Breadcrumbs>
        <BreadCrumb to={`/categories/${product?.category.main.url}`}>
          {product?.category.main.title}
        </BreadCrumb>
        <BreadcrumbDivider>/</BreadcrumbDivider>
        <BreadCrumb to={`/products/${product?.category.subCategory.url}`}>
          {product?.category.subCategory.title}
        </BreadCrumb>
      </Breadcrumbs>
      <Title>
        {product?.title}
      </Title>
      <Info>
        <Gallery>
          <Image src={product?.image} alt={product?.title} />
        </Gallery>
        <GeneralInfo>
          <TopSection>
            <Stock>In Stock</Stock>
            <Rating>
              {
                Array(product?.rating)
                  .fill('')
                  .map(item => <FontAwesomeIcon key={uuid()} icon={faStar} />)
              }
            </Rating>
          </TopSection>
          <ShortInfo>
            {product?.shortInfo}
          </ShortInfo>
          <ColorSection>
            <InfoTitle>Color:</InfoTitle>
            <Color color={product?.color}></Color>
          </ColorSection>
          <SellingSection>
            <Price>
              <Currency>$</Currency>
              <Amount>{product?.price}</Amount>
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
          {product?.description}
        </AdditionalSection>
        <AdditionalSection>
          <ReviewTopSection>
            <InfoTitle>Reviews:</InfoTitle>
            <AddCommentForm />
          </ReviewTopSection>
          <ReviewList>
            {product?.reviews.map(review => (
              <ReviewBody key={uuid()}>
                <ReviewHeader>
                  <UserInfo>
                    <Avatar src={review.user.avatarUrl} />
                    <UserName>
                      {`${review.user.firstName} ${review.user.lastName}`}
                    </UserName>
                  </UserInfo>
                  <PostDate>
                    {review.date}
                  </PostDate>
                </ReviewHeader>
                <Comment>
                  {review.comment}
                </Comment>
                <ReviewFooter>
                  <LikeBtn>
                    <FontAwesomeIcon icon={faThumbsUp} />
                    <ReactionsNum>
                      {review.likes}
                    </ReactionsNum>
                  </LikeBtn>
                  <DislikeBtn>
                    <FontAwesomeIcon icon={faThumbsDown} />
                    <ReactionsNum>
                      {review.dislikes}
                    </ReactionsNum>
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