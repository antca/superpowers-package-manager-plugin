import React, { Component, PropTypes as T } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import autobind from 'autobind-decorator';

import { renderMarkdown } from '../../../../utils/markdown';

@autobind
class SearchResultList extends Component {
  static propTypes = {
    onResultSelect: T.func.isRequired,
    result: T.object,
    selectedItemIndex: T.number,
  };

  render() {
    const { result, onResultSelect, selectedItemIndex } = this.props;

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
}

export default SearchResultList;
