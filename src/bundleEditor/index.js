import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxPromiseMiddleware from 'redux-promise-middleware';

import BundleEditor from './main/components/BundleEditor';
import mainReducer from './main/reducer';
import searchReducer from './search/reducer';

const bundleEditorDOMElement = document.createElement('div');
document.body.appendChild(bundleEditorDOMElement);

const middlewareStack = applyMiddleware(reduxPromiseMiddleware());
const combinedReducers = combineReducers({
  main: mainReducer,
  search: searchReducer,
});

const store = middlewareStack(createStore(combinedReducers));

ReactDOM.render(
  <Provider store={store}>
    <BundleEditor/>
  </Provider>,
  bundleEditorDOMElement
);
