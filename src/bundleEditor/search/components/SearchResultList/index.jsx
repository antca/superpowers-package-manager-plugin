import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';

import SearchResultList from './SearchResultList';

@connect(
  ({ search }) => search
)
@autobind
class SearchResultListContainer extends Component {
  static propTypes = {
    onResultSelect: T.func.isRequired,
    result: T.object,
  };

  render() {
    return (
      <SearchResultList {...this.props} {...this.state}/>
    );
  }
}

export default SearchResultListContainer;
