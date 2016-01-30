import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { renderMarkdown } from '../../../utils/markdown';

const propTypes = {
  packageInfo: T.object,
};

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

Object.assign(ReadmeBody, { propTypes });

export { ReadmeBody };
export default connect(({ view }) => view)(ReadmeBody);
