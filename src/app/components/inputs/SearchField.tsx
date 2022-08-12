import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


const SearchForm = styled.form`
  ${tw`
    w-96
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
  const [searchValue, setSearchValue] = useState('');

  const handleSearchValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  };

  const handleSearchSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log('Search process has been started...');
  }

  return (
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
  );
};

export default SearchField;