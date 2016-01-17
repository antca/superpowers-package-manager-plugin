import React from 'react';
import { Input } from 'react-bootstrap';

function SearchBar({ i18n, searchBarContent, onSearchInputChange, onKeyPress }) {
  return (
    <div>
       <Input
         onChange={onSearchInputChange}
         onKeyPress={onKeyPress}
         placeholder={i18n('bundleEditor:search.searchBar.placeholder')}
         type='text'
         value={searchBarContent}
       />
    </div>
  );
}

export default SearchBar;
