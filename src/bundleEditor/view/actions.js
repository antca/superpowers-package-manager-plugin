import { view } from '../utils/npm';
import { changeActivePanel } from '../main/actions';

const UPDATE_PACKAGE_INFO_PENDING = 'UPDATE_PACKAGE_INFO_PENDING';
const UPDATE_PACKAGE_INFO_FULFILLED = 'UPDATE_PACKAGE_INFO_FULFILLED';
const UPDATE_PACKAGE_INFO_REJECTED = 'UPDATE_PACKAGE_INFO_REJECTED';
function updatePackageInfo(packageName) {
  return (dispatch) => {
    view(packageName)
      .then((result) => {
        dispatch({
          type: UPDATE_PACKAGE_INFO_FULFILLED,
          payload: result,
        });
        dispatch(changeActivePanel('view'));
      }).catch((error) => {
        dispatch({
          type: UPDATE_PACKAGE_INFO_REJECTED,
          payload: error,
        });
      });
    return dispatch({
      type: UPDATE_PACKAGE_INFO_PENDING,
      payload: {
        packageName,
      },
    });
  };
}

const ADD_DEPENDENCY = 'ADD_DEPENDENCY';
function addDependency(packageInfo) {
  return {
    type: ADD_DEPENDENCY,
    payload: {
      packageInfo,
    },
  };
}

export default {
  UPDATE_PACKAGE_INFO_PENDING,
  UPDATE_PACKAGE_INFO_FULFILLED,
  UPDATE_PACKAGE_INFO_REJECTED,
  updatePackageInfo,

  ADD_DEPENDENCY,
  addDependency,
};
