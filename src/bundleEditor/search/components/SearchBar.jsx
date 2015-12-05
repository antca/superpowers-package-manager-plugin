import React, { PropTypes as T, Component } from 'react';
import { connect } from 'react-redux';
import { searchPackage } from '../actions';

class SearchBar extends Component {
  static propTypes = {
    error: T.instanceOf(Error),
    onContentChange: T.func.isRequired,
    result: T.object,
  }

  constructor(...args) {
    super(...args);
    this.state = {
      searchBarContent: '',
    };
  }

  onSearchInputChange({ target: { value } }) {
    const { onContentChange } = this.props;
    this.setState({
      searchBarContent: value,
    });
    onContentChange(value);
  }

  render() {
    const { searchBarContent } = this.state;
    return (
      <div className='SearchBar'>
        <input
          onChange={(e) => this.onSearchInputChange(e)}
          placeholder='Search on npm...'
          value={searchBarContent}
       />
      </div>
    );
  }
}

export default connect(
  ({ search }) => search,
  {
    onContentChange: searchPackage,
  }
)(SearchBar);
