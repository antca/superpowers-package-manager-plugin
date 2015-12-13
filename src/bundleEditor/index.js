import 'babel-polyfill';
import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import createStore from './createStore';
import AssetManager from '../data/AssetManager';
import BundleEditor from './main/components/BundleEditor';
import { configure } from '../data/actions';

const {
  SupClient,
} = global;

const bundleEditorDOMElement = document.createElement('div');
bundleEditorDOMElement.style.height = '100%';
bundleEditorDOMElement.style.padding = 0;
document.body.appendChild(bundleEditorDOMElement);

const store = createStore();
const asset = new AssetManager(SupClient, store.dispatch);
configure(asset.invoke);

ReactDOM.render(
  <Provider store={store}>
    <BundleEditor/>
  </Provider>,
  bundleEditorDOMElement
);
