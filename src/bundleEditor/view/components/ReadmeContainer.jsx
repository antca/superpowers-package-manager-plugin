import React, { PropTypes as T, Component } from 'react';
import { connect } from 'react-redux';
import marked from 'marked';

const renderer = new marked.Renderer();
renderer.link = (href, title, text) =>
  `<a target="_blank" href="${href}" title="${title}">${text}</a>`;

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
          __html: marked(packageInfo.readme, { renderer }),
        }}
        style={{ padding: '0 1em' }}
      />
    );
  }
}

export default connect(({ view }) => view)(ReadmeContainer);
