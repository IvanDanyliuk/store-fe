import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';
import { v4 as uuid } from 'uuid';
import { useTranslation } from 'react-i18next';
import { getShippings } from '../features/shipping/asyncActions';
import { selectShippings } from '../features/shipping/selectors';
import { AppDispatch } from '../features/store';
import { IShipping } from '../features/shipping/types';


const Container = styled.div`
  ${tw`
    p-3
    w-full
    flex
    flex-col
  `}
`;

const Title = styled.h3`
  ${tw`
    my-6
    text-xl
    font-semibold
  `}
`;

const SectionTitle = styled.h6`
  ${tw`
    mb-3
    text-lg
    font-semibold
  `}
`;

const SectionContent = styled.ul`
  ${tw`
    mb-6
  `}
`;

const SectionContentItem = styled.li`
  ${tw`
    mb-1
  `}
`;

const Message = styled.div`
  ${tw`
    w-full
    h-full
    flex
    justify-center
    md:justify-start
    items-center
  `}
`;


const DeliveryAndPayment: React.FC = () => {
  const { t } = useTranslation(['deliveryAndPayment']);
  const dispatch = useDispatch<AppDispatch>();
  const shippingMethods = useSelector(selectShippings);

  useEffect(() => {
    dispatch(getShippings());
  }, []);

  return (
    <Container>
      <Title>{t('pageTitle')}</Title>
      <SectionTitle>
        {t('deliveryTitle')}
      </SectionTitle>
      <SectionContent>
        {shippingMethods.length > 0 ? shippingMethods.map((shipping: IShipping) => (
          <SectionContentItem key={uuid()}>
            {shipping.company}
          </SectionContentItem>
        )) : (
          <Message>{t('shippingMethodsNotFoundMessage')}</Message>
        )}
      </SectionContent>
      <SectionTitle>
        {t('paymentMethods')}
      </SectionTitle>
      <SectionContent>
        <SectionContentItem>
          <span>
            {t('paymentCash')}
          </span>
        </SectionContentItem>
        <SectionContentItem>
          <span>
            {t('paymentVisaMasterCard')}
          </span>
        </SectionContentItem>
        <SectionContentItem>
          <span>
            {t('paymentLegalEntities')}
          </span>
        </SectionContentItem>
        <SectionContentItem>
          <span>
            {t('paymentCredit')}
          </span>
        </SectionContentItem>
      </SectionContent>
    </Container>
  );
};

export default DeliveryAndPayment;