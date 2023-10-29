import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import Modal from 'react-modal';
import StarRating from 'react-star-rate';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faXmark } from '@fortawesome/free-solid-svg-icons';
import { SCREENS } from '../../services/screens';
import { isCommentDataValid } from '../../helpers/formValidation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../features/store';
import { Button, FormErrorMessage, RoundedButton } from '../ui';
import { ButtonColor, ButtonType, IEditReviewModalProps } from '../../../types/types';
import { updateReview } from '../../features/reviews/asyncActions';
import { Input, TextArea } from '../inputs';
import { BASIC_BACKGROUND_WHITE, MODAL_OVERLAY_COLOR } from '../../services/constants';


if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root');


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

const Inputs = styled.fieldset`
  ${tw`
    w-full
  `}
`;


const EditReviewModal: React.FC<IEditReviewModalProps> = ({ review }) => {
  const { t } = useTranslation(['modals']);
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

  const handleCommentDataChange = (e: ChangeEvent<HTMLInputElement>) => {
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
        id: review._id!,
        updatedReview: commentData,
      }));
      setIsOpen(false);
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
      background: BASIC_BACKGROUND_WHITE,
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      background: MODAL_OVERLAY_COLOR,
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
          <FormTitle>
            {t('editReviewTitle')}
          </FormTitle>
          <CloseBtn data-testid='closeBtn' onClick={handleOpenModal}>
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
            <Input 
              name='advantages'
              label={t('editReviewAdvantages')}
              value={commentData.advantages}
              onChange={handleCommentDataChange}
            />
            <Input 
              name='disadvantages'
              label={t('editReviewDisadvantages')}
              value={commentData.disadvantages}
              onChange={handleCommentDataChange}
            />
            <TextArea 
              name='comment'
              label={t('editReviewComment')}
              value={commentData.comment}
              onChange={handleCommentDataChange}
            />
          </Inputs>
          <Button
            type={ButtonType.Button}
            color={ButtonColor.Success}
            onClick={handleCommentDataSubmit}
          >
            {t('editReviewSubmitBtn')}
          </Button>
        </CommentForm>
      </Modal>
    </>
  );
};

export default EditReviewModal;