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
function searchPackage(client, searchValue) {
  return {
    type: SEARCH_PACKAGE,
    payload: {
      promise: client.invoke('searchPackage', searchValue),
      searchValue,
    },
  };
}

export default {
  UPDATE_SEARCH_BAR_CONTENT,
  updateSearchBarContent,

  SEARCH_PACKAGE,
  searchPackage,
};
