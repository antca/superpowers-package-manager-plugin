import {
  UPDATE_PACKAGE_INFO_PENDING,
  UPDATE_PACKAGE_INFO_FULFILLED,
  UPDATE_PACKAGE_INFO_REJECTED,
} from './actions';

const initialViewStore = {
  loading: false,
};

function viewReducer(store = initialViewStore, action) {
  return ({
    [UPDATE_PACKAGE_INFO_PENDING]() {
      return {
        ...store,
        error: null,
        packageInfo: null,
        loading: true,
      };
    },
    [UPDATE_PACKAGE_INFO_FULFILLED](packageInfo) {
      return {
        ...store,
        error: null,
        packageInfo,
        loading: false,
      };
    },
    [UPDATE_PACKAGE_INFO_REJECTED](error) {
      return {
        ...store,
        error,
        packageInfo: null,
        loading: false,
      };
    },
  }[action.type] || (() => {}))(action.payload, action.meta) || store;
}

export default viewReducer;
