import React, { PropTypes as T, Component } from 'react';
import { connect } from 'react-redux';

import { renderMarkdown } from '../../../utils/markdown';

class ReadmeContainer extends Component {
  static propTypes = {
    packageInfo: T.object,
  }
  render() {
    const { packageInfo } = this.props;
    if(!packageInfo) {
      return null;
    }
    return (
      <div
        dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
          __html: renderMarkdown(packageInfo.readme),
        }}
      />
    );
  }
}

export default connect(({ view }) => view)(ReadmeContainer);
