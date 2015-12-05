import React, { PropTypes as T, Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import { updatePackageInfo } from '../../install/actions';

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
           {item.description}
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
