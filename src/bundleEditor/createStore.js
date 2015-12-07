import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reduxLogger from 'redux-logger';

import mainReducer from './main/reducer';
import searchReducer from './search/reducer';
import installReducer from './view/reducer';

function createAppStore() {
  const middlewareStack = applyMiddleware(reduxThunk, reduxLogger())(createStore);
  const combinedReducers = combineReducers({
    main: mainReducer,
    search: searchReducer,
    view: installReducer,
  });
  return middlewareStack(combinedReducers);
}

export default createAppStore;
