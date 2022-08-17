import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';


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

const SubTitle = styled.h3`
  ${tw`
    mt-6
    text-xl
    font-semibold
  `}
`;

const Text = styled.p`
  ${tw`

  `}
`;

const Logo = styled.h1`
  color: rgb(63, 197, 255);
  ${tw`
    mt-6
    text-7xl
    font-bold
    text-center
  `}
`;

const KeyIndicators = styled.ul`
  ${tw`
    mt-6
    p-3
    w-full
    flex
    flex-wrap
  `}
`;

const Indicator = styled.li`
  ${tw`
    mb-5
    w-1/2
    flex
    flex-col
  `}
`;

const IndicatorNum = styled.span`
  color: rgb(63, 197, 255);
  ${tw`
    text-2xl
    font-bold
  `}
`;

const IndicatorText = styled.span`
  ${tw`
  
  `}
`;


const About: React.FC = () => {
  return (
    <Container>
      <Title>About Us</Title>
      <SubTitle>Our Plans</SubTitle>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Ipsam temporibus adipisci eum porro laborum officia 
        recusandae placeat dolore aut doloribus, quas culpa 
        nesciunt qui commodi tenetur ipsa. Unde inventore 
        reiciendis est magnam similique voluptatibus quos earum!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Ipsam temporibus adipisci eum porro laborum officia 
        recusandae placeat dolore aut doloribus, quas culpa 
        nesciunt qui commodi tenetur ipsa. Unde inventore 
        reiciendis est magnam similique voluptatibus quos earum!
      </Text>
      <Logo>eStore</Logo>
      <SubTitle>Our Goal Is To Be Useful</SubTitle>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Ipsam temporibus adipisci eum porro laborum officia 
        recusandae placeat dolore aut doloribus, quas culpa 
        nesciunt qui commodi tenetur ipsa. Unde inventore 
        reiciendis est magnam similique voluptatibus quos earum!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Ipsam temporibus adipisci eum porro laborum officia 
        recusandae placeat dolore aut doloribus, quas culpa 
        nesciunt qui commodi tenetur ipsa. Unde inventore 
        reiciendis est magnam similique voluptatibus quos earum!
      </Text>
      <KeyIndicators>
        <Indicator>
          <IndicatorNum>2.3 million</IndicatorNum>
          <IndicatorText>of products available</IndicatorText>
        </Indicator>
        <Indicator>
          <IndicatorNum>777 million</IndicatorNum>
          <IndicatorText>customers visited eStore last year</IndicatorText>
        </Indicator>
        <Indicator>
          <IndicatorNum>80%</IndicatorNum>
          <IndicatorText>of our customers go back</IndicatorText>
        </Indicator>
        <Indicator>
          <IndicatorNum>1.8 million</IndicatorNum>
          <IndicatorText>of visits per day</IndicatorText>
        </Indicator>
      </KeyIndicators>
      <SubTitle>Convenient and Fast Shipping</SubTitle>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Ipsam temporibus adipisci eum porro laborum officia 
        recusandae placeat dolore aut doloribus, quas culpa 
        nesciunt qui commodi tenetur ipsa. Unde inventore 
        reiciendis est magnam similique voluptatibus quos earum!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Ipsam temporibus adipisci eum porro laborum officia 
        recusandae placeat dolore aut doloribus, quas culpa 
        nesciunt qui commodi tenetur ipsa. Unde inventore 
        reiciendis est magnam similique voluptatibus quos earum!
      </Text>
    </Container>
  );
};

export default About;