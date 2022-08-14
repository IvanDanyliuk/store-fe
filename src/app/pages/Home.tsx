import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import '../../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

import slide1 from '../assets/img/slider/slide_1.png';
import slide2 from '../assets/img/slider/slide_2.png';
import slide3 from '../assets/img/slider/slide_3.png';
import background from '../assets/img/liquid-cheese.svg'
import ProductList from '../components/products/ProductList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';


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

const SubscriptionForm = styled.form`
  ${tw`
  
  `}
`;

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
  color: rgb(43, 212, 161);
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
  return (
    <Content>
      <Carousel axis='horizontal' autoPlay showArrows infiniteLoop showThumbs={false}>
        <div>
          <img src={slide1} alt='image_1' />
        </div>
        <div>
          <img src={slide2} alt='image_2' />
        </div>
        <div>
          <img src={slide3} alt='image_3' />
        </div>
      </Carousel>
      <PageSection>
        <PageTitle>Popular Products</PageTitle>
        <ProductList />
      </PageSection>
      <PageSection>
        <SubscriptionContainer>
          <SubscriptionInfo>
            <SubscriptionTitle>Your Subscription</SubscriptionTitle>
            <SubscriptionText>
              The best prices, cool promotions, and personal offers in your newsletter
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