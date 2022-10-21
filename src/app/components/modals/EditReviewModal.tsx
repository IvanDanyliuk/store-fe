import React, { SyntheticEvent, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import Modal from 'react-modal';
import StarRating from 'react-star-rate';
import { useMediaQuery } from 'react-responsive';
import { SCREENS } from '../../services/screens';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faXmark } from '@fortawesome/free-solid-svg-icons';
import { isCommentDataValid } from '../../helpers/formValidation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../features/store';
import FormErrorMessage from '../ui/FormErrorMessage';
import RoundedButton from '../ui/RoundedButton';
import { ButtonColor, ButtonType } from '../../../types/types';
import Button from '../ui/Button';
import { IReview } from '../../features/reviews/types';
import { updateReview } from '../../features/reviews/asyncActions';


interface IEditReviewModalProps {
  review: IReview;
}

Modal.setAppElement('#root');

const FormHeader = styled.div`
  ${tw`
    mb-4
    flex
    justify-center
  `}
`;

const FormTitle = styled.h6`
  ${tw`
    text-xl
    font-bold
  `}
`;

const CloseBtn = styled.button`
  ${tw`
    absolute
    top-2
    right-4
    text-xl
  `}
`;

const CommentForm = styled.form`
  ${tw`
    flex
    flex-col
    items-center
  `}
`;

const Rating = styled.fieldset`
  ${tw`
    mb-6
    flex
  `}
`;

const Inputs = styled.fieldset``;

const InputLabel = styled.label`
  ${tw`
    mb-1
    text-gray-500
    font-semibold
  `}
`;

const Input = styled.textarea`
  ${tw`
    p-2
    w-full
    border
    rounded
    mb-3
  `}
`;


const EditReviewModal: React.FC<IEditReviewModalProps> = ({ review }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');

  const [commentData, setCommentData] = useState({
    productId: review.productId,
    productImageUrl: review.productImageUrl,
    userFirstName: review.userFirstName,
    userLastName: review.userLastName,
    userEmail: review.userEmail,
    userAvatarUrl: review.userAvatarUrl,
    likes: review.likes,
    dislikes: review.dislikes,
    date: review.date,
    advantages: review.advantages,
    disadvantages: review.disadvantages,
    comment: review.comment,
    rate: review.rate,
  });

  const clearCommentForm = () => {
    setCommentData({
      ...commentData,
      advantages: review.advantages,
      disadvantages: review.disadvantages,
      comment: review.comment,
      rate: review.rate,
    });
  };

  const handleOpenModal = () => {
    if(isOpen&& error) {
      setError('');
      clearCommentForm();
    }
    setIsOpen(!isOpen);
  };

  const handleError = (error: string) => {
    setError(error);
  };

  const handleCommentDataChange = (e: any) => {
    setCommentData({
      ...commentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCommentDataSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const isDataValid = isCommentDataValid(commentData, handleError);
    if(isDataValid) {
      dispatch(updateReview({
        id: review._id,
        updatedReview: commentData,
      }));
      setIsOpen(false);
      console.log({
        id: review._id,
        updateReview: commentData,
      })
    }
  };

  const styles = {
    content: {
      width: isMobile ? '90%' : '500px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      background: 'rgb(255, 255, 255',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      background: 'rgba(141, 141, 141, .6',
    }
  };

  return (
    <>
      <RoundedButton
        type={ButtonType.Button}
        color={ButtonColor.Secondary}
        onClick={handleOpenModal}
      >
        <FontAwesomeIcon icon={faPen} />
      </RoundedButton>
      <Modal 
        isOpen={isOpen}
        onRequestClose={handleOpenModal}
        style={styles}
      >
        <FormHeader>
          <FormTitle>Leave a comment</FormTitle>
          <CloseBtn onClick={handleOpenModal}>
            <FontAwesomeIcon icon={faXmark} />
          </CloseBtn>
        </FormHeader>
        <FormErrorMessage error={error} />
        <CommentForm onSubmit={handleCommentDataSubmit}>
          <Rating>
            <StarRating
              value={commentData.rate}
              onChange={(rate: any) => setCommentData({ ...commentData, rate })}
            />
          </Rating>
          <Inputs>
            <InputLabel>Adantages</InputLabel>
            <Input 
              name='advantages' 
              value={commentData.advantages} 
              onChange={handleCommentDataChange} 
            />
            <InputLabel>Disadvantages</InputLabel>
            <Input 
              name='disadvantages' 
              value={commentData.disadvantages} 
              onChange={handleCommentDataChange} 
            />
            <InputLabel>Comment</InputLabel>
            <Input 
              name='comment'
              value={commentData.comment} 
              onChange={handleCommentDataChange} 
              rows={5}
            />
          </Inputs>
          <Button
            type={ButtonType.Button}
            color={ButtonColor.Success}
            onClick={handleCommentDataSubmit}
          >
            Submit
          </Button>
        </CommentForm>
      </Modal>
    </>
  );
};

export default EditReviewModal;