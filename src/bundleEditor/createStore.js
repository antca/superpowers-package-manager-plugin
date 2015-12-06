import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reduxDebug from 'redux-debug';
import debug from 'debug';

import mainReducer from './main/reducer';
import searchReducer from './search/reducer';
import installReducer from './view/reducer';

function createAppStore() {
  const middlewareStack = applyMiddleware(reduxThunk, reduxDebug(debug('redux')))(createStore);
  const combinedReducers = combineReducers({
    main: mainReducer,
    search: searchReducer,
    view: installReducer,
  });
  return middlewareStack(combinedReducers);
}

export default createAppStore;
