import React, { Component } from 'react';
import SearchPanel from '../../search/components/SearchPanel';

class BundleEditor extends Component {
  render() {
    return (
      <div>
        <SearchPanel style={{ maxWidth: '33%' }}/>
      </div>
    );
  }
}

export default BundleEditor;
