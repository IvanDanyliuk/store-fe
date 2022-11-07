import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';


const Container = styled.div`
  ${tw`
    pt-3
    pb-3
  `}
`;

const Title = styled.h2`
  ${tw`
    text-2xl
    font-bold
  `}
`;

const Countries = styled.ul`
  ${tw`
    w-full
    flex
    flex-wrap
  `}
`;

const Country = styled.li`
  ${tw`
    mb-7
    w-1/3
  `}
`;

const CountryName = styled.h3`
  ${tw`
    mt-6
    text-xl
    font-semibold
  `}
`;

const CountryAddress = styled.div`
  ${tw`
    mt-2
  `}
  svg {
    color: #30D5F9;
  }
`;

const Address = styled.span`
  ${tw`
    ml-2
  `}
`;

const Phone = styled.p`
  ${tw`

  `}
`;

const Contacts: React.FC = () => {
  const { t } = useTranslation(['contacts']);

  return (
    <Container>
      <Title>
        {t('title')}
      </Title>
      <Countries>
        <Country>
          <CountryName>
            {t('ukraine')}
          </CountryName>
          <CountryAddress>
            <FontAwesomeIcon icon={faLocationDot} />
            <Address>
              {t('ukraineAddress')}
            </Address>
          </CountryAddress>
          <Phone>
            {t('ukrainePhone')}
          </Phone>
        </Country>
        <Country>
          <CountryName>
            {t('poland')}
          </CountryName>
          <CountryAddress>
            <FontAwesomeIcon icon={faLocationDot} />
            <Address>
              {t('polandAddress')}
            </Address>
          </CountryAddress>
          <Phone>
            {t('polandPhone')}
          </Phone>
        </Country>
        <Country>
          <CountryName>
            {t('germany')}
          </CountryName>
          <CountryAddress>
            <FontAwesomeIcon icon={faLocationDot} />
            <Address>
              {t('germanyAddress')}
            </Address>
          </CountryAddress>
          <Phone>
            {t('germanyPhone')}
          </Phone>
        </Country>
        <Country>
          <CountryName>
            {t('lithuania')}
          </CountryName>
          <CountryAddress>
            <FontAwesomeIcon icon={faLocationDot} />
            <Address>
              {t('lithuaniaAddress')}
            </Address>
          </CountryAddress>
          <Phone>
            {t('lithuaniaPhone')}
          </Phone>
        </Country>
        <Country>
          <CountryName>
            {t('latvia')}
          </CountryName>
          <CountryAddress>
            <FontAwesomeIcon icon={faLocationDot} />
            <Address>
              {t('latviaAddress')}
            </Address>
          </CountryAddress>
          <Phone>
            {t('latviaPhone')}
          </Phone>
        </Country>
        <Country>
          <CountryName>
            {t('estonia')}
          </CountryName>
          <CountryAddress>
            <FontAwesomeIcon icon={faLocationDot} />
            <Address>
              {t('estoniaAddress')}
            </Address>
          </CountryAddress>
          <Phone>
            {t('estoniaPhone')}
          </Phone>
        </Country>
      </Countries>
    </Container>
  );
};

export default Contacts;