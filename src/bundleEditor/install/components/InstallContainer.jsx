import React, { PropTypes as T, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectVersion, updateBinding, addBinding, deleteBinding } from '../../../data/actions';
import {
  Input,
  ListGroup,
  ListGroupItem,
  Glyphicon,
  Panel,
  Button,
} from 'react-bootstrap';

const VersionSelect = ({ versions, onSelectVersion, value, packageName }) =>
  <Input
    bsSize='small'
    label='Version'
    onChange={({ target }) => onSelectVersion(packageName, target.value)}
    type='select'
    value={value}
  >
    {Object.keys(versions)
      .reverse()
      .map((version) =>
        <option key={version}>{version}</option>
      )}
  </Input>;

const Binding = ({ moduleName, binding, bindingId, onChangeBinding, onDeleteBinding }) =>
  <ListGroupItem>
    <div style={{ paddingBottom: '10px', textAlign: 'right' }}>
      <Button bsSize='xsmall' bsStyle={'danger'} onClick={() => onDeleteBinding(moduleName, bindingId)}>
        <Glyphicon glyph='remove'/>
      </Button>
    </div>
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
    <div style={{ textAlign: 'center' }}><Glyphicon glyph='arrow-down'/></div>
    <Input
      addonBefore={'Sup.npm.'}
      onChange={({ target }) => onChangeBinding(moduleName, bindingId, {
        ...binding,
        propertyName: target.value,
      })}
      standalone
      type='text'
      value={binding.propertyName}
    />
  </ListGroupItem>;

const Bindings = ({ moduleName, bindings, onChangeBinding, onAddBinding, onDeleteBinding }) =>
  <div>
    <label>{'Bindings'}</label>
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

class InstallContainer extends Component {
  static propTypes = {
    dependency: T.object.isRequired,
    onAddBinding: T.func.isRequired,
    onChangeBinding: T.func.isRequired,
    onDeleteBinding: T.func.isRequired,
    onSelectVersion: T.func.isRequired,
    packageInfo: T.object,
    selectedVersion: T.string,
  }
  render() {
    const {
      packageInfo,
      onSelectVersion,
      onAddBinding,
      onChangeBinding,
      onDeleteBinding,
      dependency: {
        version,
        bindings,
      },
    } = this.props;
    if(!packageInfo) {
      return null;
    }
    const {
      versions,
      name,
    } = packageInfo;
    return (
      <div>
        <h2>{name}</h2>
        <form>
          <VersionSelect
            onSelectVersion={onSelectVersion}
            packageName={name}
            value={version}
            versions={versions}
          />
          <Bindings
            bindings={bindings}
            moduleName={name}
            onAddBinding={onAddBinding}
            onChangeBinding={onChangeBinding}
            onDeleteBinding={onDeleteBinding}
          />
        </form>
      </div>
    );
  }
}

export default connect(
  ({ data, view }) => ({
    packageInfo: view.packageInfo,
    dependency: data.dependencies[view.packageInfo.name],
  }),
  (dispatch, { remoteDispatch }) => bindActionCreators({
    onSelectVersion: selectVersion,
    onAddBinding: addBinding,
    onChangeBinding: updateBinding,
    onDeleteBinding: deleteBinding,
  }, remoteDispatch),
)(InstallContainer);
