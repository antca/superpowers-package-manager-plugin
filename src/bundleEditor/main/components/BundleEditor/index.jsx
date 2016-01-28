import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';

import { changeActivePanel } from '../../actions';
import BundleEditor from './BundleEditor';

@connect(
  (store) => store,
  {
    onPanelSelect: changeActivePanel,
  },
)
@autobind
class BundleEditorContainer extends Component {
  static propTypes = {
    data: T.object.isRequired,
    i18n: T.func.isRequired,
    main: T.object.isRequired,
    onPanelSelect: T.func.isRequired,
    remoteDispatch: T.func.isRequired,
    search: T.object.isRequired,
    view: T.object.isRequired,
  };
  render() {
    return (
      <BundleEditor {...this.props} {...this.state}/>
    );
  }
}

export default BundleEditorContainer;
