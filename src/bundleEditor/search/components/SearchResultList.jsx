import React, { PropTypes as T, Component } from 'react';
import { connect } from 'react-redux';

const styles = {
  resultList: {
    listStyleType: 'none',
    padding: 0,
  },
};

const SearchResultItem = ({ item }) =>
  <li>
   <h3>{item.name}</h3>
   <span style={{ float: 'right' }}>{item.version}</span>
   <p>{item.description}</p>
  </li>;

class SearchResultList extends Component {
  static propTypes = {
    result: T.object,
  }

  render() {
    const { result } = this.props;
    if(!result) {
      return null;
    }
    return (
      <ul style={styles.resultList}>
        {result.results.map((item) =>
          <SearchResultItem
            item={item}
            key={item.name}
           />)}
      </ul>
    );
  }
}

export default connect(({ search }) => search)(SearchResultList);
