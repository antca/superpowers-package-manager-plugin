import React, { Component, PropTypes as T } from 'react';
import autobind from 'autobind-decorator';

import SearchBar from '../SearchBar';
import SearchResultList from '../SearchResultList';

const ARROW_UP_KEY = 38;
const ARROW_DOWN_KEY = 40;
const ENTER_KEY = 13;
const DECREMENT_INDEX = -1;
const INCREMENT_INDEX = +1;

@autobind
class SearchBody extends Component {
  static propTypes = {
    i18n: T.func.isRequired,
    onArrowKeySelect: T.func.isRequired,
    onConfirm: T.func.isRequired,
    result: T.object,
    searchBarContent: T.string.isRequired,
    selectedItemIndex: T.number,
  };

  handleKeyDown(event) {
    const { which } = event;
    const {
      onArrowKeySelect,
      onConfirm,
      selectedItemIndex,
      result,
      searchBarContent,
    } = this.props;
    if(which === ARROW_UP_KEY || which === ARROW_DOWN_KEY) {
      event.preventDefault();
      return onArrowKeySelect(which === ARROW_UP_KEY ? DECREMENT_INDEX : INCREMENT_INDEX);
    }
    if(which === ENTER_KEY) {
      if(selectedItemIndex !== null) {
        return onConfirm(result.results[selectedItemIndex].name);
      }
      return onConfirm(searchBarContent);
    }
  }

  render() {
    const { onConfirm, i18n } = this.props;
    return (
      <div onKeyDown={this.handleKeyDown}>
        <SearchBar i18n={i18n} />
        <SearchResultList onResultSelect={onConfirm}/>
      </div>
    );
  }
}

export default SearchBody;
