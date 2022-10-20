import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';
import { v4 as uuid } from 'uuid';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonColor, ButtonType } from '../../../types/types';
import { deleteReview } from '../../features/user/asyncActions';
import { AppDispatch } from '../../features/store';
import { getUserReviews } from '../../features/user/asyncActions';
import { selectReviews, selectUser } from '../../features/user/selectors';
import ProductListImage from '../ui/ProductListImage';
import RoundedButton from '../ui/RoundedButton';
import EditReviewModal from '../modals/EditReviewModal';


const Container = styled.div`
  ${tw`
    w-full
  `}
`;

const ReviewList = styled.ul`
  ${tw`
    w-full
  `}
`;

const ReviewItem = styled.li`
  border-bottom: 1px solid #c1c1c1;
  ${tw`
    pt-3
    pb-3
    w-full
    flex
    flex-col
    md:flex-row
  `}
`;

const ReviewInfo = styled.div`
  ${tw`
    w-full
    md:w-11/12
    flex
    justify-between
    items-center
  `}
`;

const ReviewActions = styled.div`
  ${tw`
    w-full
    md:w-1/12
    flex
    justify-end
    md:justify-between
    items-center
  `}
  button {
    margin-right: 10px;
  }
`;

const CommentData = styled.div`
  ${tw`
    ml-1
    md:ml-3
    w-11/12
    md:w-full
  `}
`;

const Text = styled.p`
  ${tw`
    text-sm
  `}
`;

const TextTitle = styled.span`
  ${tw`
    inline-block
    w-36
    font-semibold
  `}
`;

const Message = styled.div`
  ${tw`
    w-full
    h-full
    text-center
  `}
`;


const Reviews: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const reviews = useSelector(selectReviews);

  const handleReviewDelete = (id: string) => {
    dispatch(deleteReview(id));
  };

  useEffect(() => {
    dispatch(getUserReviews(user?.email!));
  }, [dispatch]);

  return (
    <Container>
      <ReviewList>
        {
          reviews.length > 0 ? reviews.map(review => (
            <ReviewItem key={uuid()}>
              <ReviewInfo>
                <ProductListImage 
                  url={review.productImageUrl} 
                  altText={review.productId} 
                />
                <CommentData>
                  <Text>
                    <TextTitle>Advantages: </TextTitle>
                    {review.advantages}
                  </Text>
                  <Text>
                    <TextTitle>Disadvantages: </TextTitle>
                    {review.disadvantages}
                  </Text>
                  <Text>
                    {review.comment}
                  </Text>
                </CommentData>
              </ReviewInfo>
              <ReviewActions>
                <EditReviewModal review={review} />
                <RoundedButton
                  type={ButtonType.Button}
                  color={ButtonColor.Danger}
                  onClick={() => handleReviewDelete(review._id!)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </RoundedButton>
              </ReviewActions>
            </ReviewItem>
          )) : (
            <Message>
              You don't have any reviews
            </Message>
          )
        }
      </ReviewList>
    </Container>
  );
};

export default Reviews;