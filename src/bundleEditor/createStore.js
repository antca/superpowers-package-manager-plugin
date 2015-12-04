import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxPromiseMiddleware from 'redux-promise-middleware';

import mainReducer from './main/reducer';
import searchReducer from './search/reducer';

function createAppStore() {
  const middlewareStack = applyMiddleware(reduxPromiseMiddleware())(createStore);
  const combinedReducers = combineReducers({
    main: mainReducer,
    search: searchReducer,
  });
  return middlewareStack(combinedReducers);
}

export default createAppStore;
