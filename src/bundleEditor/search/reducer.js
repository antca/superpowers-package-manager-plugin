import _ from 'lodash';

import {
  SEARCH_PACKAGE_PENDING,
  SEARCH_PACKAGE_FULFILLED,
  SEARCH_PACKAGE_REJECTED,
  SELECT_RESULT_ITEM,
} from './actions';

const RESET_INDEX = -1;

const initialSearchStore = {
  error: null,
  selectedItemIndex: null,
};

function searchReducer(store = initialSearchStore, action) {
  return ({
    [SEARCH_PACKAGE_PENDING]() {
      return {
        ...store,
        error: null,
        selectedItemIndex: null,
      };
    },
    [SEARCH_PACKAGE_FULFILLED](result) {
      return {
        ...store,
        error: null,
        result,
      };
    },
    [SEARCH_PACKAGE_REJECTED](error) {
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
