import React, { PropTypes as T, Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import { updatePackageInfo } from '../../view/actions';
import { renderMarkdown } from '../../utils/markdown';

class SearchResultList extends Component {
  static propTypes = {
    onPackageSelected: T.func.isRequired,
    result: T.object,
  }

  render() {
    const { result, onPackageSelected } = this.props;
    if(!result) {
      return null;
    }
    return (
      <ListGroup>
        {result.results.map((item) =>
          <ListGroupItem
            header={item.name}
            key={item.name}
            onClick={() => onPackageSelected(item.name)}
          >
           <div dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
             __html: renderMarkdown(item.description),
           }}/>
          </ListGroupItem>
        )}
      </ListGroup>
    );
  }
}

export default connect(
  ({ search }) => search,
  {
    onPackageSelected: updatePackageInfo,
  }
)(SearchResultList);
