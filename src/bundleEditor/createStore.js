import reduxSaga from 'redux-saga';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import dataReducer from '../data/reducer';
import mainReducer from './main/reducer';
import searchReducer from './search/reducer';
import viewReducer from './view/reducer';
import searchSaga from './search/sagas';
import viewSaga from './view/sagas';

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
      applyMiddleware(reduxSaga(searchSaga, viewSaga)),
      reduxDevToolsExtensionHook,
    ),
  );
}

export default createAppStore;
