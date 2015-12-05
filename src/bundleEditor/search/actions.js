import { autocompleteSearch } from '../utils/npm';

const SEARCH_PACKAGE_PENDING = 'SEARCH_PACKAGE_PENDING';
const SEARCH_PACKAGE_FULFILLED = 'SEARCH_PACKAGE_FULFILLED';
const SEARCH_PACKAGE_REJECTED = 'SEARCH_PACKAGE_REJECTED';
function searchPackage(searchValue) {
  return (dispatch) => {
    autocompleteSearch(searchValue)
    .then((result) => dispatch({
      type: SEARCH_PACKAGE_FULFILLED,
      payload: result,
    }))
    .catch((error) => dispatch({
      type: SEARCH_PACKAGE_REJECTED,
      payload: error,
    }));
    return dispatch({
      type: SEARCH_PACKAGE_PENDING,
    });
  };
}

export default {
  SEARCH_PACKAGE_PENDING,
  SEARCH_PACKAGE_FULFILLED,
  SEARCH_PACKAGE_REJECTED,
  searchPackage,
};
