import _ from 'lodash';
import React, { PropTypes as T, Component } from 'react';
import { Table, Glyphicon, Button, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';

import { removeDependency } from '../../../data/actions';
import { changeActivePanel } from '../../main/actions';
import { updatePackageInfo } from '../../view/actions';

function depsArray(dependencies) {
  return _.map(dependencies, (value, key) => Object.assign({}, value, { name: key }));
}

const DependencyEntry = ({ name, version, bindings, onEditButtonClick, onDeleteButtonClick }) =>
  <tr>
    <td>{name}</td>
    <td>{version}</td>
    <td style={{ width: '100%' }}>
      {_.map(bindings, (binding) => binding.propertyName).filter((prop) => prop).join(', ')}
    </td>
    <td>
      <ButtonGroup>
        <Button
          bsSize='xsmall'
          bsStyle={'info'}
          onClick={() => onEditButtonClick(name)}
        >
          <Glyphicon glyph='edit'/>
        </Button>
        <Button
          bsSize='xsmall'
          bsStyle={'danger'}
          onClick={() => onDeleteButtonClick(name)}
        >
        <Glyphicon glyph='remove'/>
        </Button>
      </ButtonGroup>
    </td>
  </tr>;

class ManageContainer extends Component {
  static propTypes = {
    dependencies: T.object.isRequired,
    onDeleteButtonClick: T.func.isRequired,
    onEditButtonClick: T.func.isRequired,
  }
  render() {
    const {
      dependencies,
      onDeleteButtonClick,
      onEditButtonClick,
    } = this.props;
    if(_.isEmpty(dependencies)) {
      return <h3>{'The bundle is empty.'}</h3>;
    }
    return (
      <div>
        <label>{'Dependencies'}</label>
        <Table bordered stripped>
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
                onDeleteButtonClick={onDeleteButtonClick}
                onEditButtonClick={onEditButtonClick}
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
    onEditButtonClick(packageName) {
      dispatch(updatePackageInfo(packageName)).then(() => {
        dispatch(changeActivePanel('edit'));
      });
    },
    onDeleteButtonClick(packageName) {
      remoteDispatch(removeDependency(packageName));
    },
  })
)(ManageContainer);
