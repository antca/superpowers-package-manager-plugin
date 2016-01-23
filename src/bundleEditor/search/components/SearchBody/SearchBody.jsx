import React, { Component, PropTypes as T } from 'react';

import SearchBar from '../SearchBar';
import SearchResultList from '../SearchResultList';

const ARROW_UP_KEY = 38;
const ARROW_DOWN_KEY = 40;
const DECREMENT_INDEX = -1;
const INCREMENT_INDEX = +1;

class SearchBody extends Component {
  static propTypes = {
    i18n: T.func.isRequired,
    onArrowKeySelect: T.func.isRequired,
    onView: T.func.isRequired,
  };

  handleKeyDown(event) {
    const { which } = event;
    const { onArrowKeySelect } = this.props;
    if(which === ARROW_UP_KEY || which === ARROW_DOWN_KEY) {
      event.preventDefault();
      onArrowKeySelect(which === ARROW_UP_KEY ? DECREMENT_INDEX : INCREMENT_INDEX);
    }
  }

  render() {
    const { onView, i18n } = this.props;
    return (
      <div onKeyDown={(event) => this.handleKeyDown(event)}>
        <SearchBar i18n={i18n} onEnterKeyPress={onView}/>
        <SearchResultList onResultSelect={onView}/>
      </div>
    );
  }
}

export default SearchBody;
