import React, { PropTypes as T, Component } from 'react';
import { connect } from 'react-redux';
import { updateSearchBarContent, searchPackage } from '../actions';
import AssetManager from '../../AssetManager';

const ErrorDisplay = ({ error }) =>
  <div style={{ color: 'red'}}>
   <h1>{'ERROR'}</h1>
   <p>{error.message}</p>
  </div>;

class SearchBar extends Component {
  static propTypes = {
    asset: T.instanceOf(AssetManager).isRequired,
    onContentChange: T.func.isRequired,
    onSeachButtonClick: T.func.isRequired,
    search: T.object.isRequired,
  }

  render() {
    const {
      asset,
      search: {
        error,
        result,
        searchBarContent,
      },
      onSeachButtonClick,
      onContentChange,
    } = this.props;
    return (
      <div className='SearchBar'>
        <input
          onChange={({ target }) => onContentChange(target.value)}
          placeholder='Search on npm...'
          value={searchBarContent}
        />
        <button
          disabled={!result && !error}
          onClick={() => onSeachButtonClick(searchBarContent)}
        >
          {'Search'}
        </button>
        {error ? <ErrorDisplay error={error} /> : null}
      </div>
    );
  }
}

export default connect(
  ({ search }) => ({
    search,
  }),
  {
    onContentChange: updateSearchBarContent,
    onSeachButtonClick: searchPackage,
  }
)(SearchBar);
