const SELECT_VERSION = 'SELECT_VERSION';
function selectVersion(packageName, version) {
  return {
    type: SELECT_VERSION,
    payload: {
      packageName,
      version,
    },
  };
}

export default {
  SELECT_VERSION,
  selectVersion,
};
