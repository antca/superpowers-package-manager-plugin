import React, { PropTypes as T, Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Table } from 'react-bootstrap';

function depsArray(dependencies) {
  return _.map(dependencies, (value, key) => Object.assign({}, value, { name: key }));
}

const DependencyEntry = ({ name, version, bindings }) =>
  <tr>
    <td>{name}</td>
    <td>{version}</td>
    <td>{_.map(bindings, (binding) => binding.propertyName).filter((prop) => prop).join(', ')}</td>
  </tr>;

class ManageContainer extends Component {
  static propTypes = {
    dependencies: T.object.isRequired,
  }
  render() {
    const {
      dependencies,
    } = this.props;
    return (
      <div>
        <label>{'Dependencies'}</label>
        <Table bordered hover stripped>
          <thead>
            <tr>
              <th>{'Name'}</th>
              <th>{'Version'}</th>
              <th>{'Bindings'}</th>
            </tr>
          </thead>
          <tbody>
            {depsArray(dependencies).map((dependency) =>
              <DependencyEntry {...dependency} />)}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default connect(
  ({ data }) => data
)(ManageContainer);
