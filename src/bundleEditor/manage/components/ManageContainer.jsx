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
      <ButtonGroup style={{ minWidth: '75px' }}>
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
    onButtonClick: T.func.isRequired,
  }
  render() {
    const {
      dependencies,
      onButtonClick,
    } = this.props;
    if(_.isEmpty(dependencies)) {
      return <h3>{'The bundle is empty.'}</h3>;
    }
    return (
      <div>
        <label>{'Dependencies'}</label>
        <Table bordered responsive stripped>
          <thead>
            <tr>
              <th>{'Name'}</th>
              <th>{'Version'}</th>
              <th>{'Bindings'}</th>
              <th>{'Actions'}</th>
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
