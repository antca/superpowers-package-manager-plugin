import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { Input } from 'react-bootstrap';

import { updateSearchBarContent } from '../actions';

class SearchBar extends Component {
  static propTypes = {
    i18n: T.func.isRequired,
    onSearchInputChange: T.func.isRequired,
    searchBarContent: T.string.isRequired,
  };

  componentDidMount() {
    this.refs.textbox.getInputDOMNode().select();
  }

  render() {
    const { i18n, searchBarContent, onSearchInputChange } = this.props;
    return (
       <Input
         onChange={({ target }) => onSearchInputChange(target.value)}
         placeholder={i18n('bundleEditor:search.searchBar.placeholder')}
         ref='textbox'
         type='text'
         value={searchBarContent}
       />
    );
  }
}

export { SearchBar };
export default connect(
  ({ search }) => search,
  {
    onSearchInputChange: updateSearchBarContent,
  }
)(SearchBar);
