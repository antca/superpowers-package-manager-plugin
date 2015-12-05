import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import InstallPanel from '../../install/components/InstallPanel';
import ReadmePanel from '../../install/components/ReadmePanel';
import ManagePanel from '../../manage/components/ManagePanel';

const INFO_COL_WIDTH = 3;
const DOC_COL_WIDTH = 9;

class BundleEditor extends Component {
  render() {
    return (
      <Grid fluid style={{ padding: '1em' }}>
        <Col sm={INFO_COL_WIDTH}>
          <Row>
            <InstallPanel/>
          </Row>
          <Row>
            <ManagePanel/>
          </Row>
        </Col>
        <Col sm={DOC_COL_WIDTH}>
          <Row style={{ paddingLeft: '1em' }}>
            <ReadmePanel />
          </Row>
        </Col>
      </Grid>
    );
  }
}

export default BundleEditor;
