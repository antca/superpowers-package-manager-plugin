import React, { PropTypes as T, Component } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';

import ReadmeBody from './ReadmeBody';

@connect(({ view }) => view)
@autobind
class ReadmeBodyContainer extends Component {
  static propTypes = {
    packageInfo: T.object,
  };

  render() {
    return (
      <ReadmeBody {...this.props} {...this.state}/>
    );
  }
}

export default ReadmeBodyContainer;
