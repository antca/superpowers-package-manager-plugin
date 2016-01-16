import React, { PropTypes as T, Component } from 'react';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import { addDependency } from '../../../data/actions';
import { renderMarkdown } from '../../../utils/markdown';
import { changeActivePanel } from '../../main/actions';

const NPM_URL = '//www.npmjs.com/package/';

const PackageProperty = ({ children, header, isMarkdown = false }) => {
  if(!children) {
    return <noscript />;
  }
  return (
    <ListGroupItem header={header}>
      {(() => {
        if(isMarkdown) {
          return (
            <span dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
              __html: renderMarkdown(children),
            }}/>
          );
        }
        if(typeof children === 'string' && children.match(/^https?:\/\//)) {
          return <a href={children} target='_blank'>{children}</a>;
        }
        return children;
      })()}
    </ListGroupItem>
  );
};

const Author = ({ author, header }) => {
  if(!author) {
    return <noscript />;
  }
  return (
    <PackageProperty header={header}>
      <span>{author.name}</span>
      <br/>
      <span><a href={`mailto:${author.email}`}>{author.email}</a></span>
    </PackageProperty>
  );
};

const AddEditButton = ({ isDepedencyInstalled, onClick, i18n }) =>
  <Button
    block
    bsStyle={isDepedencyInstalled ? 'primary' : 'success'}
    onClick={onClick}
  >
    {i18n(`bundleEditor:view.buttons.${isDepedencyInstalled ? 'edit' : 'add'}`)}
  </Button>;

class ViewContainer extends Component {
  static propTypes = {
    dependencies: T.object,
    i18n: T.func.isRequired,
    onMainButtonClick: T.func.isRequired,
    packageInfo: T.object,
  };

  render() {
    const {
      packageInfo,
      onMainButtonClick,
      dependencies,
      i18n,
    } = this.props;
    if(!packageInfo) {
      return null;
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
}

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
)(ViewContainer);
