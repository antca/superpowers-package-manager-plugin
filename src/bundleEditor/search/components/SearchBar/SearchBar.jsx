import React, { Component, PropTypes as T } from 'react';
import { Input } from 'react-bootstrap';

class SearchBar extends Component {
  static propTypes = {
    i18n: T.func.isRequired,
    onInputChange: T.func.isRequired,
    onKeyPress: T.func.isRequired,
    searchBarContent: T.string.isRequired,
  };

  componentDidMount() {
    this.refs.textbox.getInputDOMNode().select();
  }

  render() {
    const { i18n, searchBarContent, onInputChange, onKeyPress } = this.props;
    return (
       <Input
         onChange={onInputChange}
         onKeyPress={onKeyPress}
         placeholder={i18n('bundleEditor:search.searchBar.placeholder')}
         ref='textbox'
         type='text'
         value={searchBarContent}
       />
    );
  }
}

export default SearchBar;
