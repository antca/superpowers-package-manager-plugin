import serializeError from 'serialize-error';

import { view } from '../../utils/npm';

const UPDATE_PACKAGE_INFO_PENDING = 'UPDATE_PACKAGE_INFO_PENDING';
const UPDATE_PACKAGE_INFO_FULFILLED = 'UPDATE_PACKAGE_INFO_FULFILLED';
const UPDATE_PACKAGE_INFO_REJECTED = 'UPDATE_PACKAGE_INFO_REJECTED';
function updatePackageInfo(packageName) {

  // TODO: Dirty implementation, find a way to clean this.
  return (dispatch, getState) => {
    const { search: { selectedItemIndex, result } } = getState();
    const packageToView = selectedItemIndex === null ? packageName : result.results[selectedItemIndex].name;
    dispatch({
      type: UPDATE_PACKAGE_INFO_PENDING,
      payload: {
        packageName: packageToView,
      },
    });
    return view(packageToView)
      .then((packageInfo) => {
        dispatch({
          type: UPDATE_PACKAGE_INFO_FULFILLED,
          payload: packageInfo,
        });
      }).catch((error) => {
        dispatch({
          type: UPDATE_PACKAGE_INFO_REJECTED,
          payload: serializeError(error),
          error: true,
        });
      });
  };
}

export {
  UPDATE_PACKAGE_INFO_PENDING,
  UPDATE_PACKAGE_INFO_FULFILLED,
  UPDATE_PACKAGE_INFO_REJECTED,
  updatePackageInfo,
};
