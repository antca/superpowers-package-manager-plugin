import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import createStore from './createStore';
import BundleEditor from './main/components/BundleEditor';

const bundleEditorDOMElement = document.createElement('div');
document.body.appendChild(bundleEditorDOMElement);

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <BundleEditor/>
  </Provider>,
  bundleEditorDOMElement
);
