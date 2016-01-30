import _ from 'lodash';
import React, { PropTypes as T } from 'react';
import { Grid, Row, Col, PanelGroup, Panel } from 'react-bootstrap';
import { connect } from 'react-redux';

import { changeActivePanel } from '../actions';
import EditBody from '../../edit/components/EditBody';
import ErrorBody from './ErrorBody';
import ManageBody from '../../manage/components/ManageBody';
import ReadmeBody from '../../view/components/ReadmeBody';
import SearchBody from '../../search/components/SearchBody';
import ViewBody from '../../view/components/ViewBody';

const INFO_COL_WIDTH = 4;
const DOC_COL_WIDTH = 8;

const propTypes = {
  data: T.object.isRequired,
  i18n: T.func.isRequired,
  main: T.object.isRequired,
  onPanelSelect: T.func.isRequired,
  remoteDispatch: T.func.isRequired,
  view: T.object.isRequired,
};

function BundleEditor({ onPanelSelect, main, view, data, remoteDispatch, i18n }) {
  const { activePanel } = main;
  const { packageInfo, loading } = view;
  const { dependencies } = data;
  return (
    <Grid fluid style={{ height: '100%', padding: '1em 0' }}>
      <Col sm={INFO_COL_WIDTH}>
        <ErrorBody/>
        <PanelGroup accordion activeKey={activePanel} onSelect={onPanelSelect} >
          <Panel
            bsStyle={_.isEmpty(dependencies) ? 'default' : 'primary'}
            eventKey='manage'
            header={i18n('bundleEditor:manage.panelTitle')}
          >
            {activePanel === 'manage' ? <ManageBody i18n={i18n} remoteDispatch={remoteDispatch}/> : null}
          </Panel>
          <Panel bsStyle={'primary'} eventKey='search' header={i18n('bundleEditor:search.panelTitle')}>
            {activePanel === 'search' ? <SearchBody i18n={i18n}/> : null}
          </Panel>
          <Panel
            bsStyle={packageInfo ? 'primary' : 'default'}
            eventKey='view'
            header={i18n('bundleEditor:view.panelTitle')}
          >
            {activePanel === 'view' ? <ViewBody i18n={i18n} remoteDispatch={remoteDispatch}/> : null}
          </Panel>
          <Panel
            bsStyle={packageInfo && dependencies[packageInfo.name] ? 'primary' : 'default'}
            eventKey='edit'
            header={i18n('bundleEditor:edit.panelTitle')}
          >
            {activePanel === 'edit' ? <EditBody i18n={i18n} remoteDispatch={remoteDispatch}/> : null}
          </Panel>
        </PanelGroup>
      </Col>
      <Col sm={DOC_COL_WIDTH} style={{ maxHeight: '100%', overflowY: 'auto' }}>
        <Row>
          {loading ? <h1>{'Loading...'}</h1> : <ReadmeBody/>}
        </Row>
      </Col>
    </Grid>
  );
}

Object.assign(BundleEditor, { propTypes });

export { BundleEditor };
export default connect(
  (store) => store,
  {
    onPanelSelect: changeActivePanel,
  },
)(BundleEditor);
