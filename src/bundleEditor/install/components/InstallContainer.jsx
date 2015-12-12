import React, { PropTypes as T, Component } from 'react';
import { connect } from 'react-redux';
import { selectVersion } from '../actions';
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
          <option key={version}>{version}</option>)}
  </Input>;

const Binding = ({ moduleName, modulePath, propertyName }) =>
  <ListGroupItem>
    <Input
      addonBefore={moduleName}
      standalone
      type='text'
      value={`/${modulePath}`}
    />
    <div style={{ textAlign: 'center' }}><Glyphicon glyph='arrow-down'/></div>
    <Input
      addonBefore={'Sup.npm.'}
      standalone
      type='text'
      value={propertyName}
    />
  </ListGroupItem>;

const Bindings = ({ moduleName, bindings }) =>
  <div>
    <label>{'Bindings'}</label>
    <Panel>
      <ListGroup fill>
        {bindings.map(({ modulePath, propertyName }, index) =>
          <Binding
            key={index}
            moduleName={moduleName}
            modulePath={modulePath}
            propertyName={propertyName}
          />)}
        <ListGroupItem>
          <Button block><Glyphicon glyph='plus-sign' /></Button>
        </ListGroupItem>
      </ListGroup>
    </Panel>
  </div>;

class InstallContainer extends Component {
  static propTypes = {
    dependency: T.object.isRequired,
    onSelectVersion: T.func.isRequired,
    packageInfo: T.object,
    selectedVersion: T.string,
  }
  render() {
    const {
      packageInfo,
      onSelectVersion,
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
          <VersionSelect onSelectVersion={onSelectVersion} packageName={name} value={version} versions={versions}/>
          <Bindings bindings={bindings} moduleName={name} />
        </form>
      </div>
    );
  }
}

export default connect(
  ({ manage, view }) => ({
    packageInfo: view.packageInfo,
    dependency: manage.dependencies[view.packageInfo.name],
  }),
  {
    onSelectVersion: selectVersion,
  }
)(InstallContainer);
