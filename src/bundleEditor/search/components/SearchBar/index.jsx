import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';

import { searchPackage } from '../../actions';
import SearchBar from './SearchBar';

const ENTER_KEY_CODE = 13;

@connect(
  ({ search }) => search,
  {
    onContentChange: searchPackage,
  }
)
@autobind
class SearchBarContainer extends Component {
  static propTypes = {
    i18n: T.func.isRequired,
    onContentChange: T.func.isRequired,
    onEnterKeyPress: T.func.isRequired,
    result: T.object,
  };

  constructor(...args) {
    super(...args);
    this.state = {
      searchBarContent: '',
    };
  }

  onSearchInputChange({ target: { value } }) {
    const { onContentChange } = this.props;
    this.setState({
      searchBarContent: value,
    });
    onContentChange(value);
  }

  onKeyPress(e) {
    const { onEnterKeyPress } = this.props;
    const { searchBarContent } = this.state;
    if(e.which === ENTER_KEY_CODE) {
      onEnterKeyPress(searchBarContent);
    }
  }

  render() {
    return (
      <SearchBar
        {...this.props}
        {...this.state}
        onKeyPress={this.onKeyPress}
        onSearchInputChange={this.onSearchInputChange}
      />
    );
  }
}

export default SearchBarContainer;
