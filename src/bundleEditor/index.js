import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import BundleEditor from './main/components/BundleEditor';

const bundleEditorDOMElement = document.createElement('div');
document.body.appendChild(bundleEditorDOMElement);

ReactDOM.render(
  <Provider store={store}>
    <BundleEditor/>
  </Provider>,
  bundleEditorDOMElement
);
