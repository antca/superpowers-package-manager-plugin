import React, { PropTypes as T, Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';

import { changeActivePanel } from '../../main/actions';

const NPM_URL = '//www.npmjs.com/package/';

const Author = ({ author }) =>
  <ListGroupItem header='Author'>
    {author.name}{' <'}<a href={`mailto:${author.email}`}>{author.email}</a>{'>'}
  </ListGroupItem>;

const Repository = ({ repository }) =>
  <ListGroupItem header='Repository'>
    <a href={repository.url} target='_blank'>{repository.url}</a>
  </ListGroupItem>;

class ViewContainer extends Component {
  static propTypes = {
    onInstallButtonClick: T.func.isRequired,
    packageInfo: T.object,
  }
  render() {
    const { packageInfo, onInstallButtonClick } = this.props;
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
    return (
      <div>
        <ListGroup fill style={{ overflow: 'hidden' }}>
          {name ? <ListGroupItem header='Name'>{name}</ListGroupItem> : null}
          {latestVersion ? <ListGroupItem header='Latest version'>{latestVersion}</ListGroupItem> : null}
          {description ? <ListGroupItem header='Description'>{description}</ListGroupItem> : null}
          {author ? <Author author={author} /> : null}
          {license ? <ListGroupItem header='License'>{license}</ListGroupItem> : null}
          {repository ? <Repository repository={repository}/> : null}
          {homepage ? <ListGroupItem header='Homepage'>
            <a href={homepage} target='_blank'>{homepage}</a>
           </ListGroupItem> : null}
          {bugs ? <ListGroupItem header='Bugs'><a href={bugs.url} target='_blank'>{bugs.url}</a></ListGroupItem> : null}
        </ListGroup>
        <Button block bsStyle='info' href={`${NPM_URL}${name}`} target='_blank'>{'View on NPM'}</Button>
        <Button block bsStyle='success' onClick={() => onInstallButtonClick('install')}>{'install'}</Button>
      </div>
    );
  }
}

export default connect(
  ({ view }) => view,
  {
    onInstallButtonClick: changeActivePanel,
  }
)(ViewContainer);
