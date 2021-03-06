import React, { PropTypes as T } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import { addDependency } from '../../../data/actions';
import { changeActivePanel } from '../../main/actions';
import PackageProperty from './PackageProperty';
import Author from './Author';
import AddEditButton from './AddEditButton';

const NPM_URL = '//www.npmjs.com/package/';

const propTypes = {
  dependencies: T.object.isRequired,
  i18n: T.func.isRequired,
  onMainButtonClick: T.func.isRequired,
  packageInfo: T.object,
};

function ViewBody({ packageInfo, onMainButtonClick, dependencies, i18n }) {
  if(!packageInfo) {
    return <noscript />;
  }
  const {
    name,
    description,
    'dist-tags': {
      latest: latestVersion,
    },
    author,
    repository,
    homepage,
    bugs,
    license,
  } = packageInfo;
  const isDepedencyInstalled = dependencies.hasOwnProperty(name);
  return (
    <div>
      <ListGroup fill style={{ wordBreak: 'break-all' }}>
        <PackageProperty header={i18n('bundleEditor:view.props.name')}>{name}</PackageProperty>
        <PackageProperty header={i18n('bundleEditor:view.props.latestVersion')}>{latestVersion}</PackageProperty>
        <PackageProperty header={i18n('bundleEditor:view.props.description')} isMarkdown>
          {description}
        </PackageProperty>
        <Author author={author} header={i18n('bundleEditor:view.props.author')}/>
        <PackageProperty header={i18n('bundleEditor:view.props.license')}>{license}</PackageProperty>
        <PackageProperty header={i18n('bundleEditor:view.props.repository')}>
          {repository && repository.url}
        </PackageProperty>
        <PackageProperty header={i18n('bundleEditor:view.props.homepage')}>{homepage}</PackageProperty>
        <PackageProperty header={i18n('bundleEditor:view.props.bugs')}>
          {bugs && bugs.url}
        </PackageProperty>
      </ListGroup>
      <Button block bsStyle='info' href={`${NPM_URL}${name}`} target='_blank'>
        {i18n('bundleEditor:view.buttons.viewOnNpm')}
      </Button>
      <AddEditButton
        i18n={i18n}
        isDepedencyInstalled={isDepedencyInstalled}
        onClick={() => onMainButtonClick(isDepedencyInstalled ? null : packageInfo)}
      />
    </div>
  );
}

Object.assign(ViewBody, { propTypes });

export { ViewBody };
export default connect(
  ({ view, data }) => ({
    packageInfo: view.packageInfo,
    dependencies: data.dependencies,
  }),
  (dispatch, { remoteDispatch }) => ({
    onMainButtonClick: (packageInfo) => {
      (packageInfo ? remoteDispatch(addDependency(packageInfo)) : Promise.resolve())
        .then(() =>
          dispatch(changeActivePanel('edit'))
        );
    },
  })
)(ViewBody);
