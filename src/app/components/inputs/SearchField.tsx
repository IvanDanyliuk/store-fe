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


const SearchForm = styled.form`
  ${tw`
    my-2
    md:my-2
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
    px-3
    rounded-l-full
    focus:outline-none
  `}
`;

const SearchBtn = styled.button`
  ${tw`
    h-8
    px-3
    rounded-r-full
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
    <div>
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
    </div>
  );
};

export default SearchField;