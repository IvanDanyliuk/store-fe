import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import tw from 'twin.macro';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faStar, faThumbsDown, faThumbsUp, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AddCommentForm } from '../components/modals';
import { AppDispatch } from '../features/store';
import { selectProduct, selectProductStatus } from '../features/product/selectors';
import { getProduct } from '../features/product/asyncActions';
import { clearProduct } from '../features/product/reducers';
import { selectUser } from '../features/user/selectors';
import { Button, Loader, RoundedButton } from '../components/ui';
import { ButtonColor, ButtonType, IColor } from '../../types/types';
import { addToCart } from '../features/cart/reducers';
import { selectCartData } from '../features/cart/selectors';
import { deleteReview, getProductReviews, updateReview } from '../features/reviews/asyncActions';
import { selectReviews } from '../features/reviews/selectors';
import { IReview } from '../features/reviews/types';
import { SUCCESS_COLOR, DANGER_COLOR, PRODUCT_RATING_STAR_COLOR } from '../services/constants';


const Breadcrumbs = styled.div`
  ${tw`
    flex
    text-sm
    md:text-base
  `}
`;

const BreadCrumb = styled(Link)`
  ${tw`
    mx-3
  `}
`;

const Title = styled.h3`
  ${tw`
    mx-3
    my-3
    text-xl
    md:text-2xl
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
    gap-6
  `}
`;

const Gallery = styled.div`
  ${tw`
    px-12
    py-3
    md:p-3
    md:w-2/6
    w-full
    flex
    justify-center
    items-center
  `}
`;

const GeneralInfo = styled.div`
  ${tw`
    p-3
    w-full
    md:w-4/6
  `}
`;

const ShortInfo = styled.div`
  ${tw`
    my-3
    text-sm
    md:text-base
  `}
`;

const TopSection = styled.div`
  ${tw`
    flex
    items-center
  `}
`;

const Stock = styled.div`
  background: ${SUCCESS_COLOR};
  ${tw`
    mr-3
    px-3
    py-2
    text-white
    text-base
    font-bold
    rounded
  `}
`;

const Rating = styled.div`
  color: ${PRODUCT_RATING_STAR_COLOR};
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
    gap-16
    text-sm
    md:text-base
  `}
`;

const AdditionalSection = styled.div`
  ${tw`
    p-3
    md:w-1/2
  `}
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
    py-3
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
  button {
    margin-right: 20px;
  }
`;

const OrderInfo = styled.div`
  ${tw`
    mt-6
    flex
    text-sm
    md:text-base
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
    py-3
    border-b
  `}
`;

const ReviewHeader = styled.div`
  ${tw`
    mb-3
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
    w-6
    h-6
    md:w-8
    md:h-8
    object-cover
    rounded-2xl
  `}
`;

const UserName = styled.div`
  ${tw`
    text-xs
    md:text-sm
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

const Comment = styled.div`
  ${tw`
    mt-1
    mb-2
    flex
    flex-col
    gap-2
    text-xs
    md:text-sm
  `}
`;

const CommentTitle = styled.span`
  ${tw`
    mb-3
    font-semibold
  `}
`;

const ReviewFooter = styled.div`
  ${tw`
    flex
    justify-between
    items-center
  `}
`;

const BtnGroup = styled.div`
  ${tw`
    flex
  `}
  button {
    margin-right: 10px;
  }
`;

const LikeBtn = styled.button`
  background: ${SUCCESS_COLOR};
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
  background: ${DANGER_COLOR};
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
  const { t } = useTranslation(['product']);
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const product = useSelector(selectProduct);
  const reviews = useSelector(selectReviews);
  const status = useSelector(selectProductStatus);
  const user = useSelector(selectUser);
  const cart = useSelector(selectCartData);

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product?._id,
      quantity: 1,
      product
    }));
    localStorage.setItem(
      'cart', 
      JSON.stringify([
        ...cart, 
        { id: product?._id, quantity: 1, product }
      ])
    );
  };

  const likeReview = (review: IReview) => {
    const isLiked = review!.likes!.includes(user!.email);
    const isDisliked = review!.dislikes!.includes(user!.email);
    if(!isLiked && !isDisliked) {
      dispatch(updateReview({
        id: review._id!,
        updatedReview: {
          ...review,
          likes: [ ...review.likes, user?.email ],
        },
      }));
    }
    if(!isLiked && isDisliked) {
      dispatch(updateReview({
        id: review._id!,
        updatedReview: {
          ...review,
          likes: [ ...review.likes, user?.email ],
          dislikes: review.dislikes.filter((item: string) => item !== user?.email),
        },
      }));
    }
    if(isLiked) {
      dispatch(updateReview({
        id: review._id!,
        updatedReview: {
          ...review,
          likes: [...review.likes.filter((item: string) => item !== user!.email)],
        },
      }));
    }
  };

  const dislikeReview = (review: IReview) => {
    const isLiked = review!.likes!.includes(user!.email);
    const isDisliked = review!.dislikes!.includes(user!.email);
    if(!isLiked && !isDisliked) {
      dispatch(updateReview({
        id: review._id!,
        updatedReview: {
          ...review,
          dislikes: [ ...review.dislikes, user?.email ],
        },
      }));
    }
    if(isLiked && !isDisliked) {
      dispatch(updateReview({
        id: review._id!,
        updatedReview: {
          ...review,
          likes: [...review.likes.filter((item: string) => item !== user!.email)],
          dislikes: [ ...review.dislikes, user!.email ],
        },
      }));
    }
    if(isDisliked) {
      dispatch(updateReview({
        id: review._id!,
        updatedReview: {
          ...review,
          dislikes: review.dislikes.filter((item: string) => item !== user?.email),
        },
      }));
    }
  };
  
  const handleReviewDelete = (id: string) => {
    dispatch(deleteReview(id));
  };

  useEffect(() => {
    dispatch(getProduct(id!));
    return () => { dispatch(clearProduct()) };
  }, [dispatch]);

  useEffect(() => {
    if(product) {
      dispatch(getProductReviews(product._id));
    }
  }, [product]);
  
  if(status === 'loading') {
    return <Loader />;
  }

  return (
    <div>
      <Breadcrumbs>
        <BreadCrumb to={`/categories/${product?.category.main.url}`}>
          {product?.category.main.title}
        </BreadCrumb>
        <span>/</span>
        <BreadCrumb to={`/products/${product?.category.subCategory.url}`}>
          {product?.category.subCategory.title}
        </BreadCrumb>
      </Breadcrumbs>
      <Title>
        {product?.title}
      </Title>
      <Info>
        <Gallery>
          <img src={product?.image} alt={product?.title} />
        </Gallery>
        <GeneralInfo>
          <TopSection>
            <Stock>
              {t('inStock')}
            </Stock>
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
          <div>
            <InfoTitle>{t('color')}:</InfoTitle>
            <Color color={product?.color}></Color>
          </div>
          <SellingSection>
            <Price>
              <Currency>$</Currency>
              <Amount>{product?.price}</Amount>
            </Price>
            <ActionBtns>
              <Button
                type={ButtonType.Button}
                color={ButtonColor.Primary}
                onClick={handleAddToCart}
              >
                {t('buyBtn')}
              </Button>
              <Button
                type={ButtonType.Button}
                color={ButtonColor.Secondary}
              >
                {t('buyOnCreditBtn')}
              </Button>
            </ActionBtns>
          </SellingSection>
          <OrderInfo>
            <OrderInfoContainer>
              <InfoTitle>{t('shipping')}:</InfoTitle>
              <OrderInfoList>
                <li>DHL</li>
                <li>FedEx</li>
                <li>Nova Poshta</li>
                <li>Self-Delivery</li>
              </OrderInfoList>
            </OrderInfoContainer>
            <OrderInfoContainer>
              <InfoTitle>{t('payment')}:</InfoTitle>
              <OrderInfoList>
                <li>Visa / MasterCard</li>
                <li>PayPal</li>
                <li>Payoneer</li>
                <li>Portmone</li>
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
            <InfoTitle>{t('reviews')}:</InfoTitle>
            <AddCommentForm />
          </ReviewTopSection>
          <ReviewList>
            {reviews.map((review: any) => (
              <ReviewBody key={uuid()} data-testid='reviewItem'>
                <ReviewHeader>
                  <UserInfo>
                    <Avatar src={review.userAvatarUrl} />
                    <UserName>
                      {`${review.userFirstName} ${review.userLastName}`}
                    </UserName>
                  </UserInfo>
                  <PostDate>
                    {moment(review.date).format('DD MM YYYY')}
                  </PostDate>
                </ReviewHeader>
                <Comment>
                  <div>
                    <CommentTitle>{t('reviewAdvantages')}: </CommentTitle>
                    {review.advantages}
                  </div>
                  <div>
                    <CommentTitle>{t('reviewDisadvantages')}: </CommentTitle>
                    {review.disadvantages}
                  </div>
                  <div>
                    {review.comment}
                  </div>
                </Comment>
                <ReviewFooter>
                  <BtnGroup>
                    {
                      user?.isAdmin && (
                        <>
                          <RoundedButton
                            type={ButtonType.Button}
                            color={ButtonColor.Danger}
                            onClick={() => handleReviewDelete(review._id)}
                          >
                            <FontAwesomeIcon 
                              data-testid='deleteReview' 
                              icon={faTrash} 
                            />
                          </RoundedButton>
                          <RoundedButton
                            type={ButtonType.Button}
                            color={ButtonColor.Secondary}
                            onClick={() => {}}
                          >
                            <FontAwesomeIcon icon={faPen} />
                          </RoundedButton>
                        </>
                      )
                    }
                  </BtnGroup>
                  <BtnGroup>
                    <LikeBtn onClick={() => likeReview(review)}>
                      <FontAwesomeIcon 
                        data-testid='likeBtn' 
                        icon={faThumbsUp} 
                      />
                      <ReactionsNum data-testid='likeCounter'>
                        {review.likes.length}
                      </ReactionsNum>
                    </LikeBtn>
                    <DislikeBtn onClick={() => dislikeReview(review)}>
                      <FontAwesomeIcon 
                        data-testid='dislikeBtn' 
                        icon={faThumbsDown} 
                      />
                      <ReactionsNum data-testid='dislikesCounter'>
                        {review.dislikes.length}
                      </ReactionsNum>
                    </DislikeBtn>
                  </BtnGroup>
                </ReviewFooter>
              </ReviewBody>
            ))}
          </ReviewList>
        </AdditionalSection>
      </AdditionalInfo>
    </div>
  );
};

export default Product;