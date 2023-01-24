import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { AppDispatch } from '../../features/store';
import { findProducts } from '../../features/product/asyncActions';
import { selectSearchData } from '../../features/product/selectors';
import SearchResults from '../modals/SearchResults';
import { clearSearchData } from '../../features/product/reducers';


const Container = styled.div``;

const SearchForm = styled.form`
  ${tw`
    mt-2
    mb-2
    md:mt-0
    md:mb-0
    w-full
    md:w-96
    flex
  `}
`;

const SearchInput = styled.input`
  font-size: 12px;
  ${tw`
    w-full
    h-8
    pl-3
    pr-3
    rounded-l-xl
    focus:outline-none
  `}
`;

const SearchBtn = styled.button`
  ${tw`
    h-8
    pl-2
    pr-2
    rounded-r-xl
    bg-white
    text-gray-400
    hover:text-gray-600
    transition
    ease-in
    delay-100
  `}
`;


const SearchField: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [searchValue, setSearchValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const searchData = useSelector(selectSearchData);

  const handleSearchValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  };

  const handleSearchResultsClose = () => {
    setIsOpen(false);
    dispatch(clearSearchData());
  };

  const handleSearchSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if(searchValue) {
      dispatch(findProducts(searchValue));
      setSearchValue('');
      setIsOpen(true);
    }
  };

  return (
    <Container>
      <SearchForm>
        <SearchInput 
          type='text' 
          value={searchValue} 
          onChange={handleSearchValueChange} 
        />
        <SearchBtn onClick={handleSearchSubmit}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </SearchBtn>
      </SearchForm>
      {
        searchData && (
          <SearchResults 
            isOpen={isOpen} 
            onClose={handleSearchResultsClose} 
            products={searchData} 
          />
        )
      }
    </Container>
  );
};

export default SearchField;