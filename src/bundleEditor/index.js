import 'bootswatch/yeti/bootstrap.css';

import path from 'path';

import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import createStore from './createStore';
import AssetManager from '../data/AssetManager';
import BundleEditor from './main/components/BundleEditor';

const {
  SupClient,
  location,
  devToolsExtension,
} = global;

const bundleEditorDOMElement = document.createElement('div');
bundleEditorDOMElement.style.height = '100%';
bundleEditorDOMElement.style.padding = 0;
document.body.appendChild(bundleEditorDOMElement);

const store = createStore(
  devToolsExtension ? Reflect.apply(devToolsExtension, global) : _.identity
);
const asset = new AssetManager(SupClient, store.dispatch);

SupClient.i18n.load([{
  root: path.join(location.pathname, '..', '..'),
  name: 'bundleEditor',
}], () =>
  ReactDOM.render(
    <Provider store={store}>
      <BundleEditor i18n={SupClient.i18n.t} remoteDispatch={asset.dispatch}/>
    </Provider>,
    bundleEditorDOMElement
  )
);
