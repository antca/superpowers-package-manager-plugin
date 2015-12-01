import assetManager from '../assetManager';

const UPDATE_SEARCH_BAR_CONTENT = 'UPDATE_SEARCH_BAR_CONTENT';
function updateSearchBarContent(newSearchBarContent) {
  return {
    type: UPDATE_SEARCH_BAR_CONTENT,
    payload: {
      newSearchBarContent,
    },
  };
}

const SEARCH_PACKAGE = 'SEARCH_PACKAGE';
function searchPackage(searchValue) {
  assetManager.invoke('searchPackage', searchValue);
  return {
    type: SEARCH_PACKAGE,
    payload: {
      searchValue,
    },
  };
}

const RECEIVE_SEARCH_RESULT = 'RECEIVE_SEARCH_RESULT';
function receiveSearchResult(result) {
  return {
    type: RECEIVE_SEARCH_RESULT,
    payload: result,
  };
}

export default {
  UPDATE_SEARCH_BAR_CONTENT,
  updateSearchBarContent,

  SEARCH_PACKAGE,
  searchPackage,

  RECEIVE_SEARCH_RESULT,
  receiveSearchResult,
};
