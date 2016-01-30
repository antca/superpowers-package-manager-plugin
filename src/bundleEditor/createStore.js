import reduxThunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import dataReducer from '../data/reducer';
import mainReducer from './main/reducer';
import searchReducer from './search/reducer';
import viewReducer from './view/reducer';

function createAppStore(reduxDevToolsExtensionHook) {
  const combinedReducers = combineReducers({
    main: mainReducer,
    search: searchReducer,
    view: viewReducer,
    data: dataReducer,
  });
  return createStore(
    combinedReducers,
    {},
    compose(
      applyMiddleware(...[reduxThunk]),
      reduxDevToolsExtensionHook,
    ),
  );
}

export default createAppStore;
