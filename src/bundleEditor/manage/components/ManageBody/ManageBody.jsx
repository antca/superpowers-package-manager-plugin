import _ from 'lodash';
import React from 'react';
import { Table } from 'react-bootstrap';

import DependencyEntry from './DependencyEntry';

function depsArray(dependencies) {
  return _.map(dependencies, (value, key) => Object.assign({}, value, { name: key }));
}

function ManageBody({ dependencies, onButtonClick, i18n }) {
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

export default ManageBody;