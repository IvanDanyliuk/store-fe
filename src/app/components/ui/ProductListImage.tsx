import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';


interface IProductListImage {
  url: string;
  altText: string;
}

const ImageContainer = styled.div`
  ${tw`
    mr-3
    w-2/6
    md:w-10
    h-10
    flex
    justify-center
    items-center
    text-xs
  `}
`;

const Image = styled.img`
  max-height: 100%;
  ${tw`
    inline-block
  `}
`;


const ProductListImage: React.FC<IProductListImage> = ({ url, altText }) => {
  return (
    <ImageContainer>
      <Image src={url} alt={altText} />
    </ImageContainer>
  );
};

export default ProductListImage;