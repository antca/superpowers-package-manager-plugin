import {
  UPDATE_SEARCH_BAR_CONTENT,
  SEARCH_PACKAGE,
} from './actions';

const initialSearchStore = {
  searchBarContent: '',
  searchResult: void 0,
};

const [PENDING, FULFILLED, REJECTED] = ['_PENDING', '_FULFILLED', '_REJECTED'];

function searchReducer(store = initialSearchStore, action) {
  return ({
    [UPDATE_SEARCH_BAR_CONTENT]({ newSearchBarContent }) {
      return {
        ...store,
        searchBarContent: newSearchBarContent,
      };
    },
    [SEARCH_PACKAGE + PENDING]() {
      return {
        ...store,
        searchResult: void 0,
      };
    },
    [SEARCH_PACKAGE + FULFILLED](result) {
      return {
        ...store,
        searchResult: result,
      };
    },
    [SEARCH_PACKAGE + REJECTED](error) {
      return {
        ...store,
        searchResult: error,
      };
    },
  }[action.type] || (() => {}))(action.payload) || store;
}

export default searchReducer;
