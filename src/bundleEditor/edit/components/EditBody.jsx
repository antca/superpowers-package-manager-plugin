import React, { PropTypes as T } from 'react';
import {
  Glyphicon,
  Button,
  ButtonGroup,
} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  selectVersion,
  updateBinding,
  addBinding,
  deleteBinding,
  addDependency,
  removeDependency,
} from '../../../data/actions';

import VersionSelect from './VersionSelect';
import Bindings from './Bindings';

const propTypes = {
  dependencies: T.object.isRequired,
  i18n: T.func.isRequired,
  onAddBinding: T.func.isRequired,
  onChangeBinding: T.func.isRequired,
  onDeleteBinding: T.func.isRequired,
  onRemoveDependency: T.func.isRequired,
  onResetBindings: T.func.isRequired,
  onSelectVersion: T.func.isRequired,
  packageInfo: T.object,
};

function EditBody({
  packageInfo,
  onResetBindings,
  onSelectVersion,
  onAddBinding,
  onChangeBinding,
  onDeleteBinding,
  onRemoveDependency,
  dependencies,
  i18n,
}) {
  if(!packageInfo || !dependencies[packageInfo.name]) {
    return <noscript/>;
  }
  const {
    versions,
    name,
  } = packageInfo;
  const {
    version,
    bindings,
  } = dependencies[name];
  return (
    <div>
      <h2>{name}</h2>
        <form>
          <VersionSelect
            label={i18n('bundleEditor:edit.labels.version')}
            onSelectVersion={onSelectVersion}
            packageName={name}
            value={version}
            versions={versions}
          />
          <Bindings
            bindings={bindings}
            label={i18n('bundleEditor:edit.labels.bindings')}
            moduleName={name}
            onAddBinding={onAddBinding}
            onChangeBinding={onChangeBinding}
            onDeleteBinding={onDeleteBinding}
          />
            <ButtonGroup justified style={{ marginTop: '0.6em' }}>
              <ButtonGroup>
                <Button bsStyle='info' onClick={() => onResetBindings(packageInfo)}>
                  {i18n('bundleEditor:edit.buttons.reset')}<Glyphicon glyph='repeat' style={{ marginLeft: '0.3em' }}/>
                </Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button bsStyle='danger' onClick={() => onRemoveDependency(name)}>
                  {i18n('bundleEditor:edit.buttons.remove')}<Glyphicon glyph='trash' style={{ marginLeft: '0.3em' }}/>
                </Button>
              </ButtonGroup>
            </ButtonGroup>
        </form>
    </div>
  );
}

Object.assign(EditBody, { propTypes });

export { EditBody };
export default connect(
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
)(EditBody);
