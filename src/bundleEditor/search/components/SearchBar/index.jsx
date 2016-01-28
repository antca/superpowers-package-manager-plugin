import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';

import { searchPackage } from '../../actions';
import SearchBar from './SearchBar';

const ENTER_KEY_CODE = 13;

@connect(
  ({ search }) => search,
  {
    onSearchInputChange: searchPackage,
  }
)
@autobind
class SearchBarContainer extends Component {
  static propTypes = {
    i18n: T.func.isRequired,
    onEnterKeyPress: T.func.isRequired,
    onSearchInputChange: T.func.isRequired,
  };

  constructor(...args) {
    super(...args);
    this.state = {
      searchBarContent: '',
    };
  }

  onInputChange({ target: { value } }) {
    const { onSearchInputChange } = this.props;
    this.setState({
      searchBarContent: value,
    });
    onSearchInputChange(value);
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
        onInputChange={this.onInputChange}
        onKeyPress={this.onKeyPress}
      />
    );
  }
}

export default SearchBarContainer;
