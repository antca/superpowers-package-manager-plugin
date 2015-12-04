import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import createStore from './createStore';
import AssetManager from './AssetManager';
import BundleEditor from './main/components/BundleEditor';

const bundleEditorDOMElement = document.createElement('div');
document.body.appendChild(bundleEditorDOMElement);

const {
  SupClient,
} = global;

const store = createStore();

const asset = new AssetManager(SupClient, store.dispatch);

ReactDOM.render(
  <Provider store={store}>
    <BundleEditor asset={asset}/>
  </Provider>,
  bundleEditorDOMElement
);
