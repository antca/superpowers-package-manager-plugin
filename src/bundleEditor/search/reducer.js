import {
  UPDATE_SEARCH_BAR_CONTENT,
} from './actions';

const initialSearchStore = {
  searchBarContent: '',
};

function searchReducer(store = initialSearchStore, action) {
  return ({
    [UPDATE_SEARCH_BAR_CONTENT]({ newSearchBarContent }) {
      return {
        ...store,
        searchBarContent: newSearchBarContent,
      };
    },
  }[action.type] || (() => store))(action.payload);
}

export default searchReducer;
