import _ from 'lodash';
import React, { PropTypes as T, Component } from 'react';
import { Grid, Row, Col, PanelGroup, Panel } from 'react-bootstrap';
import { connect } from 'react-redux';

import EditContainer from '../../edit/components/EditContainer';
import ErrorContainer from './ErrorContainer';
import ManageContainer from '../../manage/components/ManageContainer';
import ReadmeContainer from '../../view/components/ReadmeContainer';
import SearchContainer from '../../search/components/SearchContainer';
import ViewContainer from '../../view/components/ViewContainer';
import { selectTextBoxContent } from '../../search/actions';
import { changeActivePanel } from '../actions';

const INFO_COL_WIDTH = 4;
const DOC_COL_WIDTH = 8;

class BundleEditor extends Component {
  static propTypes = {
    data: T.object.isRequired,
    main: T.object.isRequired,
    onPanelSelect: T.func.isRequired,
    remoteDispatch: T.func.isRequired,
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
      data: {
        dependencies,
      },
      remoteDispatch,
    } = this.props;
    return (
      <Grid fluid style={{ height: '100%', padding: '1em 0' }}>
        <Col sm={INFO_COL_WIDTH}>
          <ErrorContainer/>
          <PanelGroup accordion activeKey={activePanel} onSelect={onPanelSelect} >
            <Panel bsStyle={_.isEmpty(dependencies) ? 'default' : 'primary'} eventKey='manage' header='Manage'>
              <ManageContainer remoteDispatch={remoteDispatch}/>
            </Panel>
            <Panel bsStyle={'primary'} eventKey='search' header='Search'>
              <SearchContainer/>
            </Panel>
            <Panel bsStyle={packageInfo ? 'primary' : 'default'} eventKey='view' header='View'>
              {packageInfo ? <ViewContainer remoteDispatch={remoteDispatch}/> : null}
            </Panel>
            <Panel
              bsStyle={packageInfo && dependencies[packageInfo.name] ? 'primary' : 'default'}
              eventKey='edit'
              header='Edit'
            >
              <EditContainer remoteDispatch={remoteDispatch}/>
            </Panel>
          </PanelGroup>
        </Col>
        <Col sm={DOC_COL_WIDTH} style={{ maxHeight: '100%', overflowY: 'auto' }}>
          <Row>
            <ReadmeContainer/>
          </Row>
        </Col>
      </Grid>
    );
  }
}

export default connect(
  (store) => store,
  (dispatch) => ({
    onPanelSelect(panel) {
      if(panel === 'search') {
        dispatch(selectTextBoxContent());
      }
      dispatch(changeActivePanel(panel));
    },
  }),
)(BundleEditor);
