import React, { PropTypes as T, Component } from 'react';
import { connect } from 'react-redux';
import radium from 'radium';
import AssetManager from '../../AssetManager';

import SearchBar from '../../search/components/SearchBar';

import { updateMessage } from '../actions';

class BundleEditor extends Component {
  static propTypes = {
    asset: T.instanceOf(AssetManager).isRequired,
    currentMessage: T.string.isRequired,
    onInputChange: T.func.isRequired,
  }

  render() {
    const { currentMessage, onInputChange, asset } = this.props;
    return (
      <div>
        <h1>{currentMessage}</h1>
        <input onChange={({ target }) => onInputChange(target.value)} type='text'/>
        <SearchBar asset={asset}/>
      </div>
    );
  }
}

export default radium(connect(
  ({ main }) => ({
    currentMessage: main.message,
  }),
  {
    onInputChange: updateMessage,
  },
)(BundleEditor));
