import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import { renderMarkdown } from '../../../../utils/markdown';

function SearchResultList({ result, onResultSelect }) {
  if(!result) {
    return <noscript />;
  }
  return (
    <ListGroup>
      {result.results.map((item) =>
        <ListGroupItem
          header={item.name}
          key={item.name}
          onClick={() => onResultSelect(item.name)}
        >
         <span dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
           __html: renderMarkdown(item.description),
         }}/>
        </ListGroupItem>
      )}
    </ListGroup>
  );
}

export default SearchResultList;
