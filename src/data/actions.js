import serializeError from 'serialize-error';

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

const REMOVE_DEPENDENCY = 'REMOVE_DEPENDENCY';
function removeDependency(packageName) {
  return {
    type: REMOVE_DEPENDENCY,
    payload: {
      packageName,
    },
  };
}

const REBUILD = 'REBUILD';
function rebuild() {
  return {
    type: REBUILD,
  };
}

const REBUILD_FINISHED = 'REBUILD_FINISHED';
function rebuildFinished() {
  return {
    type: REBUILD_FINISHED,
  };
}

const REBUILD_FAILED = 'REBUILD_FAILED';
function rebuildFailed(error) {
  return {
    type: REBUILD_FAILED,
    payload: serializeError(error),
    error: true,
  };
}

const THROW_ERROR = 'THROW_ERROR';
function throwError(error) {
  return {
    type: THROW_ERROR,
    payload: serializeError(error),
    error: true,
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

  REMOVE_DEPENDENCY,
  removeDependency,

  REBUILD,
  rebuild,

  REBUILD_FINISHED,
  rebuildFinished,

  REBUILD_FAILED,
  rebuildFailed,

  THROW_ERROR,
  throwError,
};
