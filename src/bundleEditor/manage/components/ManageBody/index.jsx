import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';

import { removeDependency } from '../../../../data/actions';
import { changeActivePanel } from '../../../main/actions';
import { updatePackageInfo } from '../../../view/actions';

import ManageBody from './ManageBody';

@connect(
  ({ data }) => data,
  (dispatch, { remoteDispatch }) => ({
    onButtonClick(packageName, which) {
      if(which === 'delete') {
        return remoteDispatch(removeDependency(packageName));
      }
      return dispatch(updatePackageInfo(packageName)).then(() =>
        dispatch(changeActivePanel(which))
      );
    },
  })
)
@autobind
class ManageBodyContainer extends Component {
  static propTypes = {
    dependencies: T.object.isRequired,
    i18n: T.func.isRequired,
    onButtonClick: T.func.isRequired,
  };

  render() {
    return (
      <ManageBody {...this.props} {...this.state}/>
    );
  }
}

export default ManageBodyContainer;
