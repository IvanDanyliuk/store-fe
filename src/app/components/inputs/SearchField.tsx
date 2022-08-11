import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import styled from 'styled-components';


const SearchForm = styled.form`

`;

const SearchInput = styled.input`

`;

const SearchBtn = styled.button`

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
    <form>
      <SearchInput 
        type='text' 
        value={searchValue} 
        onChange={handleSearchValueChange} 
      />
      <SearchBtn onClick={handleSearchSubmit}></SearchBtn>
    </form>
  );
};

export default SearchField;