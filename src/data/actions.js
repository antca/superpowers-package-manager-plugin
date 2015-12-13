let invoke = null;

function configure(assetInvoke) {
  if(invoke) {
    throw new Error('Asset actions already configured !');
  }
  invoke = assetInvoke;
}

const INVOKE_PING = 'INVOKE_PING';
function invokePing(value) {
  return () => {
    invoke('ping', value);
    return {
      type: INVOKE_PING,
      payload: {
        value,
      },
    };
  };
}

const INVOKE_PONG = 'INVOKE_PONG';
function invokePong(value) {
  return {
    type: INVOKE_PONG,
    payload: {
      value,
    },
  };
}

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
  return () => invoke('dispatch', {
    type: SELECT_VERSION,
    payload: {
      packageName,
      version,
    },
  });
}

const UPDATE_BINDING = 'UPDATE_BINDING';
function updateBinding(moduleName, bindingId, binding) {
  return () => invoke('dispatch', {
    type: UPDATE_BINDING,
    payload: {
      moduleName,
      bindingId,
      binding,
    },
  });
}

const ADD_BINDING = 'ADD_BINDING';
function addBinding(moduleName) {
  return () => invoke('dispatch', {
    type: ADD_BINDING,
    payload: {
      moduleName,
    },
  });
}

const DELETE_BINDING = 'DELETE_BINDING';
function deleteBinding(moduleName, bindingId) {
  return () => invoke('dispatch', {
    type: DELETE_BINDING,
    payload: {
      moduleName,
      bindingId,
    },
  });
}

const ADD_DEPENDENCY = 'ADD_DEPENDENCY';
function addDependency(packageInfo) {
  return () => invoke('dispatch', {
    type: ADD_DEPENDENCY,
    payload: {
      packageInfo,
    },
  });
}

export default {
  configure,

  INVOKE_PING,
  invokePing,

  INVOKE_PONG,
  invokePong,

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
