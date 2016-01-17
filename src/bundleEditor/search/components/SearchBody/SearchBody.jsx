import React from 'react';

import SearchBar from '../SearchBar';
import SearchResultList from '../SearchResultList';

function SearchBody({ onView, i18n }) {
  return (
    <div>
      <SearchBar i18n={i18n} onEnterKeyPress={onView}/>
      <SearchResultList onResultSelect={onView}/>
    </div>
  );
}

export default SearchBody;
