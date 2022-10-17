import React, { SyntheticEvent, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import Modal from 'react-modal';
import StarRating from 'react-star-rate';
import { useMediaQuery } from 'react-responsive';
import { SCREENS } from '../../services/screens';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { isCommentDataValid } from '../../helpers/formValidation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../features/store';
import FormErrorMessage from '../ui/FormErrorMessage';
import { createReview } from '../../features/product/asyncActions';
import { selectProduct } from '../../features/product/selectors';
import { selectUser } from '../../features/user/selectors';


Modal.setAppElement('#root');

const CommentBtn = styled.button`
  ${tw`
    pt-3
    pb-3
    pl-8
    pr-8
    md:pt-1
    md:pb-1
    md:pl-4
    md:pr-4
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

const SubmitBtn = styled.button`
  background: rgb(43, 212, 161);
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
      dispatch(createReview({
        ...commentData,
        productId: product?._id!,
        userFirstName: user?.firstName!,
        userLastName: user?.lastName!,
        userEmail: user?.email!,
        userAvatarUrl: user?.avatarUrl!,
        likes: 0,
        dislikes: 0,
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
      background: 'rgb(255, 255, 255',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      background: 'rgba(141, 141, 141, .6',
    }
  };

  return (
    <>
      <CommentBtn onClick={handleOpenModal}>Comment</CommentBtn>
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
          <SubmitBtn type='submit'>Submit</SubmitBtn>
        </CommentForm>
      </Modal>
    </>
  );
};

export default AddCommentForm;