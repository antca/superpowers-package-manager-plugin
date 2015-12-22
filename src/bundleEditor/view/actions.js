import serializeError from 'serialize-error';
import { view } from '../../utils/npm';

const UPDATE_PACKAGE_INFO_PENDING = 'UPDATE_PACKAGE_INFO_PENDING';
const UPDATE_PACKAGE_INFO_FULFILLED = 'UPDATE_PACKAGE_INFO_FULFILLED';
const UPDATE_PACKAGE_INFO_REJECTED = 'UPDATE_PACKAGE_INFO_REJECTED';
function updatePackageInfo(packageName) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_PACKAGE_INFO_PENDING,
      payload: {
        packageName,
      },
    });
    return view(packageName)
      .then((result) => {
        dispatch({
          type: UPDATE_PACKAGE_INFO_FULFILLED,
          payload: result,
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

export default {
  UPDATE_PACKAGE_INFO_PENDING,
  UPDATE_PACKAGE_INFO_FULFILLED,
  UPDATE_PACKAGE_INFO_REJECTED,
  updatePackageInfo,
};
