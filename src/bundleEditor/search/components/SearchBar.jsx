import React, { PropTypes as T, Component } from 'react';
import { connect } from 'react-redux';
import { Input } from 'react-bootstrap';

import { searchPackage } from '../actions';

const ENTER_KEY_CODE = 13;

class SearchBar extends Component {
  static propTypes = {
    error: T.instanceOf(Error),
    onContentChange: T.func.isRequired,
    onEnterKeyPress: T.func.isRequired,
    result: T.object,
    textSelected: T.bool.isRequired,
  }

  constructor(...args) {
    super(...args);
    this.state = {
      searchBarContent: '',
    };
  }

  componentDidUpdate() {
    const { textSelected } = this.props;
    if(textSelected) {
      window.test = this.refs.textbox;
      this.refs.textbox.getInputDOMNode().select();
    }
  }

  onSearchInputChange({ target: { value } }) {
    const { onContentChange } = this.props;
    this.setState({
      searchBarContent: value,
    });
    onContentChange(value);
  }

  onKeyPress(e) {
    const { onEnterKeyPress } = this.props;
    const { searchBarContent } = this.state;
    if(e.which === ENTER_KEY_CODE) {
      onEnterKeyPress(searchBarContent);
    }
  }

  render() {
    const { searchBarContent } = this.state;
    return (
      <div>
         <Input
           onChange={(e) => this.onSearchInputChange(e)}
           onKeyPress={(e) => this.onKeyPress(e)}
           placeholder='Search on npm...'
           ref='textbox'
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
  }
)(SearchBar);
