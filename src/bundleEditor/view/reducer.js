import {
  UPDATE_PACKAGE_INFO,
  THROW_PACKAGE_INFO_ERROR,
} from './actions';

import {
  CONFIRM_PACKAGE,
} from '../search/actions';

const initialViewStore = {
  loading: false,
};

function viewReducer(store = initialViewStore, action) {
  return ({
    [CONFIRM_PACKAGE]() {
      return {
        ...store,
        error: null,
        packageInfo: null,
        loading: true,
      };
    },
    [UPDATE_PACKAGE_INFO](packageInfo) {
      return {
        ...store,
        error: null,
        packageInfo,
        loading: false,
      };
    },
    [THROW_PACKAGE_INFO_ERROR](error) {
      return {
        ...store,
        error,
        packageInfo: null,
        loading: false,
      };
    },
  }[action.type] || (() => void 0))(action.payload, action.meta) || store;
}

export default viewReducer;
