import serializeError from 'serialize-error';

const CONFIRM_PACKAGE = 'CONFIRM_PACKAGE';
function confirmPackage(packageName, nextPanel = 'view') {
  return {
    type: CONFIRM_PACKAGE,
    payload: {
      packageName,
    },
    meta: {
      nextPanel,
    },
  };
}

const UPDATE_SEARCH_BAR_CONTENT = 'UPDATE_SEARCH_BAR_CONTENT';
function updateSearchBarContent(searchBarContent) {
  return {
    type: UPDATE_SEARCH_BAR_CONTENT,
    payload: {
      searchBarContent,
    },
  };
}

const THROW_SEARCH_ERROR = 'THROW_SEARCH_ERROR';
function throwSearchError(error) {
  return {
    type: THROW_SEARCH_ERROR,
    payload: serializeError(error),
  };
}

const UPDATE_SEARCH_RESULT = 'UPDATE_SEARCH_RESULT';
function updateSearchResult(searchResult) {
  return {
    type: UPDATE_SEARCH_RESULT,
    payload: searchResult,
  };
}

const SELECT_RESULT_ITEM = 'SELECT_RESULT_ITEM';
function selectResultItem(selectedItemIndexShift) {
  return {
    type: SELECT_RESULT_ITEM,
    payload: {
      selectedItemIndexShift,
    },
  };
}

export {
  CONFIRM_PACKAGE,
  confirmPackage,

  UPDATE_SEARCH_BAR_CONTENT,
  updateSearchBarContent,

  THROW_SEARCH_ERROR,
  throwSearchError,

  UPDATE_SEARCH_RESULT,
  updateSearchResult,

  SELECT_RESULT_ITEM,
  selectResultItem,
};
