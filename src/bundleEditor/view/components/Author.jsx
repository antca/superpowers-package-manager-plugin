import React from 'react';

import PackageProperty from './PackageProperty';

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

export default Author;
