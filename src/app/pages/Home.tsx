import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';
import '../../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel'; 
import { useTranslation } from 'react-i18next';
import { v4 as uuid } from 'uuid';
import background from '../assets/img/liquid-cheese.svg'
import ProductList from '../components/products/ProductList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { AppDispatch } from '../features/store';
import { getTopProducts } from '../features/product/asyncActions';
import { selectProducts, selectProductStatus } from '../features/product/selectors';
import { PRODUCTS_PER_PAGE } from '../services/constants';
import { SUCCESS_COLOR } from '../services/constants';
import { selectGalleryImages, selectGalleryStatus } from '../features/gallery/selectors';
import { getGalleryImages } from '../features/gallery/asyncActions';
import Loader from '../components/ui/Loader';


const Content = styled.div`
  ${tw`
    w-full
    bg-white
  `}
`;

const PageSection = styled.section`

  ${tw`
    pt-6
    pb-3
    flex
    flex-col
    items-center
  `}
`;

const PageTitle = styled.h3`
  ${tw`
    mb-5
    text-2xl
    font-bold
  `}
`;

const SubscriptionContainer = styled.div`
  background-image: url(${background});
  background-size: cover;
  ${tw`
    pt-20
    pb-16
    pl-3
    pr-3
    w-full
    flex
    justify-end
  `}
`;

const SubscriptionInfo = styled.div`
  ${tw`
    md:mr-6
    md:w-1/2
  `}
`;

const SubscriptionTitle = styled.h5`
  ${tw`
    text-4xl
    md:text-5xl
  `}
`;

const SubscriptionText = styled.p`
  ${tw`
    mt-3
    mb-3
    text-xl
    md:text-2xl
  `}
`;

const SubscriptionForm = styled.form``;

const Input = styled.input`
  ${tw`
    pl-5
    pr-3
    w-5/6
    md:w-96
    h-12
    md:h-10
    text-gray-600
    rounded-l-3xl
    focus:outline-none
  `}
`;

const SubmitBtn = styled.button`
  color: ${SUCCESS_COLOR};
  ${tw`
    w-1/6
    h-12
    md:h-10
    text-lg
    bg-white
    hover:bg-gray-100
    rounded-r-3xl
    transition
    ease-in
  `}
`;


const Home: React.FC = () => {
  const { t } = useTranslation(['home']);
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectProducts);
  const productsLoadingStatus = useSelector(selectProductStatus);
  const galleryImages = useSelector(selectGalleryImages);
  const galleryLoadingStatus = useSelector(selectGalleryStatus);

  useEffect(() => {
    dispatch(getTopProducts(PRODUCTS_PER_PAGE));
    dispatch(getGalleryImages());
  }, []);

  return (
    <Content>
      {
        galleryLoadingStatus === 'succeeded' ? (
          <Carousel 
            axis='horizontal' 
            autoPlay 
            showArrows 
            infiniteLoop 
            showThumbs={false}
          >
            {galleryImages.map(image => (
              <div key={uuid()}>
                <img data-testid='galleryImage' src={image.url} alt={image._id} />
              </div>
            ))}
          </Carousel>
        ) : (
          <Loader />
        )
      }
      <PageSection>
        <PageTitle>{t('popular')}</PageTitle>
        {
          productsLoadingStatus === 'succeeded' ? (
            <ProductList products={products} />
          ) : (
            <Loader />
          )
        }
      </PageSection>
      <PageSection>
        <SubscriptionContainer>
          <SubscriptionInfo>
            <SubscriptionTitle>{t('subscriptionTitle')}</SubscriptionTitle>
            <SubscriptionText>
              {t('subscriptionText')}
            </SubscriptionText>
            <SubscriptionForm>
              <Input type='email' />
              <SubmitBtn>
                <FontAwesomeIcon icon={faCheck} />
              </SubmitBtn>
            </SubscriptionForm>
          </SubscriptionInfo>
        </SubscriptionContainer>
      </PageSection>
    </Content>
  );
};

export default Home;