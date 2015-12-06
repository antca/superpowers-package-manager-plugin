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
        dispatch(changeActivePanel('install'));
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

export default {
  UPDATE_PACKAGE_INFO_PENDING,
  UPDATE_PACKAGE_INFO_FULFILLED,
  UPDATE_PACKAGE_INFO_REJECTED,
  updatePackageInfo,
};
