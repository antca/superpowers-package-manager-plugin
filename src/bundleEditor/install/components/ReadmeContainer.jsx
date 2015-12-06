import React, { PropTypes as T, Component } from 'react';
import { connect } from 'react-redux';
import { Panel } from 'react-bootstrap';
import marked from 'marked';

const renderer = new marked.Renderer();
renderer.link = ( href, title, text ) =>
  '<a target="_blank" href="'+ href +'" title="' + title + '">' + text + '</a>';

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
      <div dangerouslySetInnerHTML={{ __html: marked(packageInfo.readme, { renderer:renderer }) }}/>
    );
  }
}

export default connect(({ install }) => install)(ReadmeContainer);
