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

const RECEIVE_ASSET = 'RECEIVE_ASSET';
function receiveAsset(assetId, asset) {
  return {
    type: RECEIVE_ASSET,
    payload: {
      assetId,
      asset,
    },
  };
}

export default {
  configure,

  INVOKE_PING,
  invokePing,

  INVOKE_PONG,
  invokePong,

  RECEIVE_ASSET,
  receiveAsset,
};
