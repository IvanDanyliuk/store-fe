import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import Modal from 'react-modal';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Button from '../ui/Button';
import { ButtonColor, ButtonType, IDeleteItemModal } from '../../../types/types';
import { SCREENS } from '../../services/screens';
import { BASIC_BACKGROUND_WHITE, MODAL_OVERLAY_COLOR } from '../../services/constants';


if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root');


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

const Message = styled.p`
  ${tw`
    text-center
    text-lg
  `}
`;

const Actions = styled.div`
  button {
    margin-right: 20px;
  }
  ${tw`
    mt-3
    w-full
    flex
    justify-center
  `}
`;


const DeleteItemModal: React.FC<IDeleteItemModal> = ({ deleteHandler, message }) => {
  const { t } = useTranslation(['modals']);

  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

  const handleOpenModal = () => {
    setIsOpen(!isOpen);
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
      <Button 
        type={ButtonType.Button} 
        color={ButtonColor.Danger} 
        onClick={handleOpenModal}
      >
        {t('deleteItemBtn')}
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
        <Message>
          {t(message)}
        </Message>
        <Actions>
          <Button 
            type={ButtonType.Button} 
            color={ButtonColor.Danger} 
            onClick={deleteHandler}
          >
            {t('deleteUserYes')}
          </Button>
          <Button 
            type={ButtonType.Button} 
            color={ButtonColor.Secondary} 
            onClick={handleOpenModal}
          >
            {t('deleteUserNo')}
          </Button>
        </Actions>
      </Modal>
    </>
  );
};

export default DeleteItemModal;