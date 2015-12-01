import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxPromiseMiddleware from 'redux-promise-middleware';

import mainReducer from './main/reducer';
import searchReducer from './search/reducer';

const middlewareStack = applyMiddleware(reduxPromiseMiddleware())(createStore);
const combinedReducers = combineReducers({
  main: mainReducer,
  search: searchReducer,
});

const store = middlewareStack(combinedReducers);

export default store;
