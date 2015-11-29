import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import BundleEditor from './components/BundleEditor';
import mainReducer from './reducers/main';

const bundleEditorDOMElement = document.createElement('div');
document.body.appendChild(bundleEditorDOMElement);

ReactDOM.render(
  <Provider store={createStore(mainReducer)}>
    <BundleEditor />
  </Provider>,
  bundleEditorDOMElement
);
