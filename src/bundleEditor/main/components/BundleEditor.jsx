import React, { Component } from 'react';
import { Grid, Row, Col, PanelGroup, Panel } from 'react-bootstrap';

import SearchContainer from '../../search/components/SearchContainer';
import InstallContainer from '../../install/components/InstallContainer';
import ManageContainer from '../../manage/components/ManageContainer';
import ReadmeContainer from '../../install/components/ReadmeContainer';

const INFO_COL_WIDTH = 3;
const DOC_COL_WIDTH = 9;

class BundleEditor extends Component {
  render() {
    return (
      <Grid fluid style={{ height: '100%', padding: '1em 0' }}>
        <Col sm={INFO_COL_WIDTH}>
          <PanelGroup defaultActiveKey='search' accordion>
            <Panel bsStyle='primary' header='Search' eventKey='search'><SearchContainer/></Panel>
            <Panel bsStyle='primary' header='Install' eventKey='install'><InstallContainer/></Panel>
            <Panel bsStyle='primary' header='Manage' eventKey='manage'><ManageContainer/></Panel>
          </PanelGroup>
        </Col>
        <Col sm={DOC_COL_WIDTH} style={{ maxHeight: '100%', overflowY: 'scroll'}}>
          <Row>
            <ReadmeContainer />
          </Row>
        </Col>
      </Grid>
    );
  }
}

export default BundleEditor;
