import React from 'react';
import { connect } from 'react-redux';
import { renderMarkdown } from '../../../utils/markdown';

function ReadmeBody({ packageInfo }) {
  if(!packageInfo) {
    return <noscript />;
  }
  return (
    <div
      dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
        __html: renderMarkdown(packageInfo.readme),
      }}
    />
  );
}

export { ReadmeBody };
export default connect(({ view }) => view)(ReadmeBody);
