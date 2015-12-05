import {
  UPDATE_PACKAGE_INFO_PENDING,
  UPDATE_PACKAGE_INFO_FULFILLED,
  UPDATE_PACKAGE_INFO_REJECTED,
} from './actions';

const initialInstallStore = {};

function installReducer(store = initialInstallStore, action) {
  return ({
    [UPDATE_PACKAGE_INFO_PENDING]() {
      return {
        ...store,
        packageInfoError: null,
        packageInfo: null,
      };
    },
    [UPDATE_PACKAGE_INFO_FULFILLED](packageInfo) {
      console.log(packageInfo);
      return {
        ...store,
        packageInfoError: null,
        packageInfo,
      };
    },
    [UPDATE_PACKAGE_INFO_REJECTED](packageInfoError) {
      return {
        ...store,
        packageInfoError,
        packageInfo: null,
      };
    },
  }[action.type] || (() => {}))(action.payload, action.meta) || store;
}

export default installReducer;
