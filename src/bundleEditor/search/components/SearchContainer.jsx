import React, { PropTypes as T, Component } from 'react';
import { connect } from 'react-redux';

import { updatePackageInfo } from '../../view/actions';
import { changeActivePanel } from '../../main/actions';
import SearchBar from './SearchBar';
import SearchResultList from './SearchResultList';

class SearchContainer extends Component {
  static propTypes = {
    onView: T.func.isRequired,
  }
  render() {
    const { onView } = this.props;
    return (
      <div>
        <SearchBar onEnterKeyPress={onView} />
        <SearchResultList onResultSelect={onView} />
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
