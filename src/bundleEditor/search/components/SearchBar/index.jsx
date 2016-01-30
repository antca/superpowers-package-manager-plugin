import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';

import { updateSearchBarContent } from '../../actions';
import SearchBar from './SearchBar';

@connect(
  ({ search }) => search,
  {
    onSearchInputChange: updateSearchBarContent,
  }
)
@autobind
class SearchBarContainer extends Component {
  static propTypes = {
    i18n: T.func.isRequired,
    onSearchInputChange: T.func.isRequired,
    searchBarContent: T.string,
  };

  render() {
    return (
      <SearchBar {...this.props} {...this.state} />
    );
  }
}

export default SearchBarContainer;
