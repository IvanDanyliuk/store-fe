import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import '../../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

import slide1 from '../assets/img/slider/slide_1.png';
import slide2 from '../assets/img/slider/slide_2.png';
import slide3 from '../assets/img/slider/slide_3.png';
import ProductList from '../components/products/ProductList';


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
    </Content>
  );
};

export default Home;