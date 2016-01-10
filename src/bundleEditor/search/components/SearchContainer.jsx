import React, { PropTypes as T, Component } from 'react';
import { connect } from 'react-redux';

import SearchBar from './SearchBar';
import SearchResultList from './SearchResultList';
import { changeActivePanel } from '../../main/actions';
import { updatePackageInfo } from '../../view/actions';

class SearchContainer extends Component {
  static propTypes = {
    i18n: T.func.isRequired,
    onView: T.func.isRequired,
  }
  render() {
    const { onView, i18n } = this.props;
    return (
      <div>
        <SearchBar i18n={i18n} onEnterKeyPress={onView}/>
        <SearchResultList onResultSelect={onView}/>
      </div>
    );
  }
}

export default connect(
  null,
  (dispatch) => ({
    onView(packageName) {
      dispatch(updatePackageInfo(packageName)).then(() => {
        dispatch(changeActivePanel('view'));
      });
    },
  })
)(SearchContainer);
