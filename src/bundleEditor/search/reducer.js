import {
  SEARCH_PACKAGE_PENDING,
  SEARCH_PACKAGE_FULFILLED,
  SEARCH_PACKAGE_REJECTED,
} from './actions';

const initialSearchStore = {
  error: null,
};

function searchReducer(store = initialSearchStore, action) {
  return ({
    [SEARCH_PACKAGE_PENDING]() {
      return {
        ...store,
        error: null,
        textSelected: false,
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
  }[action.type] || (() => void 0))(action.payload, action.meta) || store;
}

export default searchReducer;
