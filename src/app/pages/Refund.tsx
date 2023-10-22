import React from 'react';
import styled from 'styled-components'
import tw from 'twin.macro';
import { useTranslation } from 'react-i18next';


const Container = styled.div`
  ${tw`
    px-3
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

const PageTopText = styled.p`
  ${tw`
    mb-2
    text-lg
  `}
`;

const RefundPolicyList = styled.ul`
  ${tw`
    my-3
  `}
`;

const ListItem = styled.li`
  ${tw`
    mt-3
  `}
`;

const ListItemTitle = styled.div`
  ${tw`
    font-semibold
  `}
`;


const Refund: React.FC = () => {
  const { t } = useTranslation(['refund']);

  return (
    <Container>
      <Title>{t('pageTitle')}</Title>
      <PageTopText>
        {t('pageTopText')}
      </PageTopText>
      <p>
        {t('pageBottomText')}
      </p>
      <RefundPolicyList>
        <ListItem>
          <ListItemTitle>
            {t('returnProductTitle1')}
          </ListItemTitle>
          <p>
            {t('returnProductText1')}
          </p>
        </ListItem>
        <ListItem>
          <ListItemTitle>
            {t('returnProductTitle2')}
          </ListItemTitle>
          <p>
            {t('returnProductText2')}
          </p>
        </ListItem>
        <ListItem>
          <ListItemTitle>
            {t('returnProductTitle3')}
          </ListItemTitle>
          <p>
            {t('returnProductText3')}
          </p>
        </ListItem>
        <ListItem>
          <ListItemTitle>
            {t('returnProductTitle4')}
          </ListItemTitle>
          <p>
            {t('returnProductText4')}
          </p>
        </ListItem>
      </RefundPolicyList>
    </Container>
  );
};

export default Refund;