import {
  UPDATE_PACKAGE_INFO_PENDING,
  UPDATE_PACKAGE_INFO_FULFILLED,
  UPDATE_PACKAGE_INFO_REJECTED,
} from './actions';

const initialViewStore = {};

function viewReducer(store = initialViewStore, action) {
  return ({
    [UPDATE_PACKAGE_INFO_PENDING]() {
      return {
        ...store,
        error: null,
        packageInfo: null,
      };
    },
    [UPDATE_PACKAGE_INFO_FULFILLED](packageInfo) {
      window.result = packageInfo;
      return {
        ...store,
        error: null,
        packageInfo,
      };
    },
    [UPDATE_PACKAGE_INFO_REJECTED](error) {
      console.error(error.stack);
      return {
        ...store,
        error,
        packageInfo: null,
      };
    },
  }[action.type] || (() => {}))(action.payload, action.meta) || store;
}

export default viewReducer;
