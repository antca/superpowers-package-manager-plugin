const UPDATE_ASSET_STATE = 'UPDATE_ASSET_STATE';
function updateAssetState(state) {
  return {
    type: UPDATE_ASSET_STATE,
    payload: {
      state,
    },
  };
}

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

const UPDATE_BINDING = 'UPDATE_BINDING';
function updateBinding(moduleName, bindingId, binding) {
  return {
    type: UPDATE_BINDING,
    payload: {
      moduleName,
      bindingId,
      binding,
    },
  };
}

const ADD_BINDING = 'ADD_BINDING';
function addBinding(moduleName) {
  return {
    type: ADD_BINDING,
    payload: {
      moduleName,
    },
  };
}

const DELETE_BINDING = 'DELETE_BINDING';
function deleteBinding(moduleName, bindingId) {
  return {
    type: DELETE_BINDING,
    payload: {
      moduleName,
      bindingId,
    },
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
  UPDATE_ASSET_STATE,
  updateAssetState,

  SELECT_VERSION,
  selectVersion,

  UPDATE_BINDING,
  updateBinding,

  ADD_BINDING,
  addBinding,

  DELETE_BINDING,
  deleteBinding,

  ADD_DEPENDENCY,
  addDependency,
};
