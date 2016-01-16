import {
  SEARCH_PACKAGE_PENDING,
  SEARCH_PACKAGE_FULFILLED,
  SEARCH_PACKAGE_REJECTED,
  SELECT_TEXTBOX_CONTENT,
} from './actions';

const initialSearchStore = {
  error: null,
  textSelected: false,
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
    [SELECT_TEXTBOX_CONTENT]() {
      return {
        ...store,
        textSelected: true,
      };
    },
  }[action.type] || (() => void 0))(action.payload, action.meta) || store;
}

export default searchReducer;
