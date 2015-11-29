import React, { PropTypes as T, Component } from 'react';
import { connect } from 'react-redux';
import radium from 'radium';

import { updateMessage } from '../actions/creators';

class BundleEditor extends Component {
  static propTypes = {
    helloMessage: T.string.isRequired,
    onInputChange: T.func.isRequired,
  }

  render() {
    const { helloMessage, onInputChange } = this.props;
    return (
      <div>
        <h1>{helloMessage}</h1>
        <input onChange={onInputChange} type='text'/>
      </div>
    );
  }
}

export default radium(connect(
  ({ message }) => ({
    helloMessage: message,
  }),
  (dispatch) => ({
    onInputChange: ({ target: { value } }) => dispatch(updateMessage(value)),
  }),
)(BundleEditor));
