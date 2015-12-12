import React, { PropTypes as T, Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, PanelGroup, Panel } from 'react-bootstrap';

import { changeActivePanel } from '../actions';

import ErrorContainer from './ErrorContainer';
import SearchContainer from '../../search/components/SearchContainer';
import ViewContainer from '../../view/components/ViewContainer';
import ReadmeContainer from '../../view/components/ReadmeContainer';
import InstallContainer from '../../install/components/InstallContainer';
import ManageContainer from '../../manage/components/ManageContainer';

const INFO_COL_WIDTH = 3;
const DOC_COL_WIDTH = 9;

class BundleEditor extends Component {
  static propTypes = {
    install: T.object.isRequired,
    main: T.object.isRequired,
    manage: T.object.isRequired,
    onPanelSelect: T.func.isRequired,
    search: T.object.isRequired,
    view: T.object.isRequired,
  }
  render() {
    const {
      onPanelSelect,
      main: {
        activePanel,
      },
      view: {
        packageInfo,
      },
      manage: {
        dependencies,
      },
    } = this.props;
    return (
      <Grid fluid style={{ height: '100%', padding: '1em 0' }}>
        <Col sm={INFO_COL_WIDTH}>
          <ErrorContainer/>
          <PanelGroup accordion activeKey={activePanel} onSelect={onPanelSelect} >
            <Panel bsStyle={'primary'} eventKey='search' header='Search'>
              <SearchContainer/>
            </Panel>
            <Panel bsStyle={packageInfo ? 'primary' : 'default'} eventKey='view' header='View'>
              {packageInfo ? <ViewContainer/> : null}
            </Panel>
            <Panel bsStyle={packageInfo ? 'primary' : 'default'} eventKey='install' header='Install'>
              {packageInfo && dependencies[packageInfo.name] ? <InstallContainer/> : null}
            </Panel>
            <Panel bsStyle={false ? 'primary' : 'default'} eventKey='manage' header='Manage'>
              <ManageContainer/>
            </Panel>
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
  (store) => store,
  {
    onPanelSelect: changeActivePanel,
  }
)(BundleEditor);
