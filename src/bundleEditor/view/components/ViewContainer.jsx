import React, { PropTypes as T, Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, Panel, ButtonGroup, Button } from 'react-bootstrap';

const NPM_URL = '//www.npmjs.com/package/';

class ViewContainer extends Component {
  static propTypes = {
    packageInfo: T.object,
  }
  render() {
    const { packageInfo } = this.props;
    if(!packageInfo) {
      return null;
    }
    const {
      name,
      description,
      versions,
      'dist-tags': {
        latest: latestVersion,
      },
      author: {
        name: authorName,
        email: authorEmail,
      },
      repository: {
        url: repoURL,
      },
      homepage: hpURL,
      bugs: {
        url: bugsURL,
      },
      license,
    } = packageInfo;
    const avaliableVersions = Object.keys(versions);
    const { icon } = versions[latestVersion];
    return (
      <div>
        <ListGroup fill style={{ overflow: 'hidden' }}>
          <ListGroupItem header='Name'>{name}</ListGroupItem>
          <ListGroupItem header='Latest version'>{latestVersion}</ListGroupItem>
          <ListGroupItem header='Description'>{description}</ListGroupItem>
          <ListGroupItem header='Author'>
            {authorName}{' <'}<a href={`mailto:${authorEmail}`}>{authorEmail}</a>{'>'}
          </ListGroupItem>
          <ListGroupItem header='License'>{license}</ListGroupItem>
          <ListGroupItem header='Repository'><a target='_blank' href={repoURL}>{repoURL}</a></ListGroupItem>
          <ListGroupItem header='Homepage'><a target='_blank' href={hpURL}>{hpURL}</a></ListGroupItem>
          <ListGroupItem header='Bugs'><a target='_blank' href={bugsURL}>{bugsURL}</a></ListGroupItem>
        </ListGroup>
        <Button block bsStyle="info" target='_blank' href={`${NPM_URL}${name}`}>{'View on NPM'}</Button>
        <Button block bsStyle="success">{'install'}</Button>
      </div>
    );
  }
}

export default connect(({ view }) => view)(ViewContainer);
