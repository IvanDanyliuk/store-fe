import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';
import { storage } from '../../../firebase';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { SCREENS } from '../../services/screens';
import { AppDispatch } from '../../features/store';
import { selectUser } from '../../features/user/selectors';
import Button from '../ui/Button';
import { ButtonColor, ButtonType } from '../../../types/types';
import { updateUser } from '../../features/user/asyncActions';


Modal.setAppElement('#root');

const FormHeader = styled.div`
  ${tw`
    mb-4
    flex
    justify-center
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

const Form = styled.form`
  ${tw`
    flex
    flex-col
    items-center
  `}
`;

const Input = styled.input`
  ${tw`
    mb-2
    p-1
    w-full
    border
    rounded
  `}
`;

const UpdateAvatarModal: React.FC = () => {
  const { t } = useTranslation(['modals']);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

  const token = localStorage.getItem('profile') && JSON.parse(localStorage.getItem('profile') || '').token;

  const [isOpen, setIsOpen] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [file, setFile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState('');

  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };

  const handleImageChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const uploadImage = (file: any) => {
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadData = uploadBytesResumable(storageRef, file);

    uploadData.on('state_changed', 
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgressPercent(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadData.snapshot.ref).then((downloadUrl) => {
          setAvatarUrl(downloadUrl);
        });
      }
    );
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    if(file) {
      uploadImage(file);
      setFile(null);
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

  useEffect(() => {
    if(avatarUrl) {
      dispatch(updateUser({
        id: user!._id!,
        userData: { ...user!, avatarUrl }
      }));
      localStorage.setItem('profile', JSON.stringify({ token, result: { ...user!, avatarUrl } }));
    }
    setAvatarUrl('');
  }, [avatarUrl]);

  return (
    <>
      <Button 
        type={ButtonType.Button} 
        color={ButtonColor.Success} 
        onClick={handleOpenModal}
      >
        {t('updateAvatarTitle')}
      </Button>
      <Modal
        isOpen={isOpen}
        onRequestClose={handleOpenModal}
        style={styles}
      >
        <FormHeader>
          <CloseBtn onClick={handleOpenModal}>
            <FontAwesomeIcon icon={faXmark} />
          </CloseBtn>
        </FormHeader>
        <Form onSubmit={handleFormSubmit}>
          <Input type='file' onChange={handleImageChange} />
          <Button 
            type={ButtonType.Submit} 
            color={ButtonColor.Success}
          >
            {t('updateAvatarSubmitBtn')}
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateAvatarModal;