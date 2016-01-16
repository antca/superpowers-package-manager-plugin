import React, { PropTypes as T, Component } from 'react';
import {
  Input,
  ListGroup,
  ListGroupItem,
  Glyphicon,
  Panel,
  Button,
  ButtonGroup,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  selectVersion,
  updateBinding,
  addBinding,
  deleteBinding,
  addDependency,
  removeDependency,
} from '../../../data/actions';

const VersionSelect = ({ versions, onSelectVersion, value, packageName, label }) =>
  <Input
    bsSize='small'
    label={label}
    onChange={({ target }) => onSelectVersion(packageName, target.value)}
    type='select'
    value={value}
  >
    {Object.keys(versions)
      .reverse()
      .map((version) =>
        <option key={version} value={version}>{version}</option>
      )}
  </Input>;

const Binding = ({ moduleName, binding, bindingId, onChangeBinding, onDeleteBinding }) =>
  <ListGroupItem style={{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }}>
    <Input
      addonBefore={`${moduleName}${binding.modulePath === '' ? '' : '/'}`}
      onChange={({ target }) => onChangeBinding(moduleName, bindingId, {
        ...binding,
        modulePath: target.value,
      })}
      standalone
      type='text'
      value={binding.modulePath}
    />
    <div style={{ margin: '0.3em' }}><Glyphicon glyph='arrow-right'/></div>
    <Input
      onChange={({ target }) => onChangeBinding(moduleName, bindingId, {
        ...binding,
        propertyName: target.value,
      })}
      standalone
      style={{ minWidth: '8em' }}
      type='text'
      value={binding.propertyName}
    />
    <Button
      bsSize='xsmall'
      bsStyle={'danger'}
      onClick={() => onDeleteBinding(moduleName, bindingId)}
      style={{ marginLeft: '0.3em' }}
    >
      <Glyphicon glyph='remove'/>
    </Button>
  </ListGroupItem>;

const Bindings = ({ moduleName, bindings, onChangeBinding, onAddBinding, onDeleteBinding, label }) =>
  <div>
    <label>{label}</label>
    <Panel>
      <ListGroup fill>
        {bindings.map((binding, index) =>
          <Binding
            binding={binding}
            bindingId={index}
            key={index}
            moduleName={moduleName}
            onChangeBinding={onChangeBinding}
            onDeleteBinding={onDeleteBinding}
          />)}
        <ListGroupItem>
          <Button block onClick={() => onAddBinding(moduleName)}><Glyphicon glyph='plus-sign'/></Button>
        </ListGroupItem>
      </ListGroup>
    </Panel>
  </div>;

class EditContainer extends Component {
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
    const {
      packageInfo,
      onResetBindings,
      onSelectVersion,
      onAddBinding,
      onChangeBinding,
      onDeleteBinding,
      onRemoveDependency,
      dependencies,
      i18n,
    } = this.props;
    if(!packageInfo || !dependencies[packageInfo.name]) {
      return null;
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
}

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
)(EditContainer);
