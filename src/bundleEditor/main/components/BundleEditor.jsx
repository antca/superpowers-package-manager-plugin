import React, { PropTypes as T, Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, PanelGroup, Panel } from 'react-bootstrap';

import { changeActivePanel } from '../actions';

import SearchContainer from '../../search/components/SearchContainer';
import ViewContainer from '../../view/components/ViewContainer';
import ReadmeContainer from '../../view/components/ReadmeContainer';
import ManageContainer from '../../manage/components/ManageContainer';
import ErrorContainer from './ErrorContainer';

const INFO_COL_WIDTH = 3;
const DOC_COL_WIDTH = 9;

class BundleEditor extends Component {
  static propTypes = {
    activePanel: T.oneOf(['search', 'view', 'manage']).isRequired,
    onPanelSelect: T.func.isRequired,
  }
  render() {
    const { onPanelSelect, activePanel } = this.props;
    return (
      <Grid fluid style={{ height: '100%', padding: '1em 0' }}>
        <Col sm={INFO_COL_WIDTH}>
          <ErrorContainer/>
          <PanelGroup accordion activeKey={activePanel} onSelect={onPanelSelect} >
            <Panel bsStyle='primary' eventKey='search' header='Search'><SearchContainer/></Panel>
            <Panel bsStyle='primary' eventKey='view' header='View'><ViewContainer/></Panel>
            <Panel bsStyle='primary' eventKey='manage' header='Manage'><ManageContainer/></Panel>
          </PanelGroup>
        </Col>
        <Col sm={DOC_COL_WIDTH} style={{ maxHeight: '100%', overflowY: 'auto  ' }}>
          <Row>
            <ReadmeContainer />
          </Row>
        </Col>
      </Grid>
    );
  }
}

export default connect(
  ({ main }) => main,
  {
    onPanelSelect: changeActivePanel,
  }
)(BundleEditor);
