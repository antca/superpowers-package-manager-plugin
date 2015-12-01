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
  RECEIVE_ASSET,
  receiveAsset,
};
