import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

import { renderMarkdown } from '../../../../utils/markdown';

function PackageProperty({ children, header, isMarkdown = false }) {
  if(!children) {
    return <noscript />;
  }
  return (
    <ListGroupItem header={header}>
      {(() => {
        if(isMarkdown) {
          return (
            <span dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
              __html: renderMarkdown(children),
            }}/>
          );
        }
        if(typeof children === 'string' && children.match(/^https?:\/\//)) {
          return <a href={children} target='_blank'>{children}</a>;
        }
        return children;
      })()}
    </ListGroupItem>
  );
}

export default PackageProperty;
