import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import mainReducer from './main/reducer';
import searchReducer from './search/reducer';

function createAppStore() {
  const middlewareStack = applyMiddleware(reduxThunk)(createStore);
  const combinedReducers = combineReducers({
    main: mainReducer,
    search: searchReducer,
  });
  return middlewareStack(combinedReducers);
}

export default createAppStore;
