import React, { PropTypes as T, Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, Panel } from 'react-bootstrap';

class PackageInfo extends Component {
  static propTypes = {
    packageInfo: T.object,
  }
  render() {
    const { packageInfo } = this.props;
    if(!packageInfo) {
      return null;
    }
    return (
      <ListGroup fill>
        <ListGroupItem>Item 1</ListGroupItem>
        <ListGroupItem>Item 2</ListGroupItem>
        <ListGroupItem>&hellip;</ListGroupItem>
      </ListGroup>
    );
  }
}

export default connect(({ install }) => install)(PackageInfo);
