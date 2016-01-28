import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';

import { addDependency } from '../../../../data/actions';
import { changeActivePanel } from '../../../main/actions';
import ViewBody from './ViewBody';

@connect(
  ({ view, data }) => ({
    packageInfo: view.packageInfo,
    dependencies: data.dependencies,
  }),
  (dispatch, { remoteDispatch }) => ({
    onMainButtonClick: (packageInfo) => {
      (packageInfo ? remoteDispatch(addDependency(packageInfo)) : Promise.resolve())
        .then(() =>
          dispatch(changeActivePanel('edit'))
        );
    },
  })
)
@autobind
class ViewBodyContainer extends Component {
  static propTypes = {
    dependencies: T.object,
    i18n: T.func.isRequired,
    onMainButtonClick: T.func.isRequired,
    packageInfo: T.object,
  };

  render() {
    return (
      <ViewBody {...this.props} {...this.state}/>
    );
  }
}

export default ViewBodyContainer;
