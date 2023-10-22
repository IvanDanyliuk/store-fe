import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { PRIMARY_COLOR } from '../services/constants';


const Container = styled.div`
  ${tw`
    px-3
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
    w-1/2
    md:w-1/3
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
    color: ${PRIMARY_COLOR};
  }
`;

const Address = styled.span`
  ${tw`
    ml-2
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
          <p>
            {t('ukrainePhone')}
          </p>
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
          <p>
            {t('polandPhone')}
          </p>
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
          <p>
            {t('germanyPhone')}
          </p>
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
          <p>
            {t('lithuaniaPhone')}
          </p>
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
          <p>
            {t('latviaPhone')}
          </p>
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
          <p>
            {t('estoniaPhone')}
          </p>
        </Country>
      </Countries>
    </Container>
  );
};

export default Contacts;