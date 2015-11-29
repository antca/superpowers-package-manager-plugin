import React, { PropTypes as T, Component } from 'react';
import { connect } from 'react-redux';
import { updateSearchBarContent, searchPackage } from '../actions';

class SearchBar extends Component {
  static propTypes = {
    onContentChange: T.func.isRequired,
    onSeachButtonClick: T.func.isRequired,
    searchBarContent: T.string.isRequired,
  }

  render() {
    const {
      onSeachButtonClick,
      onContentChange,
      searchBarContent,
    } = this.props;
    return (
      <div className='SearchBar'>
        <input
          onChange={({ target }) => onContentChange(target.value)}
          placeholder='Search on npm...'
          value={searchBarContent}
        />
        <button onClick={() => onSeachButtonClick(searchBarContent)} >
          {'Search'}
        </button>
      </div>
    );
  }
}

export default connect(
  ({ search }) => ({
    searchBarContent: search.searchBarContent,
  }),
  {
    onContentChange: updateSearchBarContent,
    onSeachButtonClick: searchPackage,
  }
)(SearchBar);
