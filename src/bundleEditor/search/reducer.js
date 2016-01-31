import _ from 'lodash';

import {
  CONFIRM_PACKAGE,
  UPDATE_SEARCH_RESULT,
  THROW_SEARCH_ERROR,
  SELECT_RESULT_ITEM,
  UPDATE_SEARCH_BAR_CONTENT,
} from './actions';

const RESET_INDEX = -1;

const initialSearchStore = {
  error: null,
  selectedItemIndex: null,
  searchBarContent: '',
};

function searchReducer(store = initialSearchStore, action) {
  return ({
    [CONFIRM_PACKAGE]() {
      return {
        ...store,
        error: null,
        selectedItemIndex: null,
      };
    },
    [UPDATE_SEARCH_BAR_CONTENT]({ searchBarContent }) {
      return {
        ...store,
        searchBarContent,
      };
    },
    [UPDATE_SEARCH_RESULT](result) {
      return {
        ...store,
        error: null,
        result,
      };
    },
    [THROW_SEARCH_ERROR](error) {
      return {
        ...store,
        error,
        result: null,
      };
    },
    [SELECT_RESULT_ITEM]({ selectedItemIndexShift }) {
      const { result, selectedItemIndex } = store;
      if(!result) {
        return store;
      }
      const { total } = result;
      const newSelectedItemIndex = _.clamp(
        (selectedItemIndex === null ? RESET_INDEX : selectedItemIndex) + selectedItemIndexShift,
        0,
        total - 1
      );
      return {
        ...store,
        selectedItemIndex: newSelectedItemIndex,
      };
    },
  }[action.type] || (() => void 0))(action.payload, action.meta) || store;
}

export default searchReducer;
