import {
  UPDATE_SEARCH_BAR_CONTENT,
  SEARCH_PACKAGE,
} from './actions';

const initialSearchStore = {
  searchBarContent: '',
  result: {},
  error: null,
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
      console.log('pending...');
      return {
        ...store,
        error: null,
        result: null,
      };
    },
    [SEARCH_PACKAGE + FULFILLED](result) {
      console.log('fulfilled !', result);
      return {
        ...store,
        error: null,
        result,
      };
    },
    [SEARCH_PACKAGE + REJECTED](error) {
      console.log('rejected !');
      return {
        ...store,
        error,
        result: null,
      };
    },
  }[action.type] || (() => {}))(action.payload, action.meta) || store;
}

export default searchReducer;
