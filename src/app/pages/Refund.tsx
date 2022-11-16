import React from 'react';
import styled from 'styled-components'
import tw from 'twin.macro';
import { useTranslation } from 'react-i18next';


const Container = styled.div`
  ${tw`
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

const PageTopText = styled.p`
  ${tw`
    mb-2
    text-lg
  `}
`;

const PageBottomText = styled.p``;

const RefundPolicyList = styled.ul`
  ${tw`
    mt-3
    mb-3
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

const ListItemText = styled.p``;


const Refund: React.FC = () => {
  const { t } = useTranslation(['refund']);

  return (
    <Container>
      <Title>{t('pageTitle')}</Title>
      <PageTopText>
        {t('pageTopText')}
      </PageTopText>
      <PageBottomText>
        {t('pageBottomText')}
      </PageBottomText>
      <RefundPolicyList>
        <ListItem>
          <ListItemTitle>
            {t('returnProductTitle1')}
          </ListItemTitle>
          <ListItemText>
            {t('returnProductText1')}
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemTitle>
            {t('returnProductTitle2')}
          </ListItemTitle>
          <ListItemText>
            {t('returnProductText2')}
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemTitle>
            {t('returnProductTitle3')}
          </ListItemTitle>
          <ListItemText>
            {t('returnProductText3')}
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemTitle>
            {t('returnProductTitle4')}
          </ListItemTitle>
          <ListItemText>
            {t('returnProductText4')}
          </ListItemText>
        </ListItem>
      </RefundPolicyList>
    </Container>
  );
};

export default Refund;