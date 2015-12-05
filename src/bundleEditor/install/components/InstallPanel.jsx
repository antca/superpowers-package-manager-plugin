import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

import SearchContainer from '../../search/components/SearchContainer';

class InstallPanel extends Component {
  render() {
    return (
      <Panel header='Install'>
        <SearchContainer />
      </Panel>
    );
  }
}

export default InstallPanel;
