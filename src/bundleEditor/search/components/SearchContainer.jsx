import React, { Component } from 'react';
import { connect } from 'react-redux';

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

export default connect(({ search: { error } }) => ({ error }))(SearchContainer);
