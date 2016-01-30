import React, { PropTypes as T, Component } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';

import { confirmPackage } from '../../actions';
import { selectResultItem } from '../../actions';
import SearchBody from './SearchBody';

@connect(
  ({ search }) => search,
  {
    onConfirm: confirmPackage,
    onArrowKeySelect: selectResultItem,
  },
)
@autobind
class SearchBodyContainer extends Component {
  static propTypes = {
    i18n: T.func.isRequired,
    onConfirm: T.func.isRequired,
  };

  render() {
    return (
      <SearchBody {...this.props} {...this.state}/>
    );
  }
}

export default SearchBodyContainer;
