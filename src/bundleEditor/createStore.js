import _ from 'lodash';
import reduxLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import dataReducer from '../data/reducer';
import mainReducer from './main/reducer';
import searchReducer from './search/reducer';
import viewReducer from './view/reducer';

function createAppStore() {
  const middlewareStack = applyMiddleware(
    ..._.compact([
      reduxThunk,

      // If the production webpack production config is used,
      // the `redux-logger` module ils aliased as `empty/object`.
      typeof reduxLogger === 'function' && reduxLogger(),
    ])
  )(createStore);
  const combinedReducers = combineReducers({
    main: mainReducer,
    search: searchReducer,
    view: viewReducer,
    data: dataReducer,
  });
  return middlewareStack(combinedReducers);
}

export default createAppStore;
