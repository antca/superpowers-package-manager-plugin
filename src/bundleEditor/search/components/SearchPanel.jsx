import React, { PropTypes as T, Component } from 'react';
import { connect } from 'react-redux';

import SearchBar from './SearchBar';
import SearchResultList from './SearchResultList';

const ErrorDisplay = ({ error }) =>
  <div style={{ color: 'red' }}>
   <h1>{'ERROR'}</h1>
   <p>{error.message}</p>
  </div>;

class SearchPanel extends Component {
  static propTypes = {
    error: T.instanceOf(Error),
  }
  render() {
    const { error } = this.props;
    return (
      <div>
        <SearchBar/>
        {error ? <ErrorDisplay error={error}/> : null}
        <SearchResultList/>
      </div>
    );
  }
}

export default connect(({ search: { error } }) => ({ error }))(SearchPanel);
