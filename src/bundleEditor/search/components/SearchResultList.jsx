import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import { renderMarkdown } from '../../../utils/markdown';

const propTypes = {
  onResultSelect: T.func.isRequired,
  result: T.object,
  selectedItemIndex: T.number,
};

function SearchResultList({ result, onResultSelect, selectedItemIndex }) {
  if(!result) {
    return <noscript />;
  }
  return (
    <ListGroup>
      {result.results.map((item, index) =>
        <ListGroupItem
          active={index === selectedItemIndex}
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

Object.assign(SearchResultList, { propTypes });

export { SearchResultList };
export default connect(
  ({ search }) => search
)(SearchResultList);
