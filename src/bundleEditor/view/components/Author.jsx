import React, { PropTypes as T } from 'react';

import PackageProperty from './PackageProperty';

const propTypes = {
  author: T.object.isRequired,
  header: T.string.isRequired,
};

function Author({ author, header }) {
  if(!author) {
    return <noscript />;
  }
  return (
    <PackageProperty header={header}>
      <span>{author.name}</span>
      <br/>
      <span><a href={`mailto:${author.email}`}>{author.email}</a></span>
    </PackageProperty>
  );
}

export default Object.assign(Author, { propTypes });
