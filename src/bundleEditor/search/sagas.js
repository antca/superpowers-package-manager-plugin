import { call, put, take, fork } from 'redux-saga';

import { autocompleteSearch } from '../../utils/npm';
import {
  UPDATE_SEARCH_BAR_CONTENT,
  updateSearchResult,
  throwSearchError,
} from './actions';

function* searchSaga() {
  const { payload: { searchBarContent } } = yield take(UPDATE_SEARCH_BAR_CONTENT);

  // When a UPDATE_SEARCH_BAR_CONTENT action is handled, create a new saga to handle the next one.
  yield fork(searchSaga);

  try {
    const searchResult = yield call(autocompleteSearch, searchBarContent);
    yield put(updateSearchResult(searchResult));
  }
  catch(error) {
    yield put(throwSearchError(error));
  }
}

export default searchSaga;
