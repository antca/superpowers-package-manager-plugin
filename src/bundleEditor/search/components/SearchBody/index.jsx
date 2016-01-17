import React, { PropTypes as T, Component } from 'react';
import { connect } from 'react-redux';

import { changeActivePanel } from '../../../main/actions';
import { updatePackageInfo } from '../../../view/actions';
import SearchBody from './SearchBody';

@connect(
  null,
  (dispatch) => ({
    onView(packageName) {
      dispatch(updatePackageInfo(packageName)).then(() => {
        dispatch(changeActivePanel('view'));
      });
    },
  })
)
class SearchBodyContainer extends Component {
  static propTypes = {
    i18n: T.func.isRequired,
    onView: T.func.isRequired,
  };

  render() {
    return (
      <SearchBody {...this.props} {...this.state}/>
    );
  }
}

export default SearchBodyContainer;
