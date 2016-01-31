import serializeError from 'serialize-error';

const UPDATE_PACKAGE_INFO = 'UPDATE_PACKAGE_INFO';
function updatePackageInfo(packageInfo) {
  return {
    type: UPDATE_PACKAGE_INFO,
    payload: packageInfo,
  };
}

const THROW_PACKAGE_INFO_ERROR = 'THROW_PACKAGE_INFO_ERROR';
function throwPackageInfoError(error) {
  return {
    type: THROW_PACKAGE_INFO_ERROR,
    payload: serializeError(error),
  };
}

export {
  UPDATE_PACKAGE_INFO,
  updatePackageInfo,

  THROW_PACKAGE_INFO_ERROR,
  throwPackageInfoError,
};
