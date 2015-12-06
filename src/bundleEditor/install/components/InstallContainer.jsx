import React, { Component } from 'react';
import { ListGroup, ListGroupItem} from 'react-bootstrap';

import PackageInfo from './PackageInfo';
// import BindingsEditor from './BindingsEditor';

class InstallContainer extends Component {
  render() {
    return (
      <div>
        <PackageInfo/>

        {/*<BindingsEditor/>*/}
      </div>
    );
  }
}

export default InstallContainer;
