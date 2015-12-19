import React, { Component } from 'react';

import SearchBar from './SearchBar';
import SearchResultList from './SearchResultList';

class SearchContainer extends Component {
  render() {
    return (
      <div>
        <SearchBar/>
        <SearchResultList/>
      </div>
    );
  }
}

export default SearchContainer;
