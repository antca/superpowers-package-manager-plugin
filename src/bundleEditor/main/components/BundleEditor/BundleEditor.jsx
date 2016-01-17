import _ from 'lodash';
import React from 'react';
import { Grid, Row, Col, PanelGroup, Panel } from 'react-bootstrap';

import EditBody from '../../../edit/components/EditBody';
import ErrorBody from '../ErrorBody';
import ManageBody from '../../../manage/components/ManageBody';
import ReadmeBody from '../../../view/components/ReadmeBody';
import SearchBody from '../../../search/components/SearchBody';
import ViewBody from '../../../view/components/ViewBody';

const INFO_COL_WIDTH = 4;
const DOC_COL_WIDTH = 8;

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
            <ManageBody i18n={i18n} remoteDispatch={remoteDispatch}/>
          </Panel>
          <Panel bsStyle={'primary'} eventKey='search' header={i18n('bundleEditor:search.panelTitle')}>
            <SearchBody i18n={i18n}/>
          </Panel>
          <Panel
            bsStyle={packageInfo ? 'primary' : 'default'}
            eventKey='view'
            header={i18n('bundleEditor:view.panelTitle')}
          >
            {packageInfo ? <ViewBody i18n={i18n} remoteDispatch={remoteDispatch}/> : null}
          </Panel>
          <Panel
            bsStyle={packageInfo && dependencies[packageInfo.name] ? 'primary' : 'default'}
            eventKey='edit'
            header={i18n('bundleEditor:edit.panelTitle')}
          >
            <EditBody i18n={i18n} remoteDispatch={remoteDispatch}/>
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

export default BundleEditor;
