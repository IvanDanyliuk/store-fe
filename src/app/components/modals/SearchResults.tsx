import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { v4 as uuid } from 'uuid';
import Modal from 'react-modal';
import { useMediaQuery } from 'react-responsive';
import { ISearchResultsProps } from '../../../types/types';
import { SCREENS } from '../../services/screens';
import ProductListImage from '../ui/ProductListImage';


Modal.setAppElement('#root');

const Container = styled.div`
  ${tw`
    w-full
    flex
    flex-col
    justify-center
    items-center
  `}
`;

const SearchResultsList = styled.ul`
  flex: 1;
  ${tw`
    top-8
  `}
`;

const SearchItem = styled.li`
  ${tw`
    pt-2
    pb-2
    pl-3
    pr-3
    border-b
  `}
`;

const ResultLink = styled(Link)`
  ${tw`
    flex
    items-center
  `}
`;

const ProductTitle = styled.span`
  ${tw`
    ml-3
  `}
`;

const NoDataMessage = styled.div`
  ${tw`
    w-full
    text-center
  `}
`;


const SearchResults: React.FC<ISearchResultsProps> = ({ isOpen, onClose, products }) => {
  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

  const styles = {
    content: {
      width: isMobile ? '90%' : '900px',
      height: '90%',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      background: 'rgb(255, 255, 255',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      background: 'rgba(141, 141, 141, .6',
      zIndex: '500',
    }
  };

  return (
    <Container>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={styles}
      >
        {
          products.length > 0 ? (
            <SearchResultsList>
              {
                products.map(product => (
                  <SearchItem key={uuid()}>
                    <ResultLink 
                      to={`/products/${product.category.main.url}/${product._id}`} 
                      onClick={onClose}
                    >
                      <ProductListImage url={product.image} altText={product._id} />
                      <ProductTitle>
                        {product.title}
                      </ProductTitle>
                    </ResultLink>
                  </SearchItem>
                ))
              }
            </SearchResultsList>
            ) : (
              <NoDataMessage>Can't find any product</NoDataMessage>
            )
        }
      </Modal>
    </Container>
  );
};

export default SearchResults;