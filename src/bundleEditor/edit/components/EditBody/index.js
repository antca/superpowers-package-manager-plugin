import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import autobind from 'autobind-decorator';

import {
  selectVersion,
  updateBinding,
  addBinding,
  deleteBinding,
  addDependency,
  removeDependency,
} from '../../../../data/actions';
import EditBody from './EditBody';

@connect(
  ({ data, view }) => ({
    packageInfo: view.packageInfo,
    dependencies: data.dependencies,
  }),
  (dispatch, { remoteDispatch }) => bindActionCreators({
    onResetBindings: addDependency,
    onRemoveDependency: removeDependency,
    onSelectVersion: selectVersion,
    onAddBinding: addBinding,
    onChangeBinding: updateBinding,
    onDeleteBinding: deleteBinding,
  }, remoteDispatch),
)
@autobind
class EditBodyContainer extends Component {
  static propTypes = {
    dependencies: T.object.isRequired,
    i18n: T.func.isRequired,
    onAddBinding: T.func.isRequired,
    onChangeBinding: T.func.isRequired,
    onDeleteBinding: T.func.isRequired,
    onRemoveDependency: T.func.isRequired,
    onResetBindings: T.func.isRequired,
    onSelectVersion: T.func.isRequired,
    packageInfo: T.object,
    selectedVersion: T.string,
  };

  render() {
    return (
      <EditBody {...this.props} {...this.state}/>
    );
  }
}

export default EditBodyContainer;
