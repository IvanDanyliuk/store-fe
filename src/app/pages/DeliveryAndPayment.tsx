import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';
import { v4 as uuid } from 'uuid';
import { useTranslation } from 'react-i18next';
import { getShippings } from '../features/shipping/asyncActions';
import { selectShippings } from '../features/shipping/selectors';
import { AppDispatch } from '../features/store';


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
    mt-6
    mb-6
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

const Text = styled.span``;


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
        {shippingMethods.map(shipping => (
          <SectionContentItem key={uuid()}>
            {shipping.company}
          </SectionContentItem>
        ))}
      </SectionContent>
      <SectionTitle>
        {t('paymentMethods')}
      </SectionTitle>
      <SectionContent>
        <SectionContentItem>
          <Text>
            {t('paymentCash')}
          </Text>
        </SectionContentItem>
        <SectionContentItem>
          <Text>
            {t('paymentVisaMasterCard')}
          </Text>
        </SectionContentItem>
        <SectionContentItem>
          <Text>
            {t('paymentLegalEntities')}
          </Text>
        </SectionContentItem>
        <SectionContentItem>
          <Text>
            {t('paymentCredit')}
          </Text>
        </SectionContentItem>
      </SectionContent>
    </Container>
  );
};

export default DeliveryAndPayment;