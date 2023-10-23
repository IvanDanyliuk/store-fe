import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';
import Modal from 'react-modal';
import StarRating from 'react-star-rate';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { SCREENS } from '../../services/screens';
import { isCommentDataValid } from '../../helpers/formValidation';
import { AppDispatch } from '../../features/store';
import { FormErrorMessage } from '../ui';
import { createReview } from '../../features/reviews/asyncActions';
import { selectProduct } from '../../features/product/selectors';
import { selectUser } from '../../features/user/selectors';
import { Input, TextArea } from '../inputs';
import { 
  SUCCESS_COLOR, 
  BASIC_BACKGROUND_WHITE, 
  MODAL_OVERLAY_COLOR 
} from '../../services/constants';


if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root');


const CommentBtn = styled.button`
  ${tw`
    py-3
    px-8
    md:py-1
    md:px-4
    rounded
    text-sm
    font-bold
    bg-gray-300
  `}
`;

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

const SubmitBtn = styled.button`
  background: ${SUCCESS_COLOR};
  ${tw`
    mt-3
    p-2
    w-1/2
    rounded
    text-white
    font-bold
  `}
`;


const AddCommentForm: React.FC = () => {
  const { t } = useTranslation(['modals']);
  const dispatch = useDispatch<AppDispatch>();
  const product = useSelector(selectProduct);
  const user = useSelector(selectUser);
  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');

  const [commentData, setCommentData] = useState({
    advantages: '',
    disadvantages: '',
    comment: '',
    rate: 0,
  });

  const clearCommentForm = () => {
    setCommentData({
      advantages: '',
      disadvantages: '',
      comment: '',
      rate: 0,
    });
  };

  const handleOpenModal = () => {
    if(isOpen && error) {
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
      dispatch(createReview({
        ...commentData,
        productId: product?._id!,
        productImageUrl: product?.image!,
        userFirstName: user?.firstName!,
        userLastName: user?.lastName!,
        userEmail: user?.email!,
        userAvatarUrl: user?.avatarUrl!,
        likes: [],
        dislikes: [],
        date: new Date()
      }))
      clearCommentForm();
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
      <CommentBtn onClick={handleOpenModal}>
        {t('commentBtnComment')}
      </CommentBtn>
      <Modal 
        isOpen={isOpen}
        onRequestClose={handleOpenModal}
        style={styles}
      >
        <FormHeader>
          <FormTitle>
            {t('commentLeaveComment')}
          </FormTitle>
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
            <Input 
              name='advantages'
              label={t('commentAdvantages')}
              value={commentData.advantages}
              onChange={handleCommentDataChange}
            />
            <Input 
              name='disadvantages'
              label={t('commentDisadvantages')}
              value={commentData.disadvantages}
              onChange={handleCommentDataChange}
            />
            <TextArea 
              name='comment'
              label={t('commentTextComment')}
              value={commentData.comment}
              onChange={handleCommentDataChange}
            />
          </Inputs>
          <SubmitBtn type='submit'>
            {t('commentBtnSubmit')}
          </SubmitBtn>
        </CommentForm>
      </Modal>
    </>
  );
};

export default AddCommentForm;