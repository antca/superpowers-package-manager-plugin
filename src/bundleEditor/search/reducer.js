import {
  UPDATE_SEARCH_BAR_CONTENT,
  SEARCH_PACKAGE,
  RECEIVE_SEARCH_RESULT,
} from './actions';

const initialSearchStore = {
  searchBarContent: '',
  searchResult: null,
  searchError: null,
  searchStatus: null,
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
        searchStatus: 'pending',
        searchResult: null,
        searchError: null,
      };
    },
    [SEARCH_PACKAGE + FULFILLED]() {
      return {
        ...store,
        searchStatus: 'fulfilled',
        searchError: null,
        searchResult: null,
      };
    },
    [SEARCH_PACKAGE + REJECTED]({ error }) {
      return {
        ...store,
        searchStatus: 'error',
        searchError: error,
        searchResult: null,
      };
    },
    [RECEIVE_SEARCH_RESULT]({ result }) {
      return {
        ...store,
        searchStatus: 'result',
        searchResult: result,
        searchError: null,
      };
    },
  }[action.type] || (() => {}))(action.payload, action.meta) || store;
}

export default searchReducer;
