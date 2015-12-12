import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reduxLogger from 'redux-logger';

import mainReducer from './main/reducer';
import searchReducer from './search/reducer';
import viewReducer from './view/reducer';
import installReducer from './install/reducer';
import manageReducer from './manage/reducer';

function createAppStore() {
  const middlewareStack = applyMiddleware(reduxThunk, reduxLogger())(createStore);
  const combinedReducers = combineReducers({
    main: mainReducer,
    search: searchReducer,
    view: viewReducer,
    install: installReducer,
    manage: manageReducer,
  });
  return middlewareStack(combinedReducers);
}

export default createAppStore;
