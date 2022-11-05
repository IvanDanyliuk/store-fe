import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';
import { SCREENS } from '../../services/screens';
import tw from 'twin.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';


interface IAcceptPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
};

const CloseBtn = styled.button`
  ${tw`
    absolute
    top-2
    right-4
    text-xl
  `}
`;

const Message = styled.div`
  ${tw`
    pt-6
    pb-6
    text-lg
    text-center
    font-semibold
  `}
`;

const AcceptPaymentModal: React.FC<IAcceptPaymentModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation(['modals']);
  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

  const styles = {
    content: {
      width: isMobile ? '90%' : '350px',
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
      zIndex: '500',
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={styles}
    >
      <CloseBtn onClick={onClose}>
        <FontAwesomeIcon icon={faXmark} />
      </CloseBtn>
      <Message>
        {t('paymentMessage')}
      </Message>
    </Modal>
  );
};

export default AcceptPaymentModal;