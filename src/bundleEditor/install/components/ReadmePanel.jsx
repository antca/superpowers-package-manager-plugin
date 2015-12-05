import React, { PropTypes as T, Component } from 'react';
import { connect } from 'react-redux';
import { Panel } from 'react-bootstrap';
import marked from 'marked';

class ReadmePanel extends Component {
  static propTypes = {
    packageInfo: T.object,
  }
  render() {
    const { packageInfo } = this.props;
    if(!packageInfo) {
      return null;
    }
    console.log('render');
    return (
      <Panel header='Readme'>
        <div dangerouslySetInnerHTML={{ __html: marked(packageInfo.readme) }}/>
      </Panel>
    );
  }
}

export default connect(({ install }) => install)(ReadmePanel);
