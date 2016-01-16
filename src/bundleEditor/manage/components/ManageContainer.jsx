import _ from 'lodash';
import React, { PropTypes as T, Component } from 'react';
import { Table, Glyphicon, Button, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';

import { removeDependency } from '../../../data/actions';
import { changeActivePanel } from '../../main/actions';
import { updatePackageInfo } from '../../view/actions';

const [VIEW, EDIT, DELETE] = ['view', 'edit', 'delete'];

function depsArray(dependencies) {
  return _.map(dependencies, (value, key) => Object.assign({}, value, { name: key }));
}

const DependencyEntry = ({ name, version, bindings, onButtonClick }) =>
  <tr>
    <td>{name}</td>
    <td>{version}</td>
    <td style={{ width: '100%' }}>
      {_.map(bindings, (binding) => binding.propertyName).filter((prop) => prop).join(', ')}
    </td>
    <td>
      <ButtonGroup style={{ minWidth: '7em' }}>
        <Button
          bsSize='xsmall'
          bsStyle={'info'}
          onClick={() => onButtonClick(name, VIEW)}
        >
        <Glyphicon glyph='eye-open'/>
        </Button>
        <Button
          bsSize='xsmall'
          bsStyle={'primary'}
          onClick={() => onButtonClick(name, EDIT)}
        >
          <Glyphicon glyph='edit'/>
        </Button>
        <Button
          bsSize='xsmall'
          bsStyle={'danger'}
          onClick={() => onButtonClick(name, DELETE)}
        >
        <Glyphicon glyph='remove'/>
        </Button>
      </ButtonGroup>
    </td>
  </tr>;

class ManageContainer extends Component {
  static propTypes = {
    dependencies: T.object.isRequired,
    i18n: T.func.isRequired,
    onButtonClick: T.func.isRequired,
  };

  render() {
    const {
      dependencies,
      onButtonClick,
      i18n,
    } = this.props;
    if(_.isEmpty(dependencies)) {
      return <h3>{i18n('bundleEditor:manage.emptyBundle')}</h3>;
    }
    return (
      <div>
        <label>{i18n('bundleEditor:manage.labels.dependencies')}</label>
        <Table bordered responsive striped>
          <thead>
            <tr>
              <th>{i18n('bundleEditor:manage.headers.name')}</th>
              <th>{i18n('bundleEditor:manage.headers.version')}</th>
              <th>{i18n('bundleEditor:manage.headers.bindings')}</th>
              <th>{i18n('bundleEditor:manage.headers.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {depsArray(dependencies).map((dependency) =>
              <DependencyEntry
                key={dependency.name}
                onButtonClick={onButtonClick}
                {...dependency}
              />)}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default connect(
  ({ data }) => data,
  (dispatch, { remoteDispatch }) => ({
    onButtonClick(packageName, which) {
      if(which === DELETE) {
        return remoteDispatch(removeDependency(packageName));
      }
      return dispatch(updatePackageInfo(packageName)).then(() =>
        dispatch(changeActivePanel(which))
      );
    },
  })
)(ManageContainer);
