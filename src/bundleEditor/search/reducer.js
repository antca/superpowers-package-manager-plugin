import {
  SEARCH_PACKAGE_PENDING,
  SEARCH_PACKAGE_FULFILLED,
  SEARCH_PACKAGE_REJECTED,
} from './actions';

import {
  UPDATE_PACKAGE_INFO_FULFILLED,
} from '../install/actions';

const initialSearchStore = {
  error: null,
};

function searchReducer(store = initialSearchStore, action) {
  return ({
    [SEARCH_PACKAGE_PENDING]() {
      return {
        ...store,
        error: null,
      };
    },
    [SEARCH_PACKAGE_FULFILLED](result) {
      return {
        ...store,
        error: null,
        result,
      };
    },
    [SEARCH_PACKAGE_REJECTED](error) {
      return {
        ...store,
        error,
        result: null,
      };
    },
    [UPDATE_PACKAGE_INFO_FULFILLED]() {
      return {
        ...store,
        error: null,
        result: null,
      };
    },
  }[action.type] || (() => {}))(action.payload, action.meta) || store;
}

export default searchReducer;
