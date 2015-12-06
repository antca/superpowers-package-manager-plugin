import React, { PropTypes as T, Component } from 'react';
import { connect } from 'react-redux';
import { Alert, Panel } from 'react-bootstrap';

import SearchBar from './SearchBar';
import SearchResultList from './SearchResultList';

const ErrorDisplay = ({ error }) =>
  <Alert bsStyle='danger'>
    <strong>{error.message}</strong>
  </Alert>;

class SearchContainer extends Component {
  static propTypes = {
    error: T.instanceOf(Error),
  }
  render() {
    const { error } = this.props;
    return (
      <div>
        <SearchBar/>
        {error ? <ErrorDisplay error={error}/> : <SearchResultList/>}
      </div>
    );
  }
}

export default connect(({ search: { error } }) => ({ error }))(SearchContainer);
