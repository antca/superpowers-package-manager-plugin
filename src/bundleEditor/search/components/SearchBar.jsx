import React, { PropTypes as T, Component } from 'react';
import { connect } from 'react-redux';
import { Input } from 'react-bootstrap';

import { searchPackage } from '../actions';
import { updatePackageInfo } from '../../install/actions';

const ENTER_KEY_CODE = 13;

class SearchBar extends Component {
  static propTypes = {
    error: T.instanceOf(Error),
    onContentChange: T.func.isRequired,
    onEnterKeyPress: T.func.isRequired,
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
    const { onEnterKeyPress } = this.props;
    const { searchBarContent } = this.state;
    return (
      <div>
         <Input
           onChange={(e) => this.onSearchInputChange(e)}
           onKeyPress={(e) => e.which === ENTER_KEY_CODE && onEnterKeyPress(searchBarContent)}
           placeholder='Search on npm...'
           type='text'
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
    onEnterKeyPress: updatePackageInfo,
  }
)(SearchBar);
